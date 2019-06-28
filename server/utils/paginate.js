/**
 * Calculates a request's offset and limit based on the current page and page size
 *
 * @param {Number} currentPage current page number
 * @param {Number} pageSize number of records each page will contain
 *
 * @returns {Object} offset - number of records to skip before beginning to return rows
 * @returns {Object} limit - maximum number of records to be returned for each page
 */

const paginate = ({ currentPage, pageSize }) => {
  const offset = (currentPage - 1) * pageSize;
  const limit = offset + pageSize;

  return {
    offset,
    limit,
  };
};

export default paginate;
