/* eslint-disable import/no-unresolved */
// import * as mocha from 'mocha';
import * as chai from 'chai';
import * as td from 'testdouble';
import Api from '../../../src/api/api';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const supertest = require('supertest'); // o supertest só pode ser importado através do require.

const api = Api;
const request = supertest;
const { expect } = chai;
const testdouble = td;

export {
    api, expect, request, testdouble,
};
