import * as path from 'path';

import Options from './options';

import Node from './node';
import Root from './root';
import Dir from './dir';
import File from './file';

export default class Tree {

    private options:Options;

    private tree: { [index: number]: number[] } = {};

    private leafs: { [index: number]: Node } = {};

    private parent: { [index: number]: number } = {};

    private inodeNumber: number = 0;
    private lastInodeNumber: number = 0;

    private mountPath: string;

    public constructor(mountPath = '/', options?: Options) {

        this.mountPath = this.resolveDir(mountPath);

        if(undefined === options){
            options = new Options();
        }

        this.options = options;

        let root = new Root(this.mountPath, this.options);

        this.getInodeNumber();
        this.tree[root.getInodeNumber()] = [];
        this.leafs[root.getInodeNumber()] = root;

    }

    public getMountPath(): string {

        return this.mountPath;

    }

    public getOptions():Options{
        return this.options;
    }

    public getTree(): any {

        return this.tree;

    }

    public getParent(): any {

        return this.parent;

    }

    public getLeafs(): Node[] {

        let leafs: Node[] = [];

        for (let leaf in this.leafs) {

            const node: Node = this.leafs[leaf];

            if (true === node.isRoot()) {
                continue;
            }

            leafs.push(node);
        }

        return leafs;
    }

    private getInodeNumber(): number {

        this.lastInodeNumber = this.inodeNumber;
        this.inodeNumber += 1;
        return this.lastInodeNumber;

    }

    public getPathByInodeNumber(checkInodeNumber: number): string {

        let parts: any = [];

        let tree = this;

        let dive = function (inodeNumber: number) {

            if (true === tree.leafs[inodeNumber].isRoot()) {
                parts.push('');
            }
            else {
                parts.push(tree.leafs[inodeNumber].getPathPart());

                if (undefined !== tree.parent[inodeNumber]) {
                    dive(tree.parent[inodeNumber]);
                }

            }
        };

        dive(checkInodeNumber);

        let path = parts.reverse().join('/');


        if ('/' !== this.mountPath) {
            path = this.mountPath + path;
        }

        return path;

    }

    public getLastInodeNumber(): number {

        return this.lastInodeNumber;

    }

    public exists(checkPath: string): boolean {

        checkPath = this.resolveDir(checkPath);

        let inodeNumber = this.getInodeNumberByPath(checkPath);
        return (undefined === inodeNumber) ? false : true;

    }

    public getNodeByPath(pathName: string): Node {

        if (false === this.exists(pathName)) {

            return;

        }

        let inodeNumber = this.getInodeNumberByPath(pathName);

        return this.leafs[inodeNumber];

    }

    public getChildrenByPath(pathName: string) {

        pathName = this.resolveDir(pathName);

        if (false === this.exists(pathName)) {

            return false;

        }

        if (false === this.isDirectory(pathName)) {

            return false;

        }

        let inodeNumber = this.getInodeNumberByPath(pathName);

        let childrenInodeNumbers = this.tree[inodeNumber];

        let children = [];

        for (let i = 0, x = childrenInodeNumbers.length; i < x; i += 1) {

            let inodeNumber: number = childrenInodeNumbers[i];

            children.push(
                this.leafs[inodeNumber]
            );

            this.leafs[inodeNumber].getPathPart();

        }

        return children;

    }

    public getInodeNumberByPath(pathName: string): number {

        if (pathName === this.mountPath) {
            return 0;
        }

        let parsePath = path.parse(pathName);
        let tree = this;

        let inodeNumberByPath: number;

        let climb = function (inodeNumber: number) {

            if (pathName === tree.getPathByInodeNumber(inodeNumber)) {

                inodeNumberByPath = inodeNumber;
                return;

            }

            if (false !== tree.hasChildren(inodeNumber)) {

                let children = tree.getChildren(inodeNumber);

                // @TODO lastIndex SchnellTest
                children.forEach(function (child) {
                    climb(child);
                });

            }
        };

        climb(0);

        return inodeNumberByPath;

    }

