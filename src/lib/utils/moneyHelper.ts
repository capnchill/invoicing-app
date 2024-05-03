/**
 * Takes all the line items and adds them up
 *
 * @param {lineItems[] | undefined} lineItems - The array of line items to sum.
 * @return {number} The total sum of the amounts in the line items.
 */
export function sumLineItems(lineItems: lineItems[] | undefined): number {
	if (!lineItems) {
		return 0;
	}
	return lineItems.reduce((sum, item) => sum + item.amount, 0);
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
		return invoices.reduce((sum, item) => sum + sumLineItems(item.lineItems), 0);
	}
}