import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  tsr: {
    appDirectory: "./src",
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
  },
});
