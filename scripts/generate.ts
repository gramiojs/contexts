import fs from "node:fs/promises";
import { stripIndents } from "common-tags";
// import prettier from "prettier";
import type { IBotApi } from "./types";

const SCHEMA_FILE_PATH = "./tg-bot-api/public/dev/custom.min.json";

const schemaFile = await fs.readFile(SCHEMA_FILE_PATH);
const schema = JSON.parse(String(schemaFile)) as IBotApi.ISchema;

// console.log(schema.objects);

function pascalToKebabCase(str: string) {
	return str
		.split(/\.?(?=[A-Z])/)
		.join("-")
		.toLowerCase();
}

function snakeToCamelCase(str: string) {
	return str
		.toLowerCase()
		.replace(/([-_][a-z])/g, (group) =>
			group.toUpperCase().replace("-", "").replace("_", ""),
		);
}

const objectToGenerate: string[] = ["BusinessConnection", "BusinessLocation"];

for (const object of schema.objects.filter(
	(x) => objectToGenerate.includes(x.name) && x.properties?.length,
)) {
	if (
		!(await fs.exists(`./src/structures/${pascalToKebabCase(object.name)}.ts`))
	) {
		const refs = object.properties?.filter((x) => x.reference)!;

		fs.writeFile(
			`./src/structures/${pascalToKebabCase(object.name)}.ts`,
			stripIndents /* ts */`
import { Inspect, Inspectable } from "inspectable";
import type { TelegramObjects } from "@gramio/types";
${refs.length ? `import { memoizeGetters } from "#utils";` : ""}
${refs
	.map(
		(x) =>
			stripIndents /* ts */`import { ${
				x.reference
			} } from "./${pascalToKebabCase(x.reference!)}"`,
	)
	.join("\n")}

/**
 * ${object.description}
 * 
 * [Documentation](${object.documentation_link})
 */
@Inspectable()
export class ${object.name} {
	constructor(public payload: TelegramObjects.Telegram${object.name}) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	${object.properties
		?.map(
			(x) => stripIndents /* ts */`
	/**
	 * ${x.description}
	 */
	@Inspect()
	get ${snakeToCamelCase(x.name)}() {
		return ${
			x.reference
				? !x.required
					? `this.payload.${x.name} ? new ${x.reference}(this.payload.${x.name}) : undefined `
					: `new ${x.reference}(this.payload.${x.name})`
				: `this.payload.${x.name}`
		}
	}
	`,
		)
		.join("\n\n")}
}
${
	refs.length
		? `memoizeGetters(${object.name}, [${refs
				.map((x) => `"${x.name}"`)
				.join(", ")}])`
		: ""
}
`,
		);
	} else console.log("exists");
	// fs.writeFile(
	// 	"./src/mutator.ts",
	// 	// await prettier.format(
	// 	/* ts */ ``,
	// 	// { tabWidth: 4, parser: "typescript", endOfLine: "auto", semi: false },
	// 	// ),
	// );
}
