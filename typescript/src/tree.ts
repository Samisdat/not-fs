'use strict';

import * as path from 'path';


import Node from './node';
import Root from './root';
import Dir from './dir';
import File from './file';

export default class Tree {

    private tree: any = {}

    private leafs: { [index: number]: Node } = {};

    private parent: any = {}

    private inodeNumber: number = 0;
    private lastInodeNumber: number = 0;

    public constructor() {

        let root = new Root();
        this.getInodeNumber();
        this.tree[root.getInodeNumber()] = [];
        this.leafs[root.getInodeNumber()] = root;

    }

    private getInodeNumber(): number {

        this.lastInodeNumber = this.inodeNumber;
        this.inodeNumber += 1;
        return this.lastInodeNumber;

    };

    public getPathByInodeNumber(checkInodeNumber: number): string {

        var parts:any = [];

        var tree = this;

        var dive = function (inodeNumber:number) {

            if (true === tree.leafs[inodeNumber].isRoot()) {
                parts.push('');
            }
            else {
                parts.push(tree.leafs[inodeNumber].getName());

                if (undefined !== tree.parent[inodeNumber]) {
                    dive(tree.parent[inodeNumber]);
                }

            }
        };

        dive(checkInodeNumber);

        return parts.reverse().join('/');

    };

    public getLastInodeNumber(): number {

        return this.lastInodeNumber;

    };

    public exists(checkPath: string): boolean {

        checkPath = this.resolveDir(checkPath);

        var inodeNumber = this.getInodeNumberByPath(checkPath);
        return (undefined === inodeNumber) ? false : true;
    }

    public getNodeByPath(pathName: string): Node {

        if (false === this.exists(pathName)) {
            return;
        }

        var inodeNumber = this.getInodeNumberByPath(pathName);

        return this.leafs[inodeNumber];

    };

    public getChildrenByPath (pathName:string) {

        pathName = this.resolveDir(pathName);

        if (false === this.exists(pathName)) {
            return false;
        }

        if (false === this.isDirectory(pathName)) {
            return false;
        }

        var inodeNumber = this.getInodeNumberByPath(pathName);

        var childrenInodeNumbers = this.tree[inodeNumber];

        var children = [];

        for (var i = 0, x = childrenInodeNumbers.length; i < x; i += 1) {

            var inodeNumber:number = childrenInodeNumbers[i];

            children.push(
                this.leafs[inodeNumber]
            );

            this.leafs[inodeNumber].getName();

        }

        return children;

    };

    public getInodeNumberByPath(pathName:string):number {

        let parsePath = path.parse(pathName);

        if (parsePath.root === parsePath.dir && pathName === parsePath.dir) {
            return 0;
        }

        let tree = this;

        let inodeNumberByPath:number;

        let climb = function (inodeNumber:number) {

            if (pathName === tree.getPathByInodeNumber(inodeNumber)) {
                inodeNumberByPath = inodeNumber;
                return;
            }

            if (false !== tree.hasChildren(inodeNumber)) {

                var children = tree.getChildren(inodeNumber);

                //@TODO lastIndex SchnellTest
                children.forEach(function (child) {
                    climb(child);
                });

            }
        };

        climb(0);

        return inodeNumberByPath;

    };

    public createMissingDirs(dirPath: string): void {

        var parts = dirPath.split(path.sep);

        for (var i = 0, x = parts.length; i <= x; i += 1) {
            var addMissingDir = parts.slice(0, i).join('/');

            if ('/' === addMissingDir) {
                continue;
            }

            if ('' === addMissingDir) {
                continue;
            }

            if (false === this.exists(addMissingDir)) {
                this.addDir(addMissingDir, false);
            }

        }

    };


    public resolveDir(pathName: string): string {

        if ('/' === pathName) {
            return '/';
        }

        pathName = pathName.replace(/\/$/, '');

        pathName = path.normalize(pathName);

        // only linux style 
        pathName = pathName.replace(/\\/g, '/');

        if (false === path.isAbsolute(pathName)) {

            //pathName = path.join(__dirname, pathName);

            throw new Error('Only absolute path supported');


        }

        return pathName;

    };

