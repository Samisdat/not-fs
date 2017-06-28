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

    private setMode(mode: string): void {

        if (false === this.validate(mode)) {
            throw new Error(mode + ' is not a valid permission');
        }

        this.mode = this.normalise(mode);

    };


    public getMode(): string {
        return this.mode
    }

}
/*
var bunker = function () {

    var Permission = function (mode) {

        if (undefined === mode) {
            mode = '0000';
        }

        mode = '' + mode;

        this.setMode(mode);
    };


    Permission.prototype._validate = function (mode) {

         * 4 = read
         * 2 = write
         * 1 = execute
         * 0 = no permission
         *
         * 3 = w+x
         * 5 = r+x
         * 6 = r+w
         * 7 = r+w+x

        var regEx = /^0{0,1}[01234567]{3}$/;
        return regEx.test(mode);

    };

    Permission.prototype._normalise = function (mode) {

        if (3 === mode.length) {
            mode = '0' + mode;
        }

        return mode;

    };

    Permission.prototype.getMode = function () {

        return this.mode;

    };

    Permission.prototype.setMode = function (mode) {

        if (false === this._validate(mode)) {
            throw new Error(mode + ' is not a valid permission');
        }

        this.mode = this._normalise(mode);

    };

    Permission.prototype._getPart = function (isOwner, isOwnerGroupMember) {

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

    Permission.prototype.isReadable = function (isOwner, isOwnerGroupMember) {

        var part = this._getPart(isOwner, isOwnerGroupMember);

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

    Permission.prototype.isWritable = function (isOwner, isOwnerGroupMember) {

        var part = this._getPart(isOwner, isOwnerGroupMember);

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

    Permission.prototype.isExecutable = function (isOwner, isOwnerGroupMember) {

        var part = this._getPart(isOwner, isOwnerGroupMember);

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
*/