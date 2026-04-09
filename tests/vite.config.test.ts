/**
 * Tests for the vite.config.ts changes introduced in this PR:
 * - server.port set to 3000 (to match docker-compose.yaml port mapping)
 * - server.host set to true (to allow external access from Docker containers)
 * - /api proxy configured with VITE_API_URL as target and changeOrigin: true
 */
import path from "path";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// Top-level vi.mock calls are hoisted by vitest before any imports
vi.mock("@tailwindcss/vite", () => ({ default: () => ({ name: "tailwindcss-mock" }) }));
vi.mock("@vitejs/plugin-react-swc", () => ({ default: () => ({ name: "react-swc-mock" }) }));

const mockLoadEnv = vi.fn();
vi.mock("vite", async (importOriginal) => {
    const actual = await importOriginal<typeof import("vite")>();
    return {
        ...actual,
        loadEnv: mockLoadEnv,
    };
});

type ViteUserConfig = Record<string, unknown>;
type ConfigFactory = (env: { mode: string; command: "serve" | "build"; isSsrBuild: boolean }) => ViteUserConfig;

async function importViteConfig(envOverrides: Record<string, string> = {}): Promise<ViteUserConfig> {
    mockLoadEnv.mockReturnValue({
        VITE_API_URL: "http://localhost:8080",
        ...envOverrides,
    });
    vi.resetModules();
    const mod = await import("../vite.config.ts");
    const factory = mod.default as ConfigFactory;
    return factory({ mode: "test", command: "serve", isSsrBuild: false });
}

describe("vite.config.ts – PR changes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("server.port", () => {
        it("should set server port to 3000 to match docker-compose port mapping", async () => {
            const config = await importViteConfig();
            const server = config.server as Record<string, unknown>;
            expect(server.port).toBe(3000);
        });

        it("server port should be a number, not a string", async () => {
            const config = await importViteConfig();
            const server = config.server as Record<string, unknown>;
            expect(typeof server.port).toBe("number");
        });
    });

    describe("server.host", () => {
        it("should set host to true to allow external access from Docker containers", async () => {
            const config = await importViteConfig();
            const server = config.server as Record<string, unknown>;
            expect(server.host).toBe(true);
        });

        it("host should be exactly boolean true, not a string or 0.0.0.0", async () => {
            const config = await importViteConfig();
            const server = config.server as Record<string, unknown>;
            expect(server.host).toStrictEqual(true);
        });
    });

    describe("server.proxy – /api route", () => {
        it("should define a proxy entry for /api", async () => {
            const config = await importViteConfig();
            const server = config.server as Record<string, unknown>;
            const proxy = server.proxy as Record<string, unknown>;
            expect(proxy).toHaveProperty("/api");
        });

        it("proxy /api target should equal VITE_API_URL from the environment", async () => {
            const config = await importViteConfig({ VITE_API_URL: "http://localhost:8080" });
            const server = config.server as Record<string, unknown>;
            const proxy = server.proxy as Record<string, Record<string, unknown>>;
            expect(proxy["/api"].target).toBe("http://localhost:8080");
        });

        it("proxy /api target reflects a custom VITE_API_URL value", async () => {
            const config = await importViteConfig({ VITE_API_URL: "https://api.example.com" });
            const server = config.server as Record<string, unknown>;
            const proxy = server.proxy as Record<string, Record<string, unknown>>;
            expect(proxy["/api"].target).toBe("https://api.example.com");
        });

        it("proxy /api should have changeOrigin set to true", async () => {
            const config = await importViteConfig();
            const server = config.server as Record<string, unknown>;
            const proxy = server.proxy as Record<string, Record<string, unknown>>;
            expect(proxy["/api"].changeOrigin).toBe(true);
        });

        it("proxy /api target should be empty string when VITE_API_URL is not set", async () => {
            const config = await importViteConfig({ VITE_API_URL: "" });
            const server = config.server as Record<string, unknown>;
            const proxy = server.proxy as Record<string, Record<string, unknown>>;
            expect(proxy["/api"].target).toBe("");
        });
    });

    describe("path alias (@)", () => {
        it("should resolve @ to the src directory", async () => {
            const config = await importViteConfig();
            const resolve = config.resolve as Record<string, unknown>;
            const alias = resolve.alias as Record<string, string>;
            expect(alias["@"]).toBe(path.resolve(process.cwd(), "./src"));
        });
    });

    describe("loadEnv integration", () => {
        it("factory calls loadEnv with (mode, cwd, '') and returns a valid config", async () => {
            // Each assertion runs in a fresh import so the spy captures exactly one call
            const config = await importViteConfig({ VITE_API_URL: "http://localhost:8080" });

            expect(mockLoadEnv).toHaveBeenCalledWith("test", process.cwd(), "");
            // empty-string third arg means "load all env vars, regardless of VITE_ prefix"
            expect(mockLoadEnv).toHaveBeenCalledWith(expect.any(String), expect.any(String), "");
            // config object is well-formed
            expect(typeof config).toBe("object");
            expect(config).not.toBeNull();
        });

        it("passes the caller-supplied mode down to loadEnv", async () => {
            mockLoadEnv.mockReturnValue({ VITE_API_URL: "http://localhost:8080" });
            vi.resetModules();
            const mod = await import("../vite.config.ts");
            const factory = mod.default as ConfigFactory;
            factory({ mode: "production", command: "build", isSsrBuild: false });
            expect(mockLoadEnv).toHaveBeenCalledWith("production", expect.any(String), "");
        });
    });
});