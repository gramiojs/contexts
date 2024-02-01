import { applyMixins } from "#utils";
import type { AttachmentType } from "#utils";

import { Location } from "../location";

import { Attachment } from "./attachment";

class LocationAttachment extends Location {
	attachmentType: AttachmentType = "location";
}

interface LocationAttachment extends Attachment {}
applyMixins(LocationAttachment, [Attachment]);

export { LocationAttachment };
