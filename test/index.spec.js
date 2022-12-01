import { expect } from 'chai';
import greeting from '../lib/index.js';

describe('greeting', () => {
    it('should return "Hello world!"', () => {
        expect(greeting()).to.equal('Hello world!');
    });
});
