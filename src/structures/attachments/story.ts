import { applyMixins } from "#utils";
import { type AttachmentType } from "#utils";
import { Story } from "../story";

import { Attachment } from "./attachment";

class StoryAttachment extends Story {
	attachmentType: AttachmentType = "story";
}

interface StoryAttachment extends Attachment {}
applyMixins(StoryAttachment, [Attachment]);

export { StoryAttachment };
