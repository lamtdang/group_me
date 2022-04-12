// This file is ran as a background script

import Group from "./group"

console.log("Hello from background script!");
var map = new Map();
// map.set("www.youtube.com", "test")

chrome.storage.local.get('groupme', (result) => {
  console.log('console', new Map(JSON.parse(result.groupme)))
  map = new Map(JSON.parse(result.groupme))
}
)

chrome.storage.onChanged.addListener(function (changes, namespace) {
  chrome.storage.local.get('groupme', (result) => {
    console.log('console', new Map(JSON.parse(result.groupme)))
    map = new Map(JSON.parse(result.groupme))
  })
  console.log(map)
});

chrome.tabs.onUpdated.addListener(function (tabId, props) {
  if (! props.url) {
      return;
  }
  
  var host = new URL(props.url).hostname
  if (host.includes('www.')){
    host = host.substring(4)
  }
  console.log('host', host)
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


