'use strict';

const fs = require('fs');

import Tree from './tree';

export default class Mount {

    public fromJson(jsonPath: string): Tree {
        const raw = fs.readFileSync(jsonPath, { encoding: 'utf8' });
        const json = JSON.parse(raw);

        const mountPath: string = (undefined !== json.options.mount) ? json.options.mount : '/';

        let tree = new Tree(mountPath);

        for (let node of json.fs) {

            let permission = (undefined !== node.permission) ? node.permission : undefined;
            
            if ('dir' === node.type) {
                tree.addDir(mountPath + '/' + node.path, true, permission);
            }
            else if ('file' === node.type) {
                let content = (undefined !== node.content) ? node.content : '';

                tree.addFile(mountPath + '/' + node.path, content, true, permission);
            }
        }

        return tree;

    }

    public toJson(jsonPath: string, tree: Tree) {

        let mountPath = tree.getMountPath() + '/';

        var entries: any = [];

        for (let leaf of tree.getLeafs()) {

            var entry: any = {};
            entry.type = (leaf.isDirectory()) ? 'dir' : 'file';
            entry.path = tree.getPathByInodeNumber(leaf.getInodeNumber()).replace(mountPath, '');

            if(true === leaf.isFile()){
                entry.content = leaf.getContent();
            }

            entry.permission = leaf.getPermission().getMode();

            entries.push(entry);
        }

        let json:any = {
            options:{
                'mount':tree.getMountPath()
            },
            fs:entries
        };

        fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4), {encoding:'utf-8'});

        //getPathByInodeNumber

    }

}

