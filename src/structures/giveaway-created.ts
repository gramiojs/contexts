import * as Interfaces from "@gramio/types/objects";
import { Inspectable } from "inspectable";

/** This object represents a service message about the creation of a scheduled giveaway. Currently holds no information. */
@Inspectable()
export class GiveawayCreated {
	constructor(public payload: Interfaces.TelegramGiveawayCreated) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}
