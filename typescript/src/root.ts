'use strict';

import Dir from './dir';

export default class Root extends Dir {

    public constructor(path = '/') {
        super(0, path);
    }

    /**
     * Root's path is immutable  
     * @param name 
     */
    public setPath(name: string): void {

    }

    public isRoot(): boolean {

        return true;

    };
}

