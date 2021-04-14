
interface GroupCreateRequest {
    tabId: number
    title: string
}

class Group
{
    static async first(query: chrome.tabGroups.QueryInfo): Promise<chrome.tabGroups.TabGroup> {
        return new Promise((fulfill) => {
            chrome.tabGroups.query(query, (records) => {
                fulfill(records[0] || null)
            })
        })
    }
    static async create(attr: GroupCreateRequest): Promise<chrome.tabGroups.TabGroup> {
        return new Promise((fulfill) => {
            chrome.tabs.group({ tabIds: attr.tabId }, (groupId: number) => {
                chrome.tabGroups.update(groupId, { title: attr.title }, fulfill);
              });  
        })
    }
}

export default Group
