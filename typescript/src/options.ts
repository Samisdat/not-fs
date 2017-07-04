import * as moment from 'moment';

export interface OptionsInterface {
    dev?: number;
    userId?: number;
    groupId?: number;
    rdev?: number;
    blockSize?: number;
    blocks?: number;
    accessTime?: moment.Moment;
    modifyTime?: moment.Moment;
    changeTime?: moment.Moment;
    birthtime?: moment.Moment;
}

export default class Options {

    private options: OptionsInterface = {};

    private user: number;
    private group: number;

    private statsDev: number;
    private statsRdev: number;
    private statsUid: number;
    private statsGid: number;
    private statsBlksize: number;

    constructor(options?: OptionsInterface) {

        if (undefined !== options) {
            this.options = options;
        }

        this.setDev();
        this.setUserId();
        this.setGroupId();
        this.setRdev();
        this.setBlockSize();
        this.setBlocks();
        this.setAccessTime();
        this.setModifyTime();
        this.setChangeTime();
        this.setBirthtime();


    }

    private setDev(): void {

        if (undefined === this.options.dev) {
            this.options.dev = 2114;
        }

    }

    private setUserId(): void {

        if (undefined === this.options.userId) {
            this.options.userId = process.getuid();
        }

    }

    private setGroupId(): void {

        if (undefined === this.options.groupId) {
            this.options.groupId = process.getgid();
        }

    }

    private setRdev(): void {

        if (undefined === this.options.rdev) {
            this.options.rdev = 0;
        }

    }

    private setBlockSize(): void {

        if (undefined === this.options.blockSize) {
            this.options.blockSize = 4096;
        }

    }

    private setBlocks(): void {

        if (undefined === this.options.blocks) {
            this.options.blocks = 8;
        }


    }

    private setAccessTime(): void {toString

        if (undefined === this.options.accessTime) {
            this.options.accessTime = moment('2017-01-15T14:00:00+01:00');
        }

    }

    private setModifyTime(): void {

        if (undefined === this.options.modifyTime) {
            this.options.modifyTime = moment('2017-01-14T14:00:00+01:00');
        }

    }

    private setChangeTime(): void {

        if (undefined === this.options.changeTime) {
            this.options.changeTime = moment('2017-01-14T16:00:00+01:00');
        }

    }

    private setBirthtime(): void {

        if (undefined === this.options.birthtime) {
            this.options.birthtime = moment('2017-01-13T13:00:00+01:00');
        }

    }

    get dev(): number {

        return this.options.dev;

    }

    get userId(): number {

        return this.options.userId;

    }


    get groupId(): number {

        return this.options.groupId;

    }

    get rdev(): number {

        return this.options.rdev;

    }

    get blockSize(): number {

        return this.options.blockSize;

    }

    get blocks(): number {

        return this.options.blocks;

    }

    get accessTime(): moment.Moment {

        return this.options.accessTime;

    }

    get modifyTime(): moment.Moment {

        return this.options.modifyTime;

    }

    get changeTime(): moment.Moment {

        return this.options.changeTime;

    }

    get birthtime(): moment.Moment {

        return this.options.birthtime;

    }

}