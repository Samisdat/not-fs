'use strict';

var expect = require('chai').expect;

var Permission = require('../../lib/unreal-filesystem/permission');

describe('permission', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        var permission = new Permission();

        expect(permission).to.be.instanceof(Permission);
        expect(permission.getMode()).to.be.equal('0000');

    });

    it('validate mode', function() {

        var permission = new Permission();

        expect(permission._validate('0700')).to.be.true;
        expect(permission._validate('0777')).to.be.true;
        expect(permission._validate('0775')).to.be.true;
        expect(permission._validate('0774')).to.be.true;
        expect(permission._validate('0773')).to.be.true;
        expect(permission._validate('0772')).to.be.true;
        expect(permission._validate('0771')).to.be.true;
        expect(permission._validate('0770')).to.be.true;

        expect(permission._validate()).to.be.false;
        expect(permission._validate('07700')).to.be.false;
        expect(permission._validate('07')).to.be.false;
        expect(permission._validate('a')).to.be.false;

    });

    it('normalise', function() {

        var permission = new Permission();

        expect(permission._normalise('0770')).to.be.equal('0770');
        expect(permission._normalise('771')).to.be.equal('0771');
        expect(permission._normalise('771')).to.be.equal('0771');


    });

    it('set/get', function() {

        var permission = new Permission();
        expect(permission.getMode()).to.be.equal('0000');

        permission.setMode('755');
        expect(permission.getMode()).to.be.equal('0755');

        expect(permission._validate('a')).to.be.false;
        try {
            permission = new Permission('a');
        }
        catch (e){
            expect(e.message).to.be.equal('a is not a valid permission');
        }

    });

    it('getPart', function() {

        var permission = new Permission('0764');
        expect(permission.getMode()).to.be.equal('0764');

        expect(permission._getPart(true, false)).to.be.equal('7');
        expect(permission._getPart(false, true)).to.be.equal('6');
        expect(permission._getPart(false, false)).to.be.equal('4');

    });

    it('isReadable', function() {

        var permission = new Permission();

        // user
        permission.setMode('0700');
        expect(permission.isReadable(true, false)).to.be.true;

        permission.setMode('0600');
        expect(permission.isReadable(true, false)).to.be.true;

        permission.setMode('0500');
        expect(permission.isReadable(true, false)).to.be.true;

        permission.setMode('0400');
        expect(permission.isReadable(true, false)).to.be.true;

        permission.setMode('0300');
        expect(permission.isReadable(true, false)).to.be.false;

        permission.setMode('0200');
        expect(permission.isReadable(true, false)).to.be.false;

        permission.setMode('0100');
        expect(permission.isReadable(true, false)).to.be.false;

        permission.setMode('0000');
        expect(permission.isReadable(true, false)).to.be.false;

        // group
        permission.setMode('0070');
        expect(permission.isReadable(false, true)).to.be.true;

        permission.setMode('0060');
        expect(permission.isReadable(false, true)).to.be.true;

        permission.setMode('0050');
        expect(permission.isReadable(false, true)).to.be.true;

        permission.setMode('0040');
        expect(permission.isReadable(false, true)).to.be.true;

        permission.setMode('0030');
        expect(permission.isReadable(false, true)).to.be.false;

        permission.setMode('0020');
        expect(permission.isReadable(false, true)).to.be.false;

        permission.setMode('0010');
        expect(permission.isReadable(false, true)).to.be.false;

        permission.setMode('0000');
        expect(permission.isReadable(false, true)).to.be.false;

        // other
        permission.setMode('0007');
        expect(permission.isReadable(false, false)).to.be.true;

        permission.setMode('0006');
        expect(permission.isReadable(false, false)).to.be.true;

        permission.setMode('0005');
        expect(permission.isReadable(false, false)).to.be.true;

        permission.setMode('0004');
        expect(permission.isReadable(false, false)).to.be.true;

        permission.setMode('0003');
        expect(permission.isReadable(false, false)).to.be.false;

        permission.setMode('0002');
        expect(permission.isReadable(false, false)).to.be.false;

        permission.setMode('0001');
        expect(permission.isReadable(false, false)).to.be.false;

        permission.setMode('0000');
        expect(permission.isReadable(false, false)).to.be.false;

    });

    it('isWriteable', function() {

        var permission = new Permission();

        // user
        permission.setMode('0700');
        expect(permission.isWritable(true, false)).to.be.true;

        permission.setMode('0600');
        expect(permission.isWritable(true, false)).to.be.true;

        permission.setMode('0500');
        expect(permission.isWritable(true, false)).to.be.false;

        permission.setMode('0400');
        expect(permission.isWritable(true, false)).to.be.false;

        permission.setMode('0300');
        expect(permission.isWritable(true, false)).to.be.true;

        permission.setMode('0200');
        expect(permission.isWritable(true, false)).to.be.true;

        permission.setMode('0100');
        expect(permission.isWritable(true, false)).to.be.false;

        permission.setMode('0000');
        expect(permission.isWritable(true, false)).to.be.false;

        // group
        permission.setMode('0070');
        expect(permission.isWritable(false, true)).to.be.true;

        permission.setMode('0060');
        expect(permission.isWritable(false, true)).to.be.true;

        permission.setMode('0050');
        expect(permission.isWritable(false, true)).to.be.false;

        permission.setMode('0040');
        expect(permission.isWritable(false, true)).to.be.false;

        permission.setMode('0030');
        expect(permission.isWritable(false, true)).to.be.true;

        permission.setMode('0020');
        expect(permission.isWritable(false, true)).to.be.true;

        permission.setMode('0010');
        expect(permission.isWritable(false, true)).to.be.false;

        permission.setMode('0000');
        expect(permission.isWritable(false, true)).to.be.false;

        // other
        permission.setMode('0007');
        expect(permission.isWritable(false, false)).to.be.true;

        permission.setMode('0006');
        expect(permission.isWritable(false, false)).to.be.true;

        permission.setMode('0005');
        expect(permission.isWritable(false, false)).to.be.false;

        permission.setMode('0004');
        expect(permission.isWritable(false, false)).to.be.false;

        permission.setMode('0003');
        expect(permission.isWritable(false, false)).to.be.true;

        permission.setMode('0002');
        expect(permission.isWritable(false, false)).to.be.true;

        permission.setMode('0001');
        expect(permission.isWritable(false, false)).to.be.false;

        permission.setMode('0000');
        expect(permission.isWritable(false, false)).to.be.false;

    });

    it('isExecuteable', function() {

        var permission = new Permission();

        // user
        permission.setMode('0700');
        expect(permission.isExecutable(true, false)).to.be.true;

        permission.setMode('0600');
        expect(permission.isExecutable(true, false)).to.be.false;

        permission.setMode('0500');
        expect(permission.isExecutable(true, false)).to.be.true;

        permission.setMode('0400');
        expect(permission.isExecutable(true, false)).to.be.false;

        permission.setMode('0300');
        expect(permission.isExecutable(true, false)).to.be.true;

        permission.setMode('0200');
        expect(permission.isExecutable(true, false)).to.be.false;

        permission.setMode('0100');
        expect(permission.isExecutable(true, false)).to.be.true;

        permission.setMode('0000');
        expect(permission.isExecutable(true, false)).to.be.false;

        // group
        permission.setMode('0070');
        expect(permission.isExecutable(false, true)).to.be.true;

        permission.setMode('0060');
        expect(permission.isExecutable(false, true)).to.be.false;

        permission.setMode('0050');
        expect(permission.isExecutable(false, true)).to.be.true;

        permission.setMode('0040');
        expect(permission.isExecutable(false, true)).to.be.false;

        permission.setMode('0030');
        expect(permission.isExecutable(false, true)).to.be.true;

        permission.setMode('0020');
        expect(permission.isExecutable(false, true)).to.be.false;

        permission.setMode('0010');
        expect(permission.isExecutable(false, true)).to.be.true;

        permission.setMode('0000');
        expect(permission.isExecutable(false, true)).to.be.false;

        // other
        permission.setMode('0007');
        expect(permission.isExecutable(false, false)).to.be.true;

        permission.setMode('0006');
        expect(permission.isExecutable(false, false)).to.be.false;

        permission.setMode('0005');
        expect(permission.isExecutable(false, false)).to.be.true;

        permission.setMode('0004');
        expect(permission.isExecutable(false, false)).to.be.false;

        permission.setMode('0003');
        expect(permission.isExecutable(false, false)).to.be.true;

        permission.setMode('0002');
        expect(permission.isExecutable(false, false)).to.be.false;

        permission.setMode('0001');
        expect(permission.isExecutable(false, false)).to.be.true;

        permission.setMode('0000');
        expect(permission.isExecutable(false, false)).to.be.false;

    });


});

