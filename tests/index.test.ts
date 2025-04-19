import { describe, expect, it } from "bun:test";
import { join } from "node:path";
import { $ } from "bun";

describe("index", () => {
	it("should build properly (circular reference can broke something)", async () => {
		const result = await $`node index.cjs`
			.cwd(join(import.meta.dir, "..", "dist"))
			.text();

		console.log(result);

		expect(result).toBe("");

		const resultEsm = await $`node index.js`
			.cwd(join(import.meta.dir, "..", "dist"))
			.text();

		console.log(resultEsm);

		expect(resultEsm).toBe("");
	});
});
