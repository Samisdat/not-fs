import { expect } from 'chai';

import * as moment from 'moment';

import {OptionsInterface} from './options';

import Options from './options';

describe('options', function() {

    beforeEach(function() {
    });

    it('can be created', function() {

        let options = new Options();

        expect(options).to.be.instanceof(Options);

    });

    it('check default', function() {

        let options = new Options();

        expect(options.dev).to.be.equals(2114);

        const userId = process.getuid();
        expect(options.userId).to.be.equals(userId);

        const groupId = process.getgid();
        expect(options.groupId).to.be.equals(groupId);

        expect(options.rdev).to.be.equals(0);
        expect(options.blockSize).to.be.equals(4096);
        expect(options.blocks).to.be.equals(8);

        expect(options.accessTime.format()).to.be.equals('2017-01-15T14:00:00+01:00');
        expect(options.modifyTime.format()).to.be.equals('2017-01-14T14:00:00+01:00');
        expect(options.changeTime.format()).to.be.equals('2017-01-14T16:00:00+01:00');
        expect(options.birthtime.format()).to.be.equals('2017-01-13T13:00:00+01:00');

    });

    it('check dev', function() {

        const optionsParam:OptionsInterface = {dev:50};

        let options = new Options(optionsParam);

        expect(options.dev).to.be.equals(50);

    });

    it('check userId', function() {

        const optionsParam:OptionsInterface = {userId:8};

        let options = new Options(optionsParam);

        expect(options.userId).to.be.equals(8);

    });

    it('check groupId', function() {

        const optionsParam:OptionsInterface = {groupId:9};

        let options = new Options(optionsParam);

        expect(options.groupId).to.be.equals(9);

    });

    it('check rdev', function() {

        const optionsParam:OptionsInterface = {rdev:1};

        let options = new Options(optionsParam);

        expect(options.rdev).to.be.equals(1);

    });

    it('check blockSize', function() {

        const optionsParam:OptionsInterface = {blockSize:2048};

        let options = new Options(optionsParam);

        expect(options.blockSize).to.be.equals(2048);

    });

    it('check blocks', function() {

        const optionsParam:OptionsInterface = {blocks:4};

        let options = new Options(optionsParam);

        expect(options.blocks).to.be.equals(4);

    });

    it('check accessTime', function() {

        const optionsParam:OptionsInterface = {accessTime:moment('2016-01-15T14:00:00+01:00')};

        let options = new Options(optionsParam);

        expect(options.accessTime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

    it('check modifyTime', function() {

        const optionsParam:OptionsInterface = {modifyTime:moment('2016-01-15T14:00:00+01:00')};

        let options = new Options(optionsParam);

        expect(options.modifyTime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

    it('check changeTime', function() {

        const optionsParam:OptionsInterface = {changeTime:moment('2016-01-15T14:00:00+01:00')};

        let options = new Options(optionsParam);

        expect(options.changeTime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

    it('check birthtime', function() {

        const optionsParam:OptionsInterface = {birthtime:moment('2016-01-15T14:00:00+01:00')};

        let options = new Options(optionsParam);

        expect(options.birthtime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

});