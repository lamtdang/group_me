// This file is ran as a background script

import Group from "./group";
import { db } from "./dexie";

console.log("Hello from background script!");


chrome.tabs.onUpdated.addListener(function (tabId, props) {
  db.patterns.toArray().then((dbData) => {
    let patternMap: Map<string, string> = new Map(
      dbData.map((i): [string, string] => [i.pattern, i.group])
    );

    if (!props.url) {
      return;
    }

    const host = new URL(props.url).hostname;
    if (patternMap.has(host)) {
      groupTabs(tabId, patternMap.get(host)!);
    }
  });
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
