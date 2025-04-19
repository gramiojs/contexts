import fs from "node:fs/promises";
import path from "node:path";

const dirPath = path.resolve(process.cwd(), process.argv[2]);

fs.readdir(dirPath).then(async (files) => {
	const lines = files
		.filter((file) => file !== "index.ts")
		.map(
			(file) =>
				`export * from "./${file.endsWith(".ts") ? file : `${file}/index.ts`}";`,
		);

	await fs.writeFile(path.resolve(dirPath, "index.ts"), lines.join("\n"));
});
