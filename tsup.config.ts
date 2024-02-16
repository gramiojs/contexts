import { defineConfig } from "tsup";

export default defineConfig({
	target: "esnext",
	splitting: true,
	entry: ["./src/index.ts"],
	format: ["cjs"],
	dts: {
		resolve: true,
	},
});
