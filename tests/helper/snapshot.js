/**
 * Returns an onelined string
 * @param  {String} string
 * @return {String}
 */
export const snapshot = (string) => string.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ').trim()
