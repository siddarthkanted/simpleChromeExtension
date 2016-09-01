function getCurrentTabUrl(callback) {  
  var queryInfo = {
    active: true, 
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0]; 
    var url = tab.url;
    callback(url);
  });
}

function sendMessageToContent(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    console.log(tab.url, tab.title);
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {from: "popup"}, function(msg) {
			displayItemArrayFromAjaxResponse(msg.ajaxResponse);
            //msg = msg || {};
            //console.log('onResponse', msg.farewell);
        });
    });
});

}

function displayOffers(urlString) {
    var ajaxArgument = new AjaxArgument("currentChromeUrl", urlString);
    var ajaxArgumentsArray = [ajaxArgument];
    var ajaxResponse = makeCorsGetRequest('http://affilatewebapplication20160826094454.azurewebsites.net/Affilate/Index', ajaxArgumentsArray, onOffersObtained, null);
}

function onOffersObtained(ajaxResponse, successArguments) {
	displayItemArrayFromAjaxResponse(ajaxResponse);
    /*if (ajaxResponse.getStatusBool() == false)
        return;
    else {
        var jsonData = JSON.parse(ajaxResponse.getResponseContent());
        return displayItemArray(jsonData.UrlsOfOfferSite);
    }*/
}

document.addEventListener('DOMContentLoaded', function() {
  defaultOffersDisplay();
  sendMessageToContent();
  /*getCurrentTabUrl(function(url) {
      displayOffers(url);
  });*/
});

