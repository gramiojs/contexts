import type { AttachmentType } from "../../types";
import { applyMixins } from "../../utils";
import { Story } from "../story";

import { Attachment } from "./attachment";

/**
 * This object represents a story.
 *
 * [Documentation](https://core.telegram.org/bots/api/#story)
 */
class StoryAttachment extends Story {
	attachmentType: AttachmentType = "story";
}

interface StoryAttachment extends Attachment {}
applyMixins(StoryAttachment, [Attachment]);

export { StoryAttachment };
