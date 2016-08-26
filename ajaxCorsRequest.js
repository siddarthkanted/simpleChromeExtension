function makeCorsGetRequest(urlString, ajaxArguments, onSuccessCallbackFunction, successArguments) {

  var completeUrl = concateUrlAndParams(urlString, ajaxArguments);

  var xhr = createCORSRequest('GET', completeUrl);
  if (!xhr) {
      var ajaxResponse = new AjaxResponse(false, 'CORS not supported', null);
      return ajaxResponse;
  }

  // Response handlers.
  xhr.onload = function() {
      var text = xhr.responseText;
      var ajaxResponse = new AjaxResponse(true, 'CORS succeeded', text);
      return onSuccessCallbackFunction(ajaxResponse, successArguments);
  };

  xhr.onerror = function () {
      var ajaxResponse = new AjaxResponse(false, 'Woops, there was an error making the request.', null);
      return ajaxResponse;
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

//should be done only for Get request
function concateUrlAndParams(urlString, ajaxArguments){
    if(ajaxArguments.length == 0)
        return urlString;
    var completeUrl = urlString + "?";
    for (var i = 0; i < ajaxArguments-1; i++) {
        completeUrl += ajaxArguments[i].getParameterName() + "=" + ajaxArguments[i].getParameterValue() + "&";
    }
    completeUrl += ajaxArguments[i].getParameterName() + "=" + ajaxArguments[i].getParameterValue();
    return completeUrl;
}