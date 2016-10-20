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

var ajaxResponse="";

window.onload = function() {
	//createIcon();
	sendMessageToBackground();
	ReceiveMessages();
	buttonClicks();
};


function createIcon(){
var iconDiv = document.createElement('div');
iconDiv.id = "iconDiv";
iconDiv.title = "Drag To Move Position";
iconDiv.style = "visibility: visible; position: fixed; height: 70px; width: 70px; cursor: pointer; top: 340px; left: -35px; right: -50px; z-index: 9999;";

var iconImg = document.createElement('img');
iconImg.src=chrome.extension.getURL("icon_75x75.png");

iconDiv.appendChild(iconImg);

document.body.insertBefore(boxDivCreate(), document.body.firstChild);
document.body.insertBefore(iconDiv, document.body.firstChild);

defaultOffersDisplay();

}

function headerButtons(){

var headerButtonsDiv = document.createElement('div');
headerButtonsDiv.id = "headerButtonsDiv";
headerButtonsDiv.style="display: block !important; padding: 7px 7px 7px 20px; border-bottom: 1px solid rgb(204, 204, 204);";

var hideButton = document.createElement('a');
hideButton.id = "hideButton"
hideButton.style = "display: inline-block !important; border-radius: 10px; font-family: Arial; color: rgb(250, 250, 250); font-size: 1em; padding: 3px 7px 3px 7px; text-decoration: none; background-color: rgba(146, 146, 146, 0.901961);"
hideButton.innerText = "HIDE";

headerButtonsDiv.appendChild(hideButton);

return headerButtonsDiv;

}

function boxDivCreate(){
var boxDiv = document.createElement('div');
boxDiv.id = "boxDiv";
boxDiv.style="visibility: hidden; padding: 4px; padding-left: 8px; max-width:320px; max-height: 400px; border-color: rgb(41, 33, 109); border-radius: 0px 2px 2px 0px; border-width: 1px; position: fixed; top: 200px; left: 0px; z-index: 9999; box-shadow: rgb(203, 203, 203) 0px 0px 7px 3px; overflow-y: scroll; overflow-x: hidden; background: rgb(249, 249, 249);";

var listItems = document.createElement('ul');
listItems.id = "offers_partner_items_ul";
listItems.style = "list-style: none;padding:0px;margin:0px";


boxDiv.appendChild(headerButtons());
boxDiv.appendChild(listItems);

return boxDiv;
}

function boxShow(){
document.getElementById("boxDiv").style.visibility='visible';
document.getElementById("iconDiv").style.visibility='hidden';

}

function boxHide(){
document.getElementById("boxDiv").style.visibility='hidden';
document.getElementById("iconDiv").style.visibility='visible';
}

function buttonClicks(){
$('#iconDiv').on('click',function(){
boxShow();
});
$('#iconDiv').hover(function(){
boxShow();
});
$('#hideButton').on('click',function(){
boxHide();
});
}

function updateListItems(msg){
		var jsonData = JSON.parse(msg);
        return displayItemArray(jsonData.UrlsOfOfferSite);
}

function ReceiveMessages(){
    chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
        console.log('onMessage', msg);
        if (msg.from == "background") {
			ajaxResponse = msg.msg;
            displayItemArrayFromAjaxResponse(ajaxResponse);
        }if (msg.from == "popup") {
            sendResponse({domHtml: document.documentElement.innerHTML, "from":"content", ajaxResponse:ajaxResponse});
        }
    });
}



function sendMessageToBackground(){
	chrome.runtime.sendMessage({domHtml: document.documentElement.innerHTML, "from":"content"});
}





    