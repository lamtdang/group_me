// This file is ran as a background script
import { TabGroup } from 'chrome';


console.log("Hello from background script!")
chrome.tabs.onUpdated.addListener(function(tabId, props){
    
})


function isExistingGroup() {
    var isExistedGitlab
    const queryInfo = {
        title: "Gitlab"
    }
    chrome.tabGroups.query(queryInfo, function(groups) {
        isExistedGitlab = groups[0]
    })

    return isExistedGitlab as TabGroup
}

function groupGitlab(tabId: number) {
    if (isExistingGroup() {

    }
}