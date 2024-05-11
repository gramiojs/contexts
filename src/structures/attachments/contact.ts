import type { AttachmentType } from "../../types";
import { applyMixins } from "../../utils";

import { Contact } from "../contact";

import { Attachment } from "./attachment";

/** This object represents a phone contact. */
class ContactAttachment extends Contact {
	attachmentType: AttachmentType = "contact";
}

interface ContactAttachment extends Attachment {}
applyMixins(ContactAttachment, [Attachment]);

export { ContactAttachment };
