import { expect } from 'chai';

import Options from './options';
import File from './file';

import Stats from './stats';
import TreeStats from './stats';

var util = require('util')

describe('Stats', function() {


    beforeEach(function() {

    });

    it('can be created', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

        expect(stats).to.be.instanceof(Stats);

    });

    it('dev', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

        expect(stats.dev).to.be.equals(options.stats.dev);

    });

    it('ino', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

        expect(stats.ino).to.be.equals(file.getInodeNumber());

    });

    it.skip('mode', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

    });

    it.skip('nlink', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

    });

    it('uid', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

        expect(stats.uid).to.be.equals(options.stats.userId);
        
    });

    it('gid', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

        expect(stats.gid).to.be.equals(options.stats.groupId);
        
    });

    it('rdev', function() {

        const options = new Options()
        const file = new File(1, 'test', '',  options); 

        const stats = new Stats(file);

        expect(stats.rdev).to.be.equals(options.stats.rdev);
        
    });

    it('size', function() {

        const options = new Options()
        const file = new File(1, 'test', 'foo',  options); 

        const stats = new Stats(file);
        
        expect(stats.size).to.be.equals(3);
        
    });

    it('blksize', function() {

        const options = new Options()
        const file = new File(1, 'test', 'foo',  options); 

        const stats = new Stats(file);
        
        expect(stats.blksize).to.be.equals(options.stats.blockSize);
        
    });

    it('blocks', function() {

        const options = new Options()
        const file = new File(1, 'test', 'foo',  options); 

        const stats = new Stats(file);
        
        expect(stats.blocks).to.be.equals(options.stats.blocks);
        
    });

    it('atime', function() {

        const options = new Options()
        const file = new File(1, 'test', 'foo',  options); 

        const stats = new Stats(file);
        
        expect(stats.atime).to.be.equals(options.stats.accessTime.toString());
        expect(stats.atimeMs).to.be.equals(options.stats.accessTime.valueOf());
        
    });

    it('mtime', function() {

        const options = new Options()
        const file = new File(1, 'test', 'foo',  options); 

        const stats = new Stats(file);
        
        expect(stats.mtime).to.be.equals(options.stats.modifyTime.toString());
        expect(stats.mtimeMs).to.be.equals(options.stats.modifyTime.valueOf());
        
    });

    it('ctime', function() {

        const options = new Options()
        const file = new File(1, 'test', 'foo',  options); 

        const stats = new Stats(file);
        
        expect(stats.ctime).to.be.equals(options.stats.changeTime.toString());
        expect(stats.ctimeMs).to.be.equals(options.stats.changeTime.valueOf());
        
    });

    it('birthtime', function() {

        const options = new Options()
        const file = new File(1, 'test', 'foo',  options); 

        const stats = new Stats(file);
        
        expect(stats.birthtime).to.be.equals(options.stats.birthtime.toString());
        expect(stats.birthtimeMs).to.be.equals(options.stats.birthtime.valueOf());
        
    });
    
});
