import { expect } from 'chai';

import Options from './options';

import Root from './root';

describe('root', function() {

    let options = new Options();
    let root: Root;

    beforeEach(function() {

        root = new Root('/', options);

    });

    it('can be created', function() {

        expect(root).to.be.instanceof(Root);

    });

    it('get it\'s inodenumber', function() {

        expect(root.getInodeNumber()).to.be.equal(0);

    });

    it('get/set it\'s path', function() {

        expect(root.getPathPart()).to.be.equal('/');

        // mmutable 
        root.setPathPart('foobar');
        expect(root.getPathPart()).to.be.equal('/');

        const onOtherRoot = new Root('/foo/bar', options);
        expect(onOtherRoot.getPathPart()).to.be.equal('/foo/bar');

        onOtherRoot.setPathPart('/foo');
        expect(onOtherRoot.getPathPart()).to.be.equal('/foo/bar');

        expect(function () { 
            new Root('foobar', options);
        }).to.throw('root path must be absolute');
        
    });

    it('isRoot is true', function() {

        expect(root.isRoot()).to.be.true;

    });

    it('isDir is true', function() {

        expect(root.isDirectory()).to.be.true;

    });

    it('isFile is false', function() {

        expect(root.isFile()).to.be.false;

    });

});