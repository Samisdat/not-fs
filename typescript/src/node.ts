'use strict';

import Permission from './permission';

export default class Node {

    private inodeNumber:number;
    private name:string;

    protected permission:Permission

    constructor(inodeNumber:number, name:string) {
        
        this.inodeNumber = inodeNumber;
        this.name = name;

        this.permission = new Permission('0755');

    }

    public getInodeNumber():number{

        return this.inodeNumber;
    }

    public getName():string{

        return this.name;
    }

    public setName(name:string):void{

        this.name = name;
    }

    public getContent():string{

        return undefined;

    };


    public getPermission():Permission{

        return this.permission;

    };

    public setPermission = function(permission:string){

        this.permission.setMode(permission);

    };

    public isRoot():boolean{

        return false;

    };

    public isFile():boolean{

        return undefined;

    };

    public isDirectory():boolean{

        return undefined;

    };

    public isBlockDevice():boolean{

        return false;

    };

    public isCharacterDevice():boolean{

        return false;

    };

    public isSymbolicLink():boolean{

        return false;

    };

    public isFIFO():boolean{

        return false;

    };

    public isSocket():boolean{

        return false;

    };


}

