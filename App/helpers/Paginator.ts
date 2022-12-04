

/**
 * Paginate an array.
 * 
 * @param {any[]} array 
 * @param {number} size 
 * @returns {any[]}
 */
export default function paginate(array: Array<any>, size: number): Array<Array<any>> {

    return array.reduce((acc: any, item: any, index: number) => {

      let idx = Math.floor(index / size);

      let page = acc[idx] || (acc[idx] = []);

      page.push(item);
  
      return acc;
    }, []);
};