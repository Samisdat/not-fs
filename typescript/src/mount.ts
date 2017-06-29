'use strict';

const fs = require('fs');

import Tree from './tree';

export default class Mount {

    public fromJson(jsonPath: string): Tree {
        const raw = fs.readFileSync(jsonPath, { encoding: 'utf8' });
        const json = JSON.parse(raw);

        let tree = new Tree();

        const mountPath: string = (undefined !== json.options.mount) ? json.options.mount : '';

        tree.addDir(mountPath, true);

        for (let node of json.fs) {
            if ('dir' === node.type) {
                tree.addDir(mountPath + '/' + node.path);
            }
            else if ('file' === node.type) {
                let content = (undefined !== node.content) ? node.content : '';
                tree.addFile(mountPath + '/' + node.path, content, true);
            }
        }

        return tree;

    }

    public toJson(jsonPath: string, tree: Tree) {

        var entries: any = [];

        for (let leaf of tree.getLeafs()) {

            var entry: any = {};
            entry.type = (leaf.isDirectory()) ? 'dir' : 'file';
            entry.path = tree.getPathByInodeNumber(leaf.getInodeNumber());

            if(true === leaf.isFile()){
                entry.content = leaf.getContent();
            }

            entry.permission = leaf.getPermission().getMode();

            entries.push(entry);
        }

        let json:any = {
            options:{
                'mount':'/'
            },
            fs:entries
        };

        fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4), {encoding:'utf-8'});

        //getPathByInodeNumber

    }

}

