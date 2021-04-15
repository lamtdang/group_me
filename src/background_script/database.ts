import Dexie from "dexie"

export interface IUrlPattern {
    pattern: string;
    group: string;
}

export interface GroupMeRepository {
    patterns(): Promise<IUrlPattern[]>
}

export class GroupMeDB extends Dexie implements GroupMeRepository {
    private _patterns: Dexie.Table<IUrlPattern, number>;

    constructor() {
        super("GroupMeDatabase")

        this.version(1).stores({
            patterns: 'pattern, group'
        })

        this._patterns = this.table("patterns")
        this._patterns.put({pattern: "stackoverflow.com", group: "StackOverFlow"});
        this._patterns.put({pattern: "developer.chrome.com", group: "Chrome API"});
        this._patterns.put({pattern: "github.com", group: "Github"});
    }

    patterns(): Promise<IUrlPattern[]> {
        return this._patterns.toArray()
    }

    // Load config and transform settings to Map once while calling at first time.
    async patternsMap(): Promise<Map<string, IUrlPattern>> {
        let settingsMap: Map<string, IUrlPattern> = new Map();
        let settingsLoaded = false;
        return await (async () => {
          if (settingsLoaded) {
            return settingsMap;
          }
        
          let settings = await this.patterns();
        
          settingsMap = new Map(
            settings.map(s => [s.pattern, s])
          );
          settingsLoaded = true;
        
          return settingsMap;
        })();
    }
}

export const database = new GroupMeDB()