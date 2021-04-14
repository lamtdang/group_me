import Dexie from "dexie"

export interface IUrlPattern {
    pattern: string;
    group: string;
}


export class GroupMeDB extends Dexie {
    patterns: Dexie.Table<IUrlPattern, number>;

    constructor() {
        super("GroupMeDatabase")
        var db = this

        db.version(1).stores({
            patterns: 'pattern, group'
        })

        this.patterns = this.table("patterns")
        db.table("pattern").put({pattern: "stackoverflow.com", group: "StackOverFlow"})
        db.table("pattern").put({pattern: "developer.chrome.com", group: "Chrome API"})
        db.table("pattern").put({pattern: "github.com", group: "Github"})
    }
}

export var db = new GroupMeDB()