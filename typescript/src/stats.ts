import * as moment from 'moment';

import Node from './node';

export default class Stats{

    private node:Node;

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
    private _atime: moment.Moment; //  Mon, 10 Oct 2011 23:24:11 GMT,
    private _mtime: moment.Moment; //  Mon, 10 Oct 2011 23:24:11 GMT,
    private _ctime: moment.Moment; //  Mon, 10 Oct 2011 23:24:11 GMT,
    private _birthtime: moment.Moment; //  Mon, 10 Oct 2011 23:24:11 GMT }        

    constructor(node:Node) {

        this.node = node;

        this._dev = this.node.getOptions().stats.dev;
        this._ino = node.getInodeNumber();
        //this._mode: number; //  33188,
        this._nlink = 1; //  1,
        this._uid = this.node.getOptions().stats.userId;
        this._gid = this.node.getOptions().stats.groupId;
        this._rdev = this.node.getOptions().stats.rdev,
        //this._size: number; //  527,
        this._blksize = this.node.getOptions().stats.blockSize;
        this._blocks = this.node.getOptions().stats.blocks

        this._atime = this.node.getOptions().stats.accessTime;
        this._mtime = this.node.getOptions().stats.modifyTime;
        this._ctime = this.node.getOptions().stats.changeTime;
        this._birthtime = this.node.getOptions().stats.birthtime;
        
    }

    get dev():number{
        return this._dev;
    };
    
    get ino():number{
        return this._ino;
    };
    
    get mode():number{
        return 4;
    };
    
    get nlink():number{
        return this._nlink;
    };
    
    get uid():number{
        return this._uid;
    };
    
    get gid():number{
        return this._gid;
    };
    
    get rdev():number{
        return this._rdev;
    };
    
    get size():number{
        
        return this.node.getContent().length;
    };
    
    get blksize():number{
        return this._blksize;
    };

    get blocks():number{
        return this._blocks;
    };

    get atimeMs():number{
        return this._atime.valueOf();
    };

    get mtimeMs():number{
        return this._mtime.valueOf();
    };

    get ctimeMs():number{
        return this._ctime.valueOf();
    };

    get birthtimeMs():number{
        return this._birthtime.valueOf();
    };

    get atime():string{
        return this._atime.toString();
    };
    
    get mtime():string{
        return this._mtime.toString();
    };
    
    get ctime():string{
        return this._ctime.toString();
    };
    
    get birthtime():string{
        return this._birthtime.toString();
    };

    public isFile():boolean{
        return this.node.isFile();
    };

    public isDirectory():boolean{
        return this.node.isDirectory();
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
