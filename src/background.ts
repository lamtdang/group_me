// This file is ran as a background script

console.log("Hello from background script!");
const map = new Map();
map.set("stackoverflow.com", "StackOverFlow");
map.set("developer.chrome.com", "Chrome API");
map.set("github.com", "GitHub");

chrome.tabs.onUpdated.addListener(function (tabId, props) {
  console.log("tabs updated");

  console.log({props})

  if (! props.url) {
      return;
  }
  
  const host = new URL(props.url).hostname
//   const host = extractDomain(props.url);
  console.log({host})
  if (map.has(host)) {
    console.log(props.url);
    groupGitLab(tabId, map.get(host));
  }
});

function groupGitLab(tabId: number, groupTitle: string) {
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

function extractDomain(url: string | undefined) {
  if (typeof url !== 'undefined') {
    const domain = url.replace("https?://", "").split(/[/?#]/);
    return domain[0]
  } else {
    return  "sad"
  }
}
