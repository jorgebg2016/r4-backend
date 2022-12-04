"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Paginate an array.
 *
 * @param {any[]} array
 * @param {number} size
 * @returns {any[]}
 */
function paginate(array, size) {
    return array.reduce((acc, item, index) => {
        let idx = Math.floor(index / size);
        let page = acc[idx] || (acc[idx] = []);
        page.push(item);
        return acc;
    }, []);
}
exports.default = paginate;
;
