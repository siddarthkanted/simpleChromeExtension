function GetNumberOfOffers(urlString, tabId, sendMessageToContentFunction) {
    var ajaxArgument = new AjaxArgument("currentChromeUrl", urlString);
    var ajaxArgumentsArray = [ajaxArgument];
    var successArguments = { tabId: tabId, tabUrl: urlString, sendMessageToContentFunction: sendMessageToContentFunction};
    var ajaxResponse = makeCorsGetRequest('http://affilatewebapplication20161020112956.azurewebsites.net/Affilate/Index', ajaxArgumentsArray, onGetNumberOfOffersSuccess, successArguments);
	return ajaxResponse;
}

function sendMessageToContent(tabId, msg){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabId, msg, function(response) {});  
	});
}

function onGetNumberOfOffersSuccess(ajaxResponse, successArguments) {
	successArguments.sendMessageToContentFunction(successArguments.tabId, {msg: ajaxResponse, "from":"background"});
    if (ajaxResponse.getStatusBool() == false)
        return;
    else {
        var jsonData = JSON.parse(ajaxResponse.getResponseContent());
        chrome.browserAction.setBadgeText(
              {
                  tabId: successArguments.tabId,
                  text: jsonData.NumberOfOffers.toString()
              });
        chrome.browserAction.setBadgeBackgroundColor(
                {
                    tabId: successArguments.tabId,
                    color: "#646464"
                });
    }
}

function receiveMessages(){
		chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
		 if (request.from == "content") {
            GetNumberOfOffers(sender.tab.url, sender.tab.id, sendMessageToContent);
        } 
    }
);
}


if (jQuery) {
    // jQuery loaded
	
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
	receiveMessages();
		
} else {
    // jQuery not loaded
	
	
}