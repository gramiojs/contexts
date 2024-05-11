import type { AttachmentType } from "../../types";
import { applyMixins } from "../../utils";

import { Location } from "../location";

import { Attachment } from "./attachment";

/** This object represents a point on the map. */
class LocationAttachment extends Location {
	attachmentType: AttachmentType = "location";
}

interface LocationAttachment extends Attachment {}
applyMixins(LocationAttachment, [Attachment]);

export { LocationAttachment };
