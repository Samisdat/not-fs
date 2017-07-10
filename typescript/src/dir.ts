import Node from './node';

export default class Dir extends Node {

    public getContent(): string{

        return undefined;

    }

    public isRoot(): boolean {

        return false;

    }

    public isFile(): boolean {

        return false;

    }

    public isDirectory(): boolean {

        return true;

    }
}

