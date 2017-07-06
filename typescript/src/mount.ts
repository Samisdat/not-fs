const fs = require('fs');

import * as moment from 'moment';

import {OptionsInterface} from './options';
import {JsonTreeInterface} from './options';

import Options from './options';

import Node from './node';
import Tree from './tree';

export default class Mount {

    private snapshots: { [index: string]: {} } = {};

    private parseOptions(optionsJson:any):Options{
        let options: OptionsInterface = {
            stats:{},
            permissions:{}
        };

        if(undefined !== optionsJson.permissions){

            if(undefined !== optionsJson.permissions.dir){

                options.permissions.dir = optionsJson.permissions.dir;

            }                    

            if(undefined !== optionsJson.permissions.file){

                options.permissions.file = optionsJson.permissions.file;

            }                    

        }      

        return new Options(options);
    }

    private createOptions(node:Node, defaultOptions: OptionsInterface):OptionsInterface{
        let options: OptionsInterface = {
            stats:{},
            permissions:{}
        };

        if(true === node.isDirectory()){
            options.permissions.dir = node.getPermission().getMode();
            options.permissions.file = defaultOptions.permissions.file;
        }
        else if(true === node.isFile()){
            options.permissions.dir = defaultOptions.permissions.dir;
            options.permissions.file = node.getPermission().getMode();
        }

        return options;

    }

    public fromJson(json: any): Tree {

        const mountPath: string = (undefined !== json.mount) ? json.mount : '/';

        let treeOptionsJson:any = (undefined !== json.options) ? json.options : {};
        let treeOptions:Options = this.parseOptions(treeOptionsJson);

        let tree = new Tree(mountPath, treeOptions);

        for (let node of json.fs) {

            let nodeOptions:Options = undefined;

            if(undefined !== node.options){

                nodeOptions = this.parseOptions(node.options);

            }

            if ('dir' === node.type) {
                tree.addDir(mountPath + '/' + node.path, true, nodeOptions);
            }
            else if ('file' === node.type) {
                let content = (undefined !== node.content) ? node.content : '';

                tree.addFile(mountPath + '/' + node.path, content, true, nodeOptions);
            }
        }

        return tree;

    }

    public fromJsonFile(jsonPath: string): Tree {

        const raw = fs.readFileSync(jsonPath, { encoding: 'utf8' });
        const json = JSON.parse(raw);

        return this.fromJson(json);

    }

    public toJson(tree: Tree) {

        let treeOptions:Options = tree.getOptions();

        let defaultOptions: OptionsInterface = {
            stats:{
                userId: treeOptions.stats.userId,
                groupId: treeOptions.stats.groupId,
                rdev: treeOptions.stats.rdev,
                dev: treeOptions.stats.dev,
                blockSize: treeOptions.stats.blockSize,
                blocks: treeOptions.stats.blocks,
                accessTime: treeOptions.stats.accessTime,
                modifyTime: treeOptions.stats.modifyTime,
                changeTime: treeOptions.stats.changeTime,
                birthtime: treeOptions.stats.birthtime,  
            },
            permissions:{
                dir: treeOptions.permissions.dir, 
                file: treeOptions.permissions.file 
            }
        };

        let json:JsonTreeInterface = {
            mount:tree.getMountPath() + '/',
            options:defaultOptions,
            fs:[]
        };

        let mountPath = tree.getMountPath() + '/';

        for (let leaf of tree.getLeafs()) {

            let entry: any = {};
            entry.type = (leaf.isDirectory()) ? 'dir' : 'file';
            entry.path = tree.getPathByInodeNumber(leaf.getInodeNumber()).replace(mountPath, '');

            if (true === leaf.isFile()) {
                entry.content = leaf.getContent();
            }

            entry.options = this.createOptions(leaf, json.options);

            json.fs.push(entry);
        }

        return json;
    }

    public toJsonFile(jsonPath: string, tree: Tree) {

        const json = this.toJson(tree);

        fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4), { encoding: 'utf-8' });

    }

}