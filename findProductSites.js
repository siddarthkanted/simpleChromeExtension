function renderURL(statusText) {
	//document.getElementById('currentChromeUrl').textContent = statusText;
    makeCorsRequest(statusText);			
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