'use strict';

import Node from './node';
import Permission from './permission';

export default class File extends Node {

    private content:string = undefined;

    constructor(inodeNumber:number, name:string, content = '') {

        super(inodeNumber, name);

        this.permission = new Permission('0644');

        this.content = content;

    }

    public isRoot():boolean{

        return false;

    };

    public isFile():boolean{

        return true;

    };

    public isDirectory():boolean{

        return false;

    };

    public getContent():string{

        //this.getStats().atime = new Date();
        return this.content;

    };

    public setContent(content:string):void{

        //this.getStats().atime = new Date();
        //this.getStats().mtime = new Date();
        //this.getStats().size = content.length;

        this.content = content;

    };
    
}

