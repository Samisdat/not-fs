import * as path from 'path';

import Options from './options';
import Node from './node';

export default class Root extends Node {

    public constructor(rootPath:string, options:Options) {

        super(0, rootPath, options);

    }

    protected validatePath(rootPath: string): void {

        if (false === path.isAbsolute(rootPath)) {
            throw new Error('root path must be absolute');
        }

    }

    /**
     * Root's path is immutable  
     * @param rootPath 
     */
    public setPathPart(rootPath: string): void {

    }

    public getContent(): string{

        return undefined;

    }

    public isRoot(): boolean {

        return true;

    }

    public isFile(): boolean {

        return false;

    }

    public isDirectory(): boolean {

        return true;

    }
}