import { expect } from 'chai';

import File from './file';

import Stats from './stats';
import TreeStats from './stats';

describe('Stats', function() {


    beforeEach(function() {

    });

    it('can be created', function() {

        const file = new File(1, 'test'); 

        const stats = new Stats(file);

        expect(stats).to.be.instanceof(Stats);

    });

});
/*
describe.skip('TreeStats', function() {


    beforeEach(function() {

    });

    it('can be created', function() {

        const treeStats = new TreeStats();

        expect(treeStats).to.be.instanceof(TreeStats);

    });

});
*/