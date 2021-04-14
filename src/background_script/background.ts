// This file is ran as a background script

import Group from "./group"

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

async function groupTabs(tabId: number, groupTitle: string) {
  const queryInfo = {
    title: groupTitle
  };

  let group = await Group.first(queryInfo)

  if (! group) {
    group = await Group.create({tabId, title: groupTitle})
  } else {
    chrome.tabs.group({tabIds: tabId, groupId: group.id})
  }


}


