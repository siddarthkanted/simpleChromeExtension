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

function getCurrentTabDom(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    console.log(tab.url, tab.title);
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(msg) {
            msg = msg || {};
            console.log('onResponse', msg.farewell);
        });
    });
});

}


function displayItemArray(jsonArray){
	var ul = document.getElementById("items");
	if(jsonArray.length > 0){
		$("#items").empty();
	}
	for (var i = 0; i < jsonArray.length; i++) {
		var li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = jsonArray[i];
		li.addEventListener('click', listItemClicked, false);
	}
}

function listItemClicked(){
	var a = getHtmlElementFromString(this.innerHTML, 'a')[0];
	var href = a.href
	chrome.tabs.create({url: href});
}

function getHtmlElementFromString(innerHTML, htmlElementName){
	var el = document.createElement( 'html' );
	el.innerHTML = innerHTML;
	return el.getElementsByTagName( htmlElementName );
}



function displayOffers(urlString) {
	getCurrentTabDom();
    var ajaxArgument = new AjaxArgument("currentChromeUrl", urlString);
    var ajaxArgumentsArray = [ajaxArgument];
    var ajaxResponse = makeCorsGetRequest('http://affilatewebapplication20160826094454.azurewebsites.net/Affilate/Index', ajaxArgumentsArray, onOffersObtained, null);
}

function onOffersObtained(ajaxResponse, successArguments) {
    if (ajaxResponse.getStatusBool() == false)
        return;
    else {
        var jsonData = JSON.parse(ajaxResponse.getResponseContent());
        return displayItemArray(jsonData.UrlsOfOfferSite);
    }
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
      displayOffers(url);
  });
});

