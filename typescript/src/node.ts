import Options from './options';
import Permission from './permission';

export default abstract class Node {

    protected options:Options;

    private inodeNumber: number;
    private pathPart: string;

    protected permission: Permission;

    constructor(inodeNumber: number, pathPart: string, options:Options) {

        this.inodeNumber = inodeNumber;

        this.validatePath(pathPart);

        this.pathPart = pathPart;

        this.options = options;

        this.permission = new Permission(options.permissions.dir);

    }

    protected validatePath(pathPart: string): void {

        if (true === /[\/|\\]+/.test(pathPart)) {
            throw new Error('pathPart may not contain path seperator');
        }

    }

    public getInodeNumber(): number {

        return this.inodeNumber;

    }

    public getPathPart(): string {

        return this.pathPart;

    }

    public getOptions(): Options {

        return this.options;

    }

    public setPathPart(pathPart: string): void {

        this.validatePath(pathPart);

        this.pathPart = pathPart;

    }

    public abstract getContent(): string;

    public getPermission(): Permission {

        return this.permission;

    }

    public setPermission = function (permission: string) {

        this.permission.setMode(permission);

    };

    public abstract isRoot(): boolean;

    public abstract isFile(): boolean;

    public abstract isDirectory(): boolean;

}

