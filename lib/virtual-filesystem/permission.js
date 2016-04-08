'use strict';

var Permission = function(mode) {

    if(undefined === mode){
        mode = '0000';
    }

    this.setMode(mode);
};


Permission.prototype._validate = function(mode){

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

Permission.prototype._normalise = function(mode){
    
    if(false === this._validate(mode)){
        throw new Error(mode + ' is not a valid permission');
    }

    if(3 === mode.length){
        mode = '0' + mode;
    }

    return mode;

};

Permission.prototype.getMode = function(){

    return this.mode;

};

Permission.prototype.setMode = function(mode){

    this.mode = this._normalise(mode);

};

Permission.prototype.isReadable = function(isOwner, isOwnerGroupMember){

    // other part
    var part = this.mode[3];
    if(true === isOwner){
        part = this.mode[1];
    }
    else if(true === isOwnerGroupMember){
        part = this.mode[2];
    }

    if('7' === part){
        return true;
    }

    if('6' === part){
        return true;
    }

    if('5' === part){
        return true;
    }

    if('4' === part){
        return true;
    }
    
    return false;
};

Permission.prototype.isWriteable = function(isOwner, isOwnerGroupMember){

    // other part
    var part = this.mode[3];
    if(true === isOwner){
        part = this.mode[1];
    }
    else if(true === isOwnerGroupMember){
        part = this.mode[2];
    }

    if('7' === part){
        return true;
    }

    if('6' === part){
        return true;
    }

    if('3' === part){
        return true;
    }

    if('2' === part){
        return true;
    }
    
    return false;
};

Permission.prototype.isExecuteable = function(isOwner, isOwnerGroupMember){

    // other part
    var part = this.mode[3];
    if(true === isOwner){
        part = this.mode[1];
    }
    else if(true === isOwnerGroupMember){
        part = this.mode[2];
    }

    if('7' === part){
        return true;
    }

    if('5' === part){
        return true;
    }

    if('3' === part){
        return true;
    }

    if('1' === part){
        return true;
    }
    
    return false;
};


module.exports = Permission;
