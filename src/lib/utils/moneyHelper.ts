export function sumLineItems(lineItems: lineItems[] | undefined): number {
	if (!lineItems) {
		return 0;
	}

	return lineItems.reduce((sum, item) => sum + item.amount, 0);
}

export function twoDecimals(myNum: number): string {
	return myNum.toFixed(2);
}

export function centsToDollars(cents: number): string {
	const dollars = cents / 100;
	return addThousandsSeparator(twoDecimals(dollars));
}

export function addThousandsSeparator(myNum: string): string {
	return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
