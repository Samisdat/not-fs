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

        expect(options.stats.dev).to.be.equals(2114);

        const userId = process.getuid();
        expect(options.stats.userId).to.be.equals(userId);

        const groupId = process.getgid();
        expect(options.stats.groupId).to.be.equals(groupId);

        expect(options.stats.rdev).to.be.equals(0);
        expect(options.stats.blockSize).to.be.equals(4096);
        expect(options.stats.blocks).to.be.equals(8);

        expect(options.stats.accessTime.format()).to.be.equals('2017-01-15T14:00:00+01:00');
        expect(options.stats.modifyTime.format()).to.be.equals('2017-01-14T14:00:00+01:00');
        expect(options.stats.changeTime.format()).to.be.equals('2017-01-14T16:00:00+01:00');
        expect(options.stats.birthtime.format()).to.be.equals('2017-01-13T13:00:00+01:00');

        expect(options.permissions.dir).to.be.equals('0755');
        expect(options.permissions.file).to.be.equals('0644');

    });

    it('check dev', function() {

        const optionsParam:OptionsInterface = {stats:{dev:50}};

        let options = new Options(optionsParam);

        expect(options.stats.dev).to.be.equals(50);

    });

    it('check userId', function() {

        const optionsParam:OptionsInterface = {stats:{userId:8}};

        let options = new Options(optionsParam);

        expect(options.stats.userId).to.be.equals(8);

    });

    it('check groupId', function() {

        const optionsParam:OptionsInterface = {stats:{groupId:9}};

        let options = new Options(optionsParam);

        expect(options.stats.groupId).to.be.equals(9);

    });

    it('check rdev', function() {

        const optionsParam:OptionsInterface = {stats:{rdev:1}};

        let options = new Options(optionsParam);

        expect(options.stats.rdev).to.be.equals(1);

    });

    it('check blockSize', function() {

        const optionsParam:OptionsInterface = {stats:{blockSize:2048}};

        let options = new Options(optionsParam);

        expect(options.stats.blockSize).to.be.equals(2048);

    });

    it('check blocks', function() {

        const optionsParam:OptionsInterface = {stats:{blocks:4}};

        let options = new Options(optionsParam);

        expect(options.stats.blocks).to.be.equals(4);

    });

    it('check accessTime', function() {

        const optionsParam:OptionsInterface = {stats:{accessTime:moment('2016-01-15T14:00:00+01:00')}};

        let options = new Options(optionsParam);

        expect(options.stats.accessTime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

    it('check modifyTime', function() {

        const optionsParam:OptionsInterface = {stats:{modifyTime:moment('2016-01-15T14:00:00+01:00')}};

        let options = new Options(optionsParam);

        expect(options.stats.modifyTime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

    it('check changeTime', function() {

        const optionsParam:OptionsInterface = {stats:{changeTime:moment('2016-01-15T14:00:00+01:00')}};

        let options = new Options(optionsParam);

        expect(options.stats.changeTime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

    it('check birthtime', function() {

        const optionsParam:OptionsInterface = {stats:{birthtime:moment('2016-01-15T14:00:00+01:00')}};

        let options = new Options(optionsParam);

        expect(options.stats.birthtime.format()).to.be.equals('2016-01-15T14:00:00+01:00');

    });

    it('check dir permission', function() {

        const optionsParam:OptionsInterface = {permissions:{dir:'0777'}};

        let options = new Options(optionsParam);

        expect(options.permissions.dir).to.be.equals('0777');

    });

    it('check file permission', function() {

        const optionsParam:OptionsInterface = {permissions:{file:'0777'}};

        let options = new Options(optionsParam);

        expect(options.permissions.file).to.be.equals('0777');

    });


});