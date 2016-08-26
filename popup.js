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

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function displayItemArray(jsonArray){
	var jsonData = JSON.parse(jsonArray);
	var ul = document.getElementById("items");
	
	for (var i = 0; i < jsonData.length; i++) {
		var li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML=jsonData[i]; 
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

function makeCorsRequest(statusText) {
  // This is a sample server that supports CORS.
  var url = 'http://affilatewebapplication20160826094454.azurewebsites.net/Affilate/Index?currentChromeUrl='+statusText;

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    $('#responseString').text('CORS not supported');

  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    //$('#responseString').text('Response from CORS request to ' + url + ': ' + text);
	displayItemArray(text);
  };

  xhr.onerror = function() {
    $('#responseString').text('Woops, there was an error making the request.');
  };

  xhr.send();
  }

function renderURL(statusText) {
	//document.getElementById('currentChromeUrl').textContent = statusText;
    makeCorsRequest(statusText);			
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    renderURL(url); 
  });
});

