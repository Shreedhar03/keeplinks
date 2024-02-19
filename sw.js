
chrome.action.onClicked.addListener(tab=>{
    if (tab.url?.startsWith("chrome://")) return undefined;
    chrome.scripting.executeScript({
        target:{tabId:tab.id},
        func:()=>{
            alert("Hello from tab")
        }
    })
})