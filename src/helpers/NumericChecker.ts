

/**
 * Check if a string is a valid numeric string.
 * 
 * @param {string} numericString 
 * @returns {boolean}
 */
export default function isNumeric(numericString: string): boolean {

    return /^-?\d+$/.test(numericString);
};