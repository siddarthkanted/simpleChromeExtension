function displayItemArray(jsonArray){
	var ul = document.getElementById("offers_partner_items_ul");
	if(jsonArray.length > 0){
		$("#offers_partner_items_ul").empty();
	}
	for (var i = 0; i < jsonArray.length; i++) {
		var li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = jsonArray[i];
		li.addEventListener('click', listItemClicked, false);
	}
}

function displayItemArrayFromAjaxResponse(ajaxResponse){
 if (ajaxResponse.statusBool == false)
        return;
    else {
        var jsonData = JSON.parse(ajaxResponse.responseContent);
        return displayItemArray(jsonData.UrlsOfOfferSite);
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