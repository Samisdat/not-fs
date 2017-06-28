'use strict';

import Dir from './dir';

export default class Root extends Dir {

    public constructor() {
        super(0, '/');        
    }

    public getName():string {
        return '/';
    }

    public setName(name:string):void {
        
    }

    public isRoot():boolean{

        return true;

    };
}

