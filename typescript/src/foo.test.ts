import { expect } from 'chai';

import Foo from './foo';

describe('Foo', () => {

    it('can be created', () => {

        let foo = new Foo();
        expect(foo).to.be.instanceof(Foo);

    });

});
