'use strict';

import Options from './options';
import Permission from './permission';

import Node from './node';

export default class File extends Node {

    private content: string = undefined;

    constructor(inodeNumber: number, name: string, content:string, options: Options) {

        super(inodeNumber, name, options);

        this.content = content;

        this.permission = new Permission(options.permissions.file);        

    }

    public isRoot(): boolean {

        return false;

    }

    public isFile(): boolean {

        return true;

    }

    public isDirectory(): boolean {

        return false;

    }

    public getContent(): string {

        // this.getStats().atime = new Date();
        return this.content;

    }

    public setContent(content: string): void {

        // this.getStats().atime = new Date();
        // this.getStats().mtime = new Date();
        // this.getStats().size = content.length;

        this.content = content;

    }

}