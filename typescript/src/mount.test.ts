import { expect } from 'chai';

import Mount from './mount';

describe('mount', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        let mount = new Mount();

        expect(mount).to.be.instanceof(Mount);

    });

    it('can mount with json', function() {

        let mount = new Mount();

        const tree = mount.fromJsonFile('./fixture.json');
        tree.log();

    });
    
    it('can write tree to json', function() {

        let mount = new Mount();

        const tree = mount.fromJsonFile('./fixture.json');
        tree.log();

        mount.toJson('./fixture2.json', tree);

    });

});

