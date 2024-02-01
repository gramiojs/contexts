import { Inspectable } from "inspectable";

import type { AttachmentType } from "#utils";

/** Simple attachment */
@Inspectable()
export class Attachment {
	attachmentType?: AttachmentType;

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
