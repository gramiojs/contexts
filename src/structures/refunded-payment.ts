import type { TelegramObjects } from "@gramio/types";
import { Inspect, Inspectable } from "inspectable";

/**
 * This object contains basic information about a refunded payment.
 *
 * [Documentation](https://core.telegram.org/bots/api/#refundedpayment)
 */
@Inspectable()
export class RefundedPayment {
	constructor(public payload: TelegramObjects.TelegramRefundedPayment) {}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Three-letter ISO 4217 [currency](https://core.telegram.org/bots/payments#supported-currencies) code, or “XTR” for payments in [Telegram Stars](https://t.me/BotNews/90). Currently, always “XTR”
	 */
	@Inspect()
	get currency() {
		return this.payload.currency;
	}

	/**
	 * Total refunded price in the *smallest units* of the currency (integer, **not** float/double). For example, for a price of `US$ 1.45`, `total_amount = 145`. See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
	 */
	@Inspect()
	get totalAmount() {
		return this.payload.total_amount;
	}

	/**
	 * Bot-specified invoice payload
	 */
	@Inspect()
	get invoicePayload() {
		return this.payload.invoice_payload;
	}

	/**
	 * Telegram payment identifier
	 */
	@Inspect()
	get telegramPaymentChargeId() {
		return this.payload.telegram_payment_charge_id;
	}

	/**
	 * *Optional*. Provider payment identifier
	 */
	@Inspect()
	get providerPaymentChargeId() {
		return this.payload.provider_payment_charge_id;
	}
}