    public createMissingDirs(dirPath: string): void {

        dirPath = dirPath.replace(this.mountPath, '');

        let parts = dirPath.split(path.sep);
        parts = parts.filter(function (value) {
            return '' !== value;
        });

        for (let i = 0, x = parts.length; i <= x; i += 1) {
            let addMissingDir = parts.slice(0, i).join('/');

            if ('/' === addMissingDir) {
                continue;
            }

            if ('' === addMissingDir) {
                continue;
            }

            if (false === this.exists(this.mountPath + addMissingDir)) {

                this.addDir(this.mountPath + '/' + addMissingDir, false);

            }

        }

    }

    public resolveDir(pathName: string): string {

        if ('/' === pathName) {
     
            return '/';
     
       }

        pathName = pathName.replace(/\/$/, '');

        pathName = path.normalize(pathName);

        // only linux style 
        pathName = pathName.replace(/\\/g, '/');

        if (false === path.isAbsolute(pathName)) {

            throw new Error('Only absolute path supported');

        }

        return pathName;

    }

    public addDir(dirPath: string, addMissingDirs = false, options?:Options): void {

        if (true === this.exists(dirPath)) {
    
            return;
    
        }

        if ('' === dirPath.trim()) {

            throw new Error('dirPath may not be empty');

        }

        dirPath = this.resolveDir(dirPath);

        if (true === this.exists(dirPath)) {

            return;

        }

        let parentDirPath = path.dirname(dirPath);

        if (false === this.exists(parentDirPath)) {

            if (true !== addMissingDirs) {

                throw new Error('can not create ' + dirPath + ' while parent ' + parentDirPath + ' is not existing');

            }

            this.createMissingDirs(parentDirPath);

        }

        let parentInodeNumber = this.getInodeNumberByPath(parentDirPath);

        options = (undefined === options) ? this.options : options;

        let dir = new Dir(
            this.getInodeNumber(),
            path.basename(dirPath),
            options
        );

        this.tree[parentInodeNumber].push(dir.getInodeNumber());
        this.tree[dir.getInodeNumber()] = [];
        this.leafs[dir.getInodeNumber()] = dir;
        this.parent[dir.getInodeNumber()] = parentInodeNumber;

    }

    public removeChildNode(inodeNumber: number): void {

        if (true !== this.hasChildren(inodeNumber)) {

            return;

        }

        let children = this.getChildren(inodeNumber);

        let tree = this;
        children.forEach(function (child) {
            tree.removeNode(child);
        });

    }

    public removeChildFromLimb(parentInodeNumber: number, childInodeNumber: number): void {

        let children = [];

        for (let i = 0, x = this.tree[parentInodeNumber].length; i < x; i += 1) {

            if (childInodeNumber === this.tree[parentInodeNumber][i]) {

                continue;

            }

            children.push(this.tree[parentInodeNumber][i]);

        }

        this.tree[parentInodeNumber] = children;

    }

    public removeNode(inodeNumber: number): void {

        let node = this.leafs[inodeNumber];

        if (true === node.isDirectory() && true === this.hasChildren(inodeNumber)) {

            this.removeChildNode(inodeNumber);

        }

        let parentInodeNumber = this.parent[inodeNumber];

        // remove node form parent
        if (true === this.hasChildren(parentInodeNumber)) {

            this.removeChildFromLimb(parentInodeNumber, inodeNumber);

        }

        delete this.leafs[inodeNumber];

        delete this.parent[inodeNumber];

        if (true === node.isDirectory()) {

            delete this.tree[inodeNumber];

        }

    }

    private isType(type: string, pathName: string): boolean {

        if ('file' !== type && 'dir' !== type) {

            throw new Error('unkown type');

        }

        if (false === this.exists(pathName)) {

            return undefined;

        }

        let inodeNumber: number = this.getInodeNumberByPath(pathName);

        let node: Node = this.leafs[inodeNumber];

        if ('file' === type) {

            return node.isFile();

        }
        else if ('dir' === type) {

            return node.isDirectory();

        }

    }

    public isDirectory(pathName: string): boolean {

        return this.isType('dir', pathName);

    }

    public isFile(pathName: string): boolean {

        return this.isType('file', pathName);

    }

