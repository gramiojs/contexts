import { defineConfig } from "tsup";

// ![INFO] esbuild support of decorators... https://github.com/evanw/esbuild/issues/104
export default defineConfig({
	target: "es2022",
	splitting: true,
	entry: ["./src/index.ts"],
	format: ["cjs", "esm"],
	dts: {
		resolve: true,
	},
});
