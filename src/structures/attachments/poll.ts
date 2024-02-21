import { AttachmentType } from "#types";
import { applyMixins } from "#utils";

import { Poll } from "../poll";

import { Attachment } from "./attachment";

class PollAttachment extends Poll {
	attachmentType: AttachmentType = "poll";
}

interface PollAttachment extends Attachment {}
applyMixins(PollAttachment, [Attachment]);

export { PollAttachment };
