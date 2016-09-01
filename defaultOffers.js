var offers = [

{
	partnerName:"Amazon",
	partnerImage:"https://affilateimage.file.core.windows.net/image/amzLogo_70x70.png?sv=2015-04-05&ss=f&srt=sco&sp=rc&se=2017-08-24T23:20:07Z&st=2016-08-27T15:20:07Z&spr=https,http&sig=vWUGrL9fdCgyigkbgCCtK9aNIYEMAtamGqnSiP3Kn8U%3D",
	partnerDescription:"Awesome Money Saving Deals",
	partnerClickLink:"http://www.amazon.in/gp/goldbox/all-deals/?ie=UTF8&camp=3626&creative=24790&linkCode=ur2&tag=httpssiddarth-21",
	partnerPrice:""
},

{
	partnerName:"Flipkart",
	partnerImage:"https://affilateimage.file.core.windows.net/image/flipkartLogo_70x70.jpg?sv=2015-04-05&ss=f&srt=sco&sp=rc&se=2017-08-24T23:20:07Z&st=2016-08-27T15:20:07Z&spr=https,http&sig=vWUGrL9fdCgyigkbgCCtK9aNIYEMAtamGqnSiP3Kn8U%3D",
	partnerDescription:"Fabulous Money Saving Deals",
	partnerClickLink:"http://dl.flipkart.com/dl/offers?affid=siddarthk",
	partnerPrice:""
},

{
	partnerName:"Snapdeal",
	partnerImage:"https://affilateimage.file.core.windows.net/image/snapdealLogo_70x70.png?sv=2015-04-05&ss=f&srt=sco&sp=rc&se=2017-08-24T23:20:07Z&st=2016-08-27T15:20:07Z&spr=https,http&sig=vWUGrL9fdCgyigkbgCCtK9aNIYEMAtamGqnSiP3Kn8U%3D",
	partnerDescription:"Stupendous Money Saving Deals",
	partnerClickLink:"http://www.snapdeal.com/offers/deal-of-the-day?utm_source=aff_prog&utm_campaign=afts&offer_id=17&aff_id=77922",
	partnerPrice:""
},



];


function defaultOffersDisplay(){
	var array = [];
	for (var i = 0; i < offers.length; i++) {
		var li = createHtml(offers[i].partnerName, offers[i].partnerImage, offers[i].partnerDescription, offers[i].partnerClickLink, offers[i].partnerPrice);
        array.push(li.outerHTML);
	}
	displayItemArray(array);
}

function createHtml(partnerName, partnerImage, partnerDescription, partnerClickLink, partnerPrice){
var a = document.createElement('a');
a.href=partnerClickLink;
a.style="text-decoration: none !important;";

var fullDiv = document.createElement('div');
fullDiv.className  = "itemborder";

var p = document.createElement('p');
p.innerText = partnerName;

var rowDiv = document.createElement('div');
rowDiv.className  = "row";

var imgthumbnailDiv = document.createElement('div');
imgthumbnailDiv.className = "imgthumbnail";
imgthumbnailDiv.style = "display:inline-block;vertical-align:top";

var img = document.createElement('img');
img.src = partnerImage;
img.style="max-width: 70px;max-height: 70px;";
imgthumbnailDiv.appendChild(img);

var blockDiv = document.createElement('div');
blockDiv.style = "display:inline-block;";

var descriptionDiv = document.createElement('div');
descriptionDiv.innerText = partnerDescription;


var priceDiv = document.createElement('div');

var b = document.createElement('b');
b.innerText = partnerPrice;
b.style="color:#006700";
priceDiv.appendChild(b);

blockDiv.appendChild(descriptionDiv);
blockDiv.appendChild(priceDiv);
rowDiv.appendChild(imgthumbnailDiv);
rowDiv.appendChild(blockDiv);
fullDiv.appendChild(p);
fullDiv.appendChild(rowDiv);
a.appendChild(fullDiv);

return a;
}