    public addDir(dirPath:string, addMissingDirs = false):void {

        if ('' === dirPath.trim()) {
            throw new Error('dirPath may not be empty');
        }

        dirPath = this.resolveDir(dirPath);

        if (true === this.exists(dirPath)) {
            return;
        }

        var parentDirPath = path.dirname(dirPath);

        if (false === this.exists(parentDirPath)) {

            if (true !== addMissingDirs) {
                throw new Error('can not create ' + dirPath + ' while parent ' + parentDirPath + ' is not existing');
            }
            this.createMissingDirs(parentDirPath);
        }

        var parentInodeNumber = this.getInodeNumberByPath(parentDirPath);

        var dir = new Dir(
            this.getInodeNumber(),
            path.basename(dirPath)
        );

        this.tree[parentInodeNumber].push(dir.getInodeNumber());;
        this.tree[dir.getInodeNumber()] = [];
        this.leafs[dir.getInodeNumber()] = dir;
        this.parent[dir.getInodeNumber()] = parentInodeNumber;

    };

    public removeChildNode(inodeNumber:number):void {

        if (true !== this.hasChildren(inodeNumber)) {
            return;
        }

        var children = this.getChildren(inodeNumber);

        var tree = this;
        children.forEach(function (child) {
            tree.removeNode(child);
        });

    };

    public removeChildFromLimb(parentInodeNumber:number, childInodeNumber:number):void {

        var children = [];

        for (var i = 0, x = this.tree[parentInodeNumber].length; i < x; i += 1) {
            if (childInodeNumber === this.tree[parentInodeNumber][i]) {
                continue;
            }
            children.push(this.tree[parentInodeNumber][i]);
        }

        this.tree[parentInodeNumber] = children;

    };

    public removeNode(inodeNumber:number):void {

        var node = this.leafs[inodeNumber];

        if (true === node.isDirectory() && true === this.hasChildren(inodeNumber)) {

            this.removeChildNode(inodeNumber);

        }

        var parentInodeNumber = this.parent[inodeNumber];

        // remove node form parent
        if (true === this.hasChildren(parentInodeNumber)) {

            this.removeChildFromLimb(parentInodeNumber, inodeNumber);

        }

        delete this.leafs[inodeNumber];

        delete this.parent[inodeNumber];

        if (true === node.isDirectory()) {
            delete this.tree[inodeNumber];
        }
    };

    private isType(type:string, pathName:string):boolean {

        if ('file' !== type && 'dir' !== type) {
            throw new Error('unkown type');
        }

        if (false === this.exists(pathName)) {
            return undefined;
        }

        let inodeNumber:number = this.getInodeNumberByPath(pathName);

        let node:Node = this.leafs[inodeNumber]; 

        if ('file' === type) {
            return node.isFile();
        }        
        else if ('dir' === type) {
            return node.isDirectory();
        }        

    };

    public isDirectory (pathName:string):boolean {

        return this.isType('dir', pathName);

    };

    public isFile(pathName:string):boolean {

        return this.isType('file', pathName);

    };

    public addFile(filePath:string, data = '', addMissingDirs = false):void {

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

        let file = new File(
            this.getInodeNumber(),
            name,
            data
        );

        this.tree[parentInodeNumber].push(file.getInodeNumber());;
        this.leafs[file.getInodeNumber()] = file;
        this.parent[file.getInodeNumber()] = parentInodeNumber;

    };

    public removeDir (dirPath:string):void {

        dirPath = this.resolveDir(dirPath);

        if (false === this.exists(dirPath)) {
            return;
        }

        let inodeNumber = this.getInodeNumberByPath(dirPath);

        this.removeNode(inodeNumber);

    };

    public removeFile(filePath:string):void {

        if (false === this.exists(filePath)) {
            return;
        }

        let inodeNumber = this.getInodeNumberByPath(filePath);
        this.removeNode(inodeNumber);
    };

    public remove(filePath:string):void {

        if (false === this.exists(filePath)) {
            return;
        }

        let inodeNumber = this.getInodeNumberByPath(filePath);
        this.removeNode(inodeNumber);

    };

    public rename(oldPath:string, newPath:string, addMissingDirs = false) {

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

        node.setName(name);

    };


    /* istanbul ignore next */
    public hasChildren(inodeNumber:number):boolean {

        if (undefined !== this.tree[inodeNumber] && 0 < this.tree[inodeNumber].length) {
            return true;
        }
        return false;
    };

    public getChildren(inodeNumber:number):number[] {
        return this.tree[inodeNumber];
    };


    /* istanbul ignore next */
    public log () {

        let tree = this;

        let climb = function (inodeNumber:number, depth:number) {

            let tab = Array(depth).join('   ');

            let msg = '';
            if (0 < depth) {
                msg += tab + '└── ';
            }

            msg += tree.leafs[inodeNumber].getName();

            console.log(msg);

            if (undefined !== tree.hasChildren(inodeNumber)) {

                let children = tree.getChildren(inodeNumber);

                for(let child of children){
                    climb(child, (depth + 1));                    
                }

            }

        };

        climb(0, 0);
    };


}
