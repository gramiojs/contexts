import type { AttachmentType } from "#types";
import { applyMixins } from "#utils";

import { Contact } from "../contact";

import { Attachment } from "./attachment";

class ContactAttachment extends Contact {
	attachmentType: AttachmentType = "contact";
}

interface ContactAttachment extends Attachment {}
applyMixins(ContactAttachment, [Attachment]);

export { ContactAttachment };
