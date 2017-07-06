import { expect } from 'chai';

import Mount from './mount';

describe('mount', function() {

    beforeEach(function() {
    });

    it.skip('can be created', function() {

        let mount = new Mount();

        expect(mount).to.be.instanceof(Mount);

    });

    it.skip('can mount with json', function() {

        let mount = new Mount();

        const tree = mount.fromJsonFile('./fixture.json');
        tree.log();

        const dirOne = tree.getNodeByPath("/home/vodafone/private/unreal-fs/one");
        expect(dirOne.getPathPart()).to.be.equal('one');
        expect(dirOne.isDirectory()).to.be.true;
        expect(dirOne.getPermission().getMode()).to.be.equal('0555');

        const dirTwo = tree.getNodeByPath("/home/vodafone/private/unreal-fs/two");
        
        expect(dirTwo.getPathPart()).to.be.equal('two');
        expect(dirTwo.isDirectory()).to.be.true;
        expect(dirTwo.getPermission().getMode()).to.be.equal('0777');        

        const dirThree = tree.getNodeByPath("/home/vodafone/private/unreal-fs/three");
        expect(dirThree.getPathPart()).to.be.equal('three');
        expect(dirThree.isDirectory()).to.be.true;
        expect(dirThree.getPermission().getMode()).to.be.equal('0555');

        const fileOne = tree.getNodeByPath("/home/vodafone/private/unreal-fs/one/one.txt");
        expect(fileOne.getPathPart()).to.be.equal('one.txt');
        expect(fileOne.isFile()).to.be.true;
        expect(fileOne.getPermission().getMode()).to.be.equal('0444');

        const fileTwo = tree.getNodeByPath("/home/vodafone/private/unreal-fs/one/two.txt");
        expect(fileTwo.getPathPart()).to.be.equal('two.txt');
        expect(fileTwo.isFile()).to.be.true;
        expect(fileTwo.getPermission().getMode()).to.be.equal('0575');

    });
    
    it('can write tree to json', function() {

        let mount = new Mount();

        const tree = mount.fromJsonFile('./fixture.json');
        console.log(JSON.stringify(mount.toJson(tree), null, 4));
        //tree.log();

        //console.log(mount.toJson(tree));

    });

});

