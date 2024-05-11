import { Inspectable } from "inspectable";

import type { AttachmentType } from "../../types";

/** Simple attachment */
@Inspectable()
export class Attachment {
	attachmentType?: AttachmentType;

	/** [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
