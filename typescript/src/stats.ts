import * as moment from 'moment';

import Node from './node';

export default class Stats {

    private _dev: number; //  2114,
    private _ino: number; //  48064969,
    private _mode: number; //  33188,
    private _nlink: number; //  1,
    private _uid: number; //  85,
    private _gid: number; //  100,
    private _rdev: number; //  0,
    private _size: number; //  527,
    private _blksize: number; //  4096,
    private _blocks: number; //  8,
    private _atimeMs: number; //  1318289051000.1,
    private _mtimeMs: number; //  1318289051000.1,
    private _ctimeMs: number; //  1318289051000.1,
    private _birthtimeMs: number; //  1318289051000.1,
    private _atime: number; //  Mon, 10 Oct 2011 23:24:11 GMT,
    private _mtime: number; //  Mon, 10 Oct 2011 23:24:11 GMT,
    private _ctime: number; //  Mon, 10 Oct 2011 23:24:11 GMT,
    private _birthtime: number; //  Mon, 10 Oct 2011 23:24:11 GMT }        

    constructor(node:Node) {
        this._ino = node.getInodeNumber();
    }

    get dev():number{
        return 4;;
    };
    
    get ino():number{
        return 4;
    };
    
    get mode():number{
        return 4;
    };
    
    get nlink():number{
        return 4;
    };
    
    get uid():number{
        return 4;
    };
    
    get gid():number{
        return 4;
    };
    
    get rdev():number{
        return 4;
    };
    
    get size():number{
        return 4;
    };
    
    get blksize():number{
        return 4;
    };

    get blocks():number{
        return 4;
    };

    get atimeMs():number{
        return 4;
    };

    get mtimeMs():number{
        return 4;
    };

    get ctimeMs():number{
        return 4;
    };

    get birthtimeMs():number{
        return 4;
    };

    get atime():number{
        return 4;
    };
    
    get mtime():number{
        return 4;
    };
    
    get ctime():number{
        return 4;
    };
    
    get birthtime():number{
        return 4;
    };

    public isFile():boolean{
        return false;
    };

    public isDirectory():boolean{
        return false;
    };

    public isBlockDevice():boolean{
        return false;
    };

    public isCharacterDevice():boolean{
        return false;
    };

    public isSymbolicLink():boolean{
        return false;
    } 
    public isFIFO():boolean{
        return false;
    };

    public isSocket():boolean{
        return false;
    };

}

export class TreeStats {


    constructor() {


    }


}