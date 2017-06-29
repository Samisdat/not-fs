'use strict';

import { expect } from 'chai';

import Mount from './mount';

describe('mount', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var mount = new Mount();

        expect(mount).to.be.instanceof(Mount);

    });

    it('can mount with json', function() {

        var mount = new Mount();

        mount.fromJson('./fixture.json');

    });
    
    it('can write tree to json', function() {

        var mount = new Mount();

        const tree = mount.fromJson('./fixture.json');
        tree.log();

        mount.toJson('./fixture2.json', tree);

    });


});

