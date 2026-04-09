/**
 * Tests for .env.example introduced in this PR.
 *
 * .env.example documents the environment variables that operators must supply
 * before running docker-compose. These tests verify that the file exists, is
 * well-formed, and declares exactly the variables that the docker-compose
 * configuration expects.
 */
import fs from "fs";
import path from "path";
import { beforeAll, describe, expect, it } from "vitest";

const ENV_EXAMPLE_PATH = path.resolve(process.cwd(), ".env.example");

/** Parse a dotenv-style file into a Record<key, value>. */
function parseDotenv(content: string): Record<string, string> {
    const result: Record<string, string> = {};
    for (const raw of content.split("\n")) {
        const line = raw.trim();
        if (line === "" || line.startsWith("#")) continue;
        const eqIdx = line.indexOf("=");
        if (eqIdx === -1) continue;
        const key = line.slice(0, eqIdx).trim();
        const value = line.slice(eqIdx + 1).trim();
        result[key] = value;
    }
    return result;
}

describe(".env.example – PR changes", () => {
    it("file exists at the project root", () => {
        expect(fs.existsSync(ENV_EXAMPLE_PATH)).toBe(true);
    });

    it("file is readable", () => {
        expect(() => fs.readFileSync(ENV_EXAMPLE_PATH, "utf-8")).not.toThrow();
    });

    it("file is not empty", () => {
        const content = fs.readFileSync(ENV_EXAMPLE_PATH, "utf-8");
        expect(content.trim().length).toBeGreaterThan(0);
    });

    describe("required variables", () => {
        let vars: Record<string, string>;

        beforeAll(() => {
            const content = fs.readFileSync(ENV_EXAMPLE_PATH, "utf-8");
            vars = parseDotenv(content);
        });

        it("declares MYSQL_ROOT_PASSWORD", () => {
            expect(vars).toHaveProperty("MYSQL_ROOT_PASSWORD");
        });

        it("declares MYSQL_DATABASE", () => {
            expect(vars).toHaveProperty("MYSQL_DATABASE");
        });

        it("declares MYSQL_USER", () => {
            expect(vars).toHaveProperty("MYSQL_USER");
        });

        it("declares MYSQL_PASSWORD", () => {
            expect(vars).toHaveProperty("MYSQL_PASSWORD");
        });
    });

    describe("variable values in the template", () => {
        let vars: Record<string, string>;

        beforeAll(() => {
            const content = fs.readFileSync(ENV_EXAMPLE_PATH, "utf-8");
            vars = parseDotenv(content);
        });

        it("MYSQL_ROOT_PASSWORD is intentionally left empty (placeholder)", () => {
            expect(vars["MYSQL_ROOT_PASSWORD"]).toBe("");
        });

        it("MYSQL_DATABASE is intentionally left empty (placeholder)", () => {
            expect(vars["MYSQL_DATABASE"]).toBe("");
        });

        it("MYSQL_USER is intentionally left empty (placeholder)", () => {
            expect(vars["MYSQL_USER"]).toBe("");
        });

        it("MYSQL_PASSWORD is intentionally left empty (placeholder)", () => {
            expect(vars["MYSQL_PASSWORD"]).toBe("");
        });
    });

    describe("completeness", () => {
        it("declares exactly the 4 expected MySQL variables and nothing extra", () => {
            const content = fs.readFileSync(ENV_EXAMPLE_PATH, "utf-8");
            const vars = parseDotenv(content);
            const keys = Object.keys(vars).sort();
            expect(keys).toHaveLength(4);
            expect(keys).toEqual(
                ["MYSQL_DATABASE", "MYSQL_PASSWORD", "MYSQL_ROOT_PASSWORD", "MYSQL_USER"],
            );
        });

        it("every line is either blank or a valid KEY=VALUE assignment", () => {
            const content = fs.readFileSync(ENV_EXAMPLE_PATH, "utf-8");
            for (const line of content.split("\n")) {
                const trimmed = line.trim();
                if (trimmed === "" || trimmed.startsWith("#")) continue;
                expect(trimmed).toMatch(/^[A-Z_][A-Z0-9_]*=/);
            }
        });

        it("no variable key contains whitespace", () => {
            const content = fs.readFileSync(ENV_EXAMPLE_PATH, "utf-8");
            const vars = parseDotenv(content);
            for (const key of Object.keys(vars)) {
                expect(key).not.toMatch(/\s/);
            }
        });
    });
});