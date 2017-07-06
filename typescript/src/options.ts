import * as moment from 'moment';

export interface StatsInterface {
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

export interface PermissionsInterface {
    dir?: string;
    file?: string;
}

export interface OptionsInterface {
    stats?:StatsInterface;
    permissions?:PermissionsInterface
}

export interface JsonTreeInterface {
    mount?:string;
    options?:OptionsInterface;
    fs:any[];
}


export default class Options implements OptionsInterface{

    private options: OptionsInterface = {
        stats:{},
        permissions:{}
    };

    constructor(options?: OptionsInterface) {

        if (undefined !== options) {
            this.options = options;
        }

        this.setStat();
        this.setPermissions();

    }

    private setStat(){

        if(undefined === this.options.stats){
            this.options.stats = {};
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

    private setPermissions():void{

        if(undefined === this.options.permissions){
            this.options.permissions = {};
        }

        if (undefined === this.options.permissions.dir) {
            this.options.permissions.dir = '0755';
        }

        if (undefined === this.options.permissions.file) {
            this.options.permissions.file = '0644';
        }

    }

    private setDev(): void {

        if (undefined === this.options.stats.dev) {
            this.options.stats.dev = 2114;
        }

    }

    private setUserId(): void {

        if (undefined === this.options.stats.userId) {
            this.options.stats.userId = process.getuid();
        }

    }

    private setGroupId(): void {

        if (undefined === this.options.stats.groupId) {
            this.options.stats.groupId = process.getgid();
        }

    }

    private setRdev(): void {

        if (undefined === this.options.stats.rdev) {
            this.options.stats.rdev = 0;
        }

    }

    private setBlockSize(): void {

        if (undefined === this.options.stats.blockSize) {
            this.options.stats.blockSize = 4096;
        }

    }

    private setBlocks(): void {

        if (undefined === this.options.stats.blocks) {
            this.options.stats.blocks = 8;
        }


    }

    private setAccessTime(): void {toString

        if (undefined === this.options.stats.accessTime) {
            this.options.stats.accessTime = moment('2017-01-15T14:00:00+01:00');
        }

    }

    private setModifyTime(): void {

        if (undefined === this.options.stats.modifyTime) {
            this.options.stats.modifyTime = moment('2017-01-14T14:00:00+01:00');
        }

    }

    private setChangeTime(): void {

        if (undefined === this.options.stats.changeTime) {
            this.options.stats.changeTime = moment('2017-01-14T16:00:00+01:00');
        }

    }

    private setBirthtime(): void {

        if (undefined === this.options.stats.birthtime) {
            this.options.stats.birthtime = moment('2017-01-13T13:00:00+01:00');
        }

    }

    get stats(): StatsInterface {

        return this.options.stats;

    }

    get permissions(): PermissionsInterface {

        return this.options.permissions;

    }

}