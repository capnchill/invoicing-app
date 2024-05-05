import { isBefore, format } from 'date-fns';

export const today = format(new Date(), 'yyyy-MM-dd');

/**
 *  this takes yyyy-mm-dd and returns m-d-yyy
 * 	@param {string} myDate
 *  @returns {string}  m-d-yyy
 */
export function convertDate(myDate: string): string {
	// break apart date
	const [year, month, day] = splitDate(myDate);

	// return it in the format
	return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

/**
 * Determines whether a date is before today (meaning it is late)
 *
 * @param {string} myDate - The date to be checked in the format yyyy-mm-dd.
 * @return {boolean} Returns true if the given date is late, false otherwise.
 */
export function isLate(myDate: string): boolean {
	const [year, month, day] = splitDate(myDate);
	const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
	const today = new Date();
	return isBefore(dueDate, today);
}

/**
 * Takes in a date yyyy-m-dd and splits into an array
 *
 * @param {string} myDate - The date string to be split.
 * @return {string[]} An array of strings after splitting the input date string.
 */
export function splitDate(myDate: string): string[] {
	return myDate.split('-');
}
