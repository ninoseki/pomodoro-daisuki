var theTab = undefined;

function changedHandler(tab) {
    var extension_url = chrome.extension.getURL('');
    if (tab.url.indexOf(extension_url) > -1) {
        if (theTab) {
            if (tab.id !== theTab.id) {
                console.log("duplicated!");
                chrome.tabs.remove(tab.id);
                focus_to_the_tab();
            }
        } else {
            console.log("created");
            theTab = tab
        }
    } else {
        if (theTab && tab.id == theTab.id) {
            removeHandler(tab.id)
        }
    }
}

function removeHandler(tabId) {
    if (theTab && tabId === theTab.id) {
        console.log("closed");
        theTab = undefined;
    }
}

function focus_to_the_tab() {
    if (theTab) {
        chrome.tabs.update(theTab.id, {selected:true});
    }
}

chrome.tabs.onCreated.addListener(function(tab) {
    changedHandler(tab)
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    changedHandler(tab);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    removeHandler(tabId);
});