import { type AttachmentType } from "#types";
import { applyMixins } from "#utils";

import { Venue } from "../venue";

import { Attachment } from "./attachment";

class VenueAttachment extends Venue {
	attachmentType: AttachmentType = "venue";
}

interface VenueAttachment extends Attachment {}
applyMixins(VenueAttachment, [Attachment]);

export { VenueAttachment };