    public addFile(filePath: string, data = '', addMissingDirs = false, options?: Options): void {

        if (true === this.exists(filePath)) {

            return;

        }

        addMissingDirs = (undefined === addMissingDirs) ? false : addMissingDirs;

        addMissingDirs = true;

        let parentDirPath = path.dirname(filePath);

        if (false === this.exists(parentDirPath)) {

            if (true !== addMissingDirs) {

                throw new Error('can not create ' + filePath + ' while parent ' + parentDirPath + ' is not existing');

            }

            this.createMissingDirs(parentDirPath);

        }

        let parentInodeNumber = this.getInodeNumberByPath(parentDirPath);

        let name = filePath.replace(parentDirPath + '/', '');

        options = (undefined === options) ? this.options : options;

        let file = new File(
            this.getInodeNumber(),
            name,
            data,
            options
        );

        this.tree[parentInodeNumber].push(file.getInodeNumber());
        this.leafs[file.getInodeNumber()] = file;
        this.parent[file.getInodeNumber()] = parentInodeNumber;

    }

    public removeDir(dirPath: string): void {

        dirPath = this.resolveDir(dirPath);

        if (false === this.exists(dirPath)) {

            return;

        }

        let inodeNumber = this.getInodeNumberByPath(dirPath);

        this.removeNode(inodeNumber);

    }

    public removeFile(filePath: string): void {

        if (false === this.exists(filePath)) {

            return;

        }

        let inodeNumber = this.getInodeNumberByPath(filePath);
        this.removeNode(inodeNumber);

    }

    public remove(filePath: string): void {

        if (false === this.exists(filePath)) {

            return;

        }

        let inodeNumber = this.getInodeNumberByPath(filePath);
        this.removeNode(inodeNumber);

    }

    public rename(oldPath: string, newPath: string, addMissingDirs = false) {

        addMissingDirs = true;

        if (false === this.exists(oldPath)) {

            return;

        }

        if (true === this.exists(newPath)) {

            return;

        }

        let inodeNumber = this.getInodeNumberByPath(oldPath);
        let node = this.getNodeByPath(oldPath);

        let parentDirOfNewPath = path.dirname(newPath);

        if (false === this.exists(parentDirOfNewPath)) {

            if (true !== addMissingDirs) {

                throw new Error('can not create ' + newPath + ' while parent ' + parentDirOfNewPath + ' is not existing');

            }

            this.createMissingDirs(parentDirOfNewPath);

        }

        let parentInodeNumverOfOldPath = this.parent[inodeNumber];
        let parentInodeNumverOfNewPath = this.getInodeNumberByPath(parentDirOfNewPath);

        if (parentInodeNumverOfOldPath !== parentInodeNumverOfNewPath) {

            this.parent[inodeNumber] = parentInodeNumverOfNewPath;

            this.removeChildFromLimb(parentInodeNumverOfOldPath, inodeNumber);

            this.tree[parentInodeNumverOfNewPath].push(inodeNumber);

        }

        let name = newPath.replace(parentDirOfNewPath, '').replace(/^\//, '');

        node.setPathPart(name);

    }

    /* istanbul ignore next */
    public hasChildren(inodeNumber: number): boolean {

        if (undefined !== this.tree[inodeNumber] && 0 < this.tree[inodeNumber].length) {

            return true;

        }

        return false;

    }

    public getChildren(inodeNumber: number): number[] {

        return this.tree[inodeNumber];

    }

    /* istanbul ignore next */
    public log() {

        let tree = this;

        let climb = function (inodeNumber: number, depth: number) {

            let tab = Array(depth).join('   ');

            let msg = '';

            if (0 < depth) {

                msg += tab + '└── ';

            }

            msg += tree.leafs[inodeNumber].getPathPart();

            console.log(msg);

            if (undefined !== tree.hasChildren(inodeNumber)) {

                let children = tree.getChildren(inodeNumber);

                if (undefined !== children) {

                    for (let child of children) {

                        climb(child, (depth + 1));

                    }

                }

            }

        };

        climb(0, 0);
    }

}