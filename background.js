function GetNumberOfOffers(urlString, tabId) {
    var ajaxArgument = new AjaxArgument("currentChromeUrl", urlString);
    var ajaxArgumentsArray = [ajaxArgument];
    var successArguments = { tabId: tabId, tabUrl: urlString };
    var ajaxResponse = makeCorsGetRequest('http://affilatewebapplication20160826094454.azurewebsites.net/Affilate/Index', ajaxArgumentsArray, onGetNumberOfOffersSuccess, successArguments);
}



function onGetNumberOfOffersSuccess(ajaxResponse, successArguments) {
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
	
	chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        GetNumberOfOffers(sender.tab.url, sender.tab.id);
    }
);
	
} else {
    // jQuery not loaded
	
	
}