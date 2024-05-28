import { defineConfig } from "cypress";
import { root } from "postcss";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      root: "./public",
      base: "",
      server: {
        port: 8080,
        open: true,
      },
    };
  }
  if (command === "build") {
    return {
      base: "/",
    };
  }
});
