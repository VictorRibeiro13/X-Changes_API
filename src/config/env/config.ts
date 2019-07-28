/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

module.exports = (): any => require(`../env/${process.env.NODE_ENV}.env.js`);
