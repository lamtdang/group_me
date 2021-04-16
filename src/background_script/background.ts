// This file is ran as a background script

import Group from "./group";
import { database } from "./database";

console.log("Hello from background script!");

chrome.tabs.onUpdated.addListener(async function (tabId, props) {

  if (! props.url) {
    return;
  }

  let settingsMap = await database.patternsMap();
  const host = new URL(props.url).hostname;

  if (settingsMap.has(host)) {
    groupTabs(tabId, settingsMap.get(host)!.group);
  }
});

async function groupTabs(tabId: number, title: string) {
  const queryInfo = {
    title,
  };

  let group = await Group.first(queryInfo);

  if (!group) {
    group = await Group.create({ tabId, title });
  } else {
    chrome.tabs.group({ tabIds: tabId, groupId: group.id });
  }
}
