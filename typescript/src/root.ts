'use strict';

import * as path from 'path';

import Node from './node';

export default class Root extends Node {

    public constructor(rootPath = '/') {
        super(0, rootPath);

    }

    protected validatePath(rootPath: string): void {

        if(false === path.isAbsolute(rootPath)){
            throw new Error('root path must be absolute');
        }

    }

    /**
     * Root's path is immutable  
     * @param rootPath 
     */
    public setPathPart(rootPath: string): void {

    }

    public isRoot():boolean{

        return true;

    };

    public isFile():boolean{

        return false;

    };

    public isDirectory():boolean{

        return true;

    };}

