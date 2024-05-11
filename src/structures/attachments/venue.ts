import type { AttachmentType } from "../../types";
import { applyMixins } from "../../utils";

import { Venue } from "../venue";

import { Attachment } from "./attachment";

/**
 * This object represents a venue.
 *
 * [Documentation](https://core.telegram.org/bots/api/#venue)
 */
class VenueAttachment extends Venue {
	attachmentType: AttachmentType = "venue";
}

interface VenueAttachment extends Attachment {}
applyMixins(VenueAttachment, [Attachment]);

export { VenueAttachment };
