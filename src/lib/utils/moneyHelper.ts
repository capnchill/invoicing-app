/**
 * Takes all the line items and adds them up
 *
 * @param {LineItem[] | undefined} lineItems - The array of line items to sum.
 * @return {number} The total sum of the amounts in the line items.
 */
export function sumLineItems(lineItems: LineItem[] | undefined): number {
	if (!lineItems) {
		return 0;
	}
	return lineItems.reduce((sum, item) => sum + item.amount, 0);
}

/**
 * Calculates the total invoice amount based on line items and discount.
 *
 * @param {LineItem[] | undefined} lineItems - The array of line items for the invoice.
 * @param {number | undefined} discount - The discount percentage to apply to the invoice.
 * @return {number} The total invoice amount after applying the discount.
 */
export function invoiceTotal(
	lineItems: LineItem[] | undefined,
	discount: number | undefined
): number {
	const lineItemsSum = sumLineItems(lineItems);
	if (discount) {
		const invoiceDiscount = lineItemsSum * (discount / 100);
		return lineItemsSum - invoiceDiscount;
	} else {
		return lineItemsSum;
	}
}

/**
 * Converts a number to a string with two decimal places.
 *
 * @param {number} myNum - The number to be converted.
 * @return {string} The number as a string with two decimal places.
 */
export function twoDecimals(myNum: number): string {
	return myNum.toFixed(2);
}

/**
 * Converts cents to dollars and adds thousands separator.
 *
 * @param {number} cents - The amount in cents to be converted.
 * @return {string} The amount in dollars with thousands separator.
 */
export function centsToDollars(cents: number): string {
	const dollars = cents / 100;
	return addThousandsSeparator(twoDecimals(dollars));
}

/**
 * Converts a number of cents to a string representation of dollars without commas.
 *
 * @param {number} cents - The number of cents to be converted.
 * @return {string} The string representation of the converted dollars without commas.
 */
export function centsToDollarsWithoutCommas(cents: number): string {
	const dollars = cents / 100;
	return twoDecimals(dollars);
}

/**
 * Converts the given amount of dollars to the corresponding number of cents.
 *
 * @param {number} dollars - The amount of dollars to be converted.
 * @return {number} The corresponding number of cents.
 */
export function dollarsToCents(dollars: number): number {
	const cents = dollars * 100;
	return cents;
}

/**
 * Replaces the string with a thousands separator.
 *
 * @param {string} myNum - The string to add thousands separator.
 * @return {string} The string with thousands separator added.
 */
export function addThousandsSeparator(myNum: string): string {
	return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Calculates the total sum of all invoices.
 *
 * @param {Invoice[] | undefined} invoices - The array of invoices to sum.
 * @return {number} The total sum of all the invoices.
 */
export function sumInvoices(invoices: Invoice[] | undefined) {
	if (!invoices) {
		return 0;
	} else {
		return invoices.reduce((prevValue, curValue) => {
			const invoiceSum = invoiceTotal(curValue.lineItems, curValue.discount);
			return prevValue + invoiceSum;
		}, 0);
	}
}
