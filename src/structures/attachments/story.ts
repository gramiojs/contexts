import type { AttachmentType } from "../../types";
import { applyMixins } from "../../utils";
import { Story } from "../story";

import { Attachment } from "./attachment";

class StoryAttachment extends Story {
	attachmentType: AttachmentType = "story";
}

/**
 * This object represents a story.
 *
 * [Documentation](https://core.telegram.org/bots/api/#story)
 */
interface StoryAttachment extends Attachment {}
applyMixins(StoryAttachment, [Attachment]);

export { StoryAttachment };
