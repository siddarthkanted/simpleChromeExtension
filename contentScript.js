if (!chrome.runtime) {
    // Chrome 20-21
    chrome.runtime = chrome.extension;
} else if(!chrome.runtime.onMessage) {
    // Chrome 22-25
    chrome.runtime.onMessage = chrome.extension.onMessage;
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
    chrome.runtime.onConnect = chrome.extension.onConnect;
    chrome.runtime.connect = chrome.extension.connect;
}

chrome.runtime.sendMessage(document.documentElement.innerHTML);

window.onload = function() {
    chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
        console.log('onMessage', msg);
        if (msg.greeting == "hello") {
            sendResponse({farewell: document.documentElement.innerHTML});
        } else{
           sendResponse({});
        }
    });
};