/**
 * Tests for docker-compose.yaml introduced in this PR.
 *
 * Validates the structure, service definitions, port mappings, environment
 * variable references, and volume configuration defined in docker-compose.yaml.
 */
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { beforeAll, describe, expect, it } from "vitest";

const COMPOSE_PATH = path.resolve(process.cwd(), "docker-compose.yaml");

interface ProxyConfig {
    target: string;
    changeOrigin?: boolean;
}

interface ComposeService {
    image?: string;
    build?: { context: string; dockerfile: string };
    container_name?: string;
    ports?: string[];
    environment?: Record<string, string> | string[];
    depends_on?: string[];
    volumes?: string[];
    working_dir?: string;
    command?: string;
    restart?: string;
}

interface ComposeFile {
    services: Record<string, ComposeService>;
    volumes?: Record<string, unknown>;
}

describe("docker-compose.yaml – PR changes", () => {
    let compose: ComposeFile;

    beforeAll(() => {
        const content = fs.readFileSync(COMPOSE_PATH, "utf-8");
        compose = yaml.load(content) as ComposeFile;
    });

    it("file exists at the project root", () => {
        expect(fs.existsSync(COMPOSE_PATH)).toBe(true);
    });

    it("parses as valid YAML", () => {
        expect(() => {
            const content = fs.readFileSync(COMPOSE_PATH, "utf-8");
            yaml.load(content);
        }).not.toThrow();
    });

    it("defines a top-level 'services' key", () => {
        expect(compose).toHaveProperty("services");
        expect(typeof compose.services).toBe("object");
    });

    describe("services", () => {
        it("defines exactly 3 services: backend, db, frontend", () => {
            const names = Object.keys(compose.services).sort();
            expect(names).toEqual(["backend", "db", "frontend"]);
        });

        describe("backend service", () => {
            let backend: ComposeService;
            beforeAll(() => { backend = compose.services["backend"]; });

            it("has a build context pointing to ../SM-TOEIC-BE", () => {
                expect(backend.build?.context).toBe("../SM-TOEIC-BE");
            });

            it("has a dockerfile path pointing to ../SM-TOEIC-BE/Dockerfile", () => {
                expect(backend.build?.dockerfile).toBe("../SM-TOEIC-BE/Dockerfile");
            });

            it("has container_name 'backend'", () => {
                expect(backend.container_name).toBe("backend");
            });

            it("exposes port 8080:8080", () => {
                expect(backend.ports).toContain("8080:8080");
            });

            it("sets SPRING_DATASOURCE_URL to the internal db service", () => {
                const env = backend.environment as string[];
                const url = env.find((e) => e.startsWith("SPRING_DATASOURCE_URL="));
                expect(url).toBe("SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/vocadb");
            });

            it("references MYSQL_USER env var for SPRING_DATASOURCE_USERNAME", () => {
                const env = backend.environment as string[];
                expect(env).toContain("SPRING_DATASOURCE_USERNAME=${MYSQL_USER}");
            });

            it("references MYSQL_PASSWORD env var for SPRING_DATASOURCE_PASSWORD", () => {
                const env = backend.environment as string[];
                expect(env).toContain("SPRING_DATASOURCE_PASSWORD=${MYSQL_PASSWORD}");
            });

            it("depends_on the db service", () => {
                expect(backend.depends_on).toContain("db");
            });
        });

        describe("db service", () => {
            let db: ComposeService;
            beforeAll(() => { db = compose.services["db"]; });

            it("uses the mysql:8.0 image", () => {
                expect(db.image).toBe("mysql:8.0");
            });

            it("has container_name 'db'", () => {
                expect(db.container_name).toBe("db");
            });

            it("has restart: always", () => {
                expect(db.restart).toBe("always");
            });

            it("maps host port 3307 to container port 3306", () => {
                expect(db.ports).toContain("3307:3306");
            });

            it("sets MYSQL_ROOT_PASSWORD from env var reference", () => {
                const env = db.environment as Record<string, string>;
                expect(env["MYSQL_ROOT_PASSWORD"]).toBe("${MYSQL_ROOT_PASSWORD}");
            });

            it("sets MYSQL_DATABASE from env var reference", () => {
                const env = db.environment as Record<string, string>;
                expect(env["MYSQL_DATABASE"]).toBe("${MYSQL_DATABASE}");
            });

            it("sets MYSQL_USER from env var reference", () => {
                const env = db.environment as Record<string, string>;
                expect(env["MYSQL_USER"]).toBe("${MYSQL_USER}");
            });

            it("sets MYSQL_PASSWORD from env var reference", () => {
                const env = db.environment as Record<string, string>;
                expect(env["MYSQL_PASSWORD"]).toBe("${MYSQL_PASSWORD}");
            });

            it("sets timezone to Asia/Seoul", () => {
                const env = db.environment as Record<string, string>;
                expect(env["TZ"]).toBe("Asia/Seoul");
            });

            it("uses a named volume for data persistence", () => {
                expect(db.volumes?.some((v) => v.includes("mysql_data"))).toBe(true);
            });

            it("mounts mysql_data to /var/lib/mysql", () => {
                expect(db.volumes).toContain("mysql_data:/var/lib/mysql");
            });
        });

        describe("frontend service", () => {
            let frontend: ComposeService;
            beforeAll(() => { frontend = compose.services["frontend"]; });

            it("uses node:20-alpine image", () => {
                expect(frontend.image).toBe("node:20-alpine");
            });

            it("has container_name 'frontend'", () => {
                expect(frontend.container_name).toBe("frontend");
            });

            it("sets working_dir to /app", () => {
                expect(frontend.working_dir).toBe("/app");
            });

            it("maps host port 3000 to container port 3000 (matching vite.config.ts server.port)", () => {
                expect(frontend.ports).toContain("3000:3000");
            });

            it("runs npm install then npm run dev", () => {
                expect(frontend.command).toBe("sh -c \"npm install && npm run dev\"");
            });

            it("mounts the project root to /app inside the container", () => {
                expect(frontend.volumes?.some((v) => v === ".:/app")).toBe(true);
            });

            it("excludes node_modules from the bind mount via anonymous volume", () => {
                expect(frontend.volumes).toContain("/app/node_modules");
            });

            it("provides VITE_API_URL pointing to localhost:8080", () => {
                const env = frontend.environment as string[];
                expect(env).toContain("VITE_API_URL=http://localhost:8080");
            });
        });
    });

    describe("volumes", () => {
        it("declares a top-level 'volumes' key", () => {
            expect(compose).toHaveProperty("volumes");
        });

        it("declares the mysql_data named volume", () => {
            expect(compose.volumes).toHaveProperty("mysql_data");
        });
    });

    describe("env var consistency with .env.example", () => {
        it("every env var referenced in docker-compose.yaml is declared in .env.example", () => {
            const envExamplePath = path.resolve(process.cwd(), ".env.example");
            const exampleContent = fs.readFileSync(envExamplePath, "utf-8");
            const declaredVars = new Set(
                exampleContent
                    .split("\n")
                    .map((l) => l.split("=")[0].trim())
                    .filter((k) => k !== ""),
            );

            const composeContent = fs.readFileSync(COMPOSE_PATH, "utf-8");
            // Extract ${VAR_NAME} references
            const referenced = [...composeContent.matchAll(/\$\{([A-Z_]+)\}/g)].map((m) => m[1]);

            for (const varName of referenced) {
                expect(declaredVars.has(varName), `${varName} is referenced in docker-compose.yaml but missing from .env.example`).toBe(true);
            }
        });
    });
});