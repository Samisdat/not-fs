export default class Options {

    private user: number;
    private group: number;

    private statsDev: number;
    private statsRdev: number;
    private statsUid: number;
    private statsGid: number;
    private statsBlksize: number;

    constructor() {
        this.setDefaultOptions();
    }

    private setDefaultOptions(): void {

        let userId: number = 85;
        try {
            userId = process.getuid();
        }
        catch (e) {

        }

        let groupId: number = 100;
        try {
            groupId = process.getuid();
        }
        catch (e) {

        }

        this.setUser(userId);
        this.setGroup(groupId);

        this.setStatsDev(51);
        this.setStatsRdev(0);
        this.setStatsUid(userId);
        this.setStatsGid(groupId);
        this.setStatsBlksize(4096);

    }

    public getUser(): number {

        return this.user;

    }

    public setUser(user: number): void {

        this.user = user;

    }

    public getGroup(): number {

        return this.group;

    }

    public setGroup(group: number): void {

        this.group = group;

    }

    public getStatsDev(): number {

        return this.statsDev;

    }

    public setStatsDev(statsDev: number): void {

        this.statsDev = statsDev;

    }

    public getStatsRdev(): number {

        return this.statsRdev;

    }

    public setStatsRdev(statsRdev: number): void {

        this.statsRdev = statsRdev;

    }

    public getStatsUid(): number {

        return this.statsUid;

    }

    public setStatsUid(statsUid: number): void {
        this.statsUid = statsUid;
    }

    public getStatsGid(): number {

        return this.statsGid;

    }

    public setStatsGid(statsGid: number): void {

        this.statsGid = statsGid;

    }

    public getStatsBlksize(): number {

        return this.statsBlksize;

    }

    public setStatsBlksize(statsBlksize: number): void {

        this.statsBlksize = statsBlksize;

    }

}