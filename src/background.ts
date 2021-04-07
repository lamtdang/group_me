// This file is ran as a background script

console.log("Hello from background script!");
const map = new Map();
map.set("stackoverflow.com", "StackOverFlow");
map.set("developer.chrome.com", "Chrome API");
map.set("github.com", "GitHub");

chrome.tabs.onUpdated.addListener(function (tabId, props) {
  if (! props.url) {
      return;
  }
  
  const host = new URL(props.url).hostname
  if (map.has(host)) {
    groupTabs(tabId, map.get(host));
  }
});

function groupTabs(tabId: number, groupTitle: string) {
  const queryInfo = {
    title: groupTitle
  };
  chrome.tabGroups.query(queryInfo, (result) => {
    if (result.length == 0) {
      chrome.tabs.group({ tabIds: tabId }, (groupId) => {
        chrome.tabGroups.update(groupId, { title: groupTitle });
      });
    } else {
      const groupId = result[0].id;
      chrome.tabs.group({ tabIds: tabId, groupId: groupId });
    }
  });
}

