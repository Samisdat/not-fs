'use strict';

export default class Permission {

    private mode: string;

    constructor(mode = '0000') {

        this.setMode(mode);

    }

    private validate(mode: string): boolean {
        /*
         * 4 = read
         * 2 = write
         * 1 = execute
         * 0 = no permission
         *
         * 3 = w+x
         * 5 = r+x
         * 6 = r+w
         * 7 = r+w+x
         */

        var regEx = /^0{0,1}[01234567]{3}$/;
        return regEx.test(mode);

    };

    private normalise(mode: string): string {

        if (3 === mode.length) {
            mode = '0' + mode;
        }

        return mode;

    };

    public setMode(mode: string): void {

        if (false === this.validate(mode)) {
            throw new Error(mode + ' is not a valid permission');
        }

        this.mode = this.normalise(mode);

    };


    public getMode(): string {
        return this.mode
    }

    private getPart(isOwner = false, isOwnerGroupMember= false):string {

        // other part
        var part = this.mode[3];
        if (true === isOwner) {
            part = this.mode[1];
        }
        else if (true === isOwnerGroupMember) {
            part = this.mode[2];
        }

        return part;
    };

    public isReadable(isOwner = false, isOwnerGroupMember = false):boolean {

        var part = this.getPart(isOwner, isOwnerGroupMember);

        if ('7' === part) {
            return true;
        }

        if ('6' === part) {
            return true;
        }

        if ('5' === part) {
            return true;
        }

        if ('4' === part) {
            return true;
        }

        return false;
    };


    public isWritable(isOwner = false, isOwnerGroupMember= false):boolean {

        var part = this.getPart(isOwner, isOwnerGroupMember);

        if ('7' === part) {
            return true;
        }

        if ('6' === part) {
            return true;
        }

        if ('3' === part) {
            return true;
        }

        if ('2' === part) {
            return true;
        }

        return false;
    };

    public isExecutable(isOwner = false, isOwnerGroupMember= false):boolean {

        var part = this.getPart(isOwner, isOwnerGroupMember);

        if ('7' === part) {
            return true;
        }

        if ('5' === part) {
            return true;
        }

        if ('3' === part) {
            return true;
        }

        if ('1' === part) {
            return true;
        }

        return false;
    };


}

