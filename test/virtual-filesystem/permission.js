'use strict';

var expect = require('chai').expect;

var Permission = require('../../lib/virtual-filesystem/permission');

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

        expect(permission._normalise.bind('999')).to.throw();

    });

    it('set/get', function() {

        var permission = new Permission();
        expect(permission.getMode()).to.be.equal('0000');

        permission.setMode('755');
        expect(permission.getMode()).to.be.equal('0755');

    });

    it('isReadable', function() {

        var permission = new Permission();

        // user
        permission.setMode('0700')
        expect(permission.isReadable(true, false)).to.be.true;
        
        permission.setMode('0600')
        expect(permission.isReadable(true, false)).to.be.true;

        permission.setMode('0500')
        expect(permission.isReadable(true, false)).to.be.true;

        permission.setMode('0400')
        expect(permission.isReadable(true, false)).to.be.true;

        permission.setMode('0300')
        expect(permission.isReadable(true, false)).to.be.false;

        permission.setMode('0200')
        expect(permission.isReadable(true, false)).to.be.false;

        permission.setMode('0100')
        expect(permission.isReadable(true, false)).to.be.false;

        permission.setMode('0000')
        expect(permission.isReadable(true, false)).to.be.false;

        // group
        permission.setMode('0070')
        expect(permission.isReadable(false, true)).to.be.true;
        
        permission.setMode('0060')
        expect(permission.isReadable(false, true)).to.be.true;

        permission.setMode('0050')
        expect(permission.isReadable(false, true)).to.be.true;

        permission.setMode('0040')
        expect(permission.isReadable(false, true)).to.be.true;

        permission.setMode('0030')
        expect(permission.isReadable(false, true)).to.be.false;

        permission.setMode('0020')
        expect(permission.isReadable(false, true)).to.be.false;

        permission.setMode('0010')
        expect(permission.isReadable(false, true)).to.be.false;

        permission.setMode('0000')
        expect(permission.isReadable(false, true)).to.be.false;

        // other
        permission.setMode('0007')
        expect(permission.isReadable(false, false)).to.be.true;
        
        permission.setMode('0006')
        expect(permission.isReadable(false, false)).to.be.true;

        permission.setMode('0005')
        expect(permission.isReadable(false, false)).to.be.true;

        permission.setMode('0004')
        expect(permission.isReadable(false, false)).to.be.true;

        permission.setMode('0003')
        expect(permission.isReadable(false, false)).to.be.false;

        permission.setMode('0002')
        expect(permission.isReadable(false, false)).to.be.false;

        permission.setMode('0001')
        expect(permission.isReadable(false, false)).to.be.false;

        permission.setMode('0000')
        expect(permission.isReadable(false, false)).to.be.false;
        
    });

    it('isWriteable', function() {

        var permission = new Permission();

        // user
        permission.setMode('0700')
        expect(permission.isWriteable(true, false)).to.be.true;
        
        permission.setMode('0600')
        expect(permission.isWriteable(true, false)).to.be.true;

        permission.setMode('0500')
        expect(permission.isWriteable(true, false)).to.be.false;

        permission.setMode('0400')
        expect(permission.isWriteable(true, false)).to.be.false;

        permission.setMode('0300')
        expect(permission.isWriteable(true, false)).to.be.true;

        permission.setMode('0200')
        expect(permission.isWriteable(true, false)).to.be.true;

        permission.setMode('0100')
        expect(permission.isWriteable(true, false)).to.be.false;

        permission.setMode('0000')
        expect(permission.isWriteable(true, false)).to.be.false;

        // group
        permission.setMode('0070')
        expect(permission.isWriteable(false, true)).to.be.true;
        
        permission.setMode('0060')
        expect(permission.isWriteable(false, true)).to.be.true;

        permission.setMode('0050')
        expect(permission.isWriteable(false, true)).to.be.false;

        permission.setMode('0040')
        expect(permission.isWriteable(false, true)).to.be.false;

        permission.setMode('0030')
        expect(permission.isWriteable(false, true)).to.be.true;

        permission.setMode('0020')
        expect(permission.isWriteable(false, true)).to.be.true;

        permission.setMode('0010')
        expect(permission.isWriteable(false, true)).to.be.false;

        permission.setMode('0000')
        expect(permission.isWriteable(false, true)).to.be.false;

        // other
        permission.setMode('0007')
        expect(permission.isWriteable(false, false)).to.be.true;
        
        permission.setMode('0006')
        expect(permission.isWriteable(false, false)).to.be.true;

        permission.setMode('0005')
        expect(permission.isWriteable(false, false)).to.be.false;

        permission.setMode('0004')
        expect(permission.isWriteable(false, false)).to.be.false;

        permission.setMode('0003')
        expect(permission.isWriteable(false, false)).to.be.true;

        permission.setMode('0002')
        expect(permission.isWriteable(false, false)).to.be.true;

        permission.setMode('0001')
        expect(permission.isWriteable(false, false)).to.be.false;

        permission.setMode('0000')
        expect(permission.isWriteable(false, false)).to.be.false;
        
    });
    
    it('isExecuteable', function() {

        var permission = new Permission();

        // user
        permission.setMode('0700')
        expect(permission.isExecuteable(true, false)).to.be.true;
        
        permission.setMode('0600')
        expect(permission.isExecuteable(true, false)).to.be.false;

        permission.setMode('0500')
        expect(permission.isExecuteable(true, false)).to.be.true;

        permission.setMode('0400')
        expect(permission.isExecuteable(true, false)).to.be.false;

        permission.setMode('0300')
        expect(permission.isExecuteable(true, false)).to.be.true;

        permission.setMode('0200')
        expect(permission.isExecuteable(true, false)).to.be.false;

        permission.setMode('0100')
        expect(permission.isExecuteable(true, false)).to.be.true;

        permission.setMode('0000')
        expect(permission.isExecuteable(true, false)).to.be.false;

        // group
        permission.setMode('0070')
        expect(permission.isExecuteable(false, true)).to.be.true;
        
        permission.setMode('0060')
        expect(permission.isExecuteable(false, true)).to.be.false;

        permission.setMode('0050')
        expect(permission.isExecuteable(false, true)).to.be.true;

        permission.setMode('0040')
        expect(permission.isExecuteable(false, true)).to.be.false;

        permission.setMode('0030')
        expect(permission.isExecuteable(false, true)).to.be.true;

        permission.setMode('0020')
        expect(permission.isExecuteable(false, true)).to.be.false;

        permission.setMode('0010')
        expect(permission.isExecuteable(false, true)).to.be.true;

        permission.setMode('0000')
        expect(permission.isExecuteable(false, true)).to.be.false;

        // other
        permission.setMode('0007')
        expect(permission.isExecuteable(false, false)).to.be.true;
        
        permission.setMode('0006')
        expect(permission.isExecuteable(false, false)).to.be.false;

        permission.setMode('0005')
        expect(permission.isExecuteable(false, false)).to.be.true;

        permission.setMode('0004')
        expect(permission.isExecuteable(false, false)).to.be.false;

        permission.setMode('0003')
        expect(permission.isExecuteable(false, false)).to.be.true;

        permission.setMode('0002')
        expect(permission.isExecuteable(false, false)).to.be.false;

        permission.setMode('0001')
        expect(permission.isExecuteable(false, false)).to.be.true;

        permission.setMode('0000')
        expect(permission.isExecuteable(false, false)).to.be.false;
        
    });


});

