import 'should';
import { describe, it } from 'mocha';

import * as lib from './';

describe('index', () => {
    it ('has a default export', () => {
        lib.should.have.property('default');
    });
});
