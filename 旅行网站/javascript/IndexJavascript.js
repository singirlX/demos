// JavaScript Document
window.onload=function()
{
	var bannerButton=document.getElementsByClassName("bannerButton");
	var bannerPic=document.getElementsByClassName("bannerLink");
	bannerPic[0].style.opacity=1;
	for(var i=0;i<bannerButton.length;i++)
	{
		bannerButton[i].onclick=function()
		{
			changeBannerOpacity(this,0);
		}

	}
	/*banner轮播图部分JS*/
	var bestPlaceLink=document.getElementsByClassName("bestPlace")
    for(var i=0;i<bestPlaceLink.length;i++)
	{
		bestPlaceLink[i].onmouseover=function()
		{
			bestPlaceWordMove(this,-150);
		}
		bestPlaceLink[i].onmouseout=function()
		{
			bestPlaceWordMove(this,0);
		}
	};
	/*bestPlace 4张图片JS*/
	
    setZIndex("vedioPlacePicOne");
	setZIndex("vedioPlacePicTwo");
	setOpacityOne();
	setOpacityTwo();
	/*纪录片2张图片JS*/
	
	setPlacePicOpacity("nowPlacePicLink");
	setPlacePicOpacity("titlePlacePicLink");
	setPlacePicOpacity("chinaPlacePicLink");
	createPlaceActive("nowPlaceLink","nowPlacePicLink");
	createPlaceActive("titlePlaceLink","titlePlacePicLink");
	createPlaceActive("chinaPlaceLink","chinaPlacePicLink");
	/*当季游部分JS*/
	
	var changeClothes=document.getElementById("changeClothes");
	changeClothes.onclick=function(){changeStyle();}
}

function changeStyle()
{
	var nowStyle=document.getElementById("changeStyle");
	nowStyle.href="css/change.css";
}


var opacityTimer=null;
function changeBannerOpacity(obj,opacityNum)
{
	clearInterval(obj.opacityTimer);
    var bannerPic=document.getElementsByClassName("bannerLink");
	var bannerWord=document.getElementsByClassName("bannerWord");
	for(var i=0;i<bannerWord.length;i++)
	{
		bannerWord[i].style.opacity=0;
	}
	bannerWord[obj.innerHTML-1].style.opacity=1;
	if(bannerPic[obj.innerHTML-1].style.opacity==1)
	{
		return true;
	}
	obj.opacityTimer=setInterval(function()
	{
		opacityNum=opacityNum+10;
	    bannerPic[obj.innerHTML-1].style.opacity=(opacityNum)/100;
		if(opacityNum>=100)
		{
			clearInterval(obj.opacityTimer);
			for(var i=0;i<bannerPic.length;i++)
			{
				bannerPic[i].style.opacity=0;
				bannerPic[i].style.zIndex=0;
			}
			bannerPic[obj.innerHTML-1].style.opacity=1;
			bannerPic[obj.innerHTML-1].style.zIndex=-1;
				}
			},
	100);
}
/*banner轮播图的内容*/
function bestPlaceWordMove(obj,add)
{
	var bestPlaceWord=document.getElementsByClassName("bestPlaceExplain");
	bestPlaceWord[obj.title-1].style.top=add+"px";
}
/*bestPlace 4张图片JS*/

function setZIndex(vedioPlacePicNum)
{
	var vedioPlaceOne=document.getElementsByClassName(vedioPlacePicNum);
	for(var i=0;i<vedioPlaceOne.length;i++)
	{
		vedioPlaceOne[i].style.zIndex=-i;
		vedioPlaceOne[i].style.opacity=1;
	}
}/*纪录片2张图片JS~此函数设置两组纪录片图片的层叠顺序*/

var timerOne=null;
var timerrOne=null;
function setOpacityOne()
{
	var vedioPlaceOne=document.getElementsByClassName("vedioPlacePicOne");
	var i=0;
	clearInterval(timerOne)
	if(i<4)
	{
		timerOne=setInterval(function()
		{
	        vedioPlaceOne[i].style.opacity=Math.floor((vedioPlaceOne[i].style.opacity*100-1))/100;
            if(vedioPlaceOne[i].style.opacity<=0)
	        {
				vedioPlaceOne[i].style.opacity=0
			    i=i+1;
			    return true;
		    }
			if(i==3)
			{
				vedioPlaceOne[i].style.opacity=1;
				clearInterval(timerOne);
				i=0;
		        timerrOne=setInterval(function()
				{
					vedioPlaceOne[i].style.opacity=Math.ceil((vedioPlaceOne[i].style.opacity*100+1))/100;
		            if(vedioPlaceOne[i].style.opacity>=1)
	                {
				        vedioPlaceOne[i].style.opac=1;
			            for(i=0;i<vedioPlaceOne.length;i++)
					    {
						    vedioPlaceOne[i].style.opacity=1;
					    }
					clearInterval(timerrOne);
					return true;
		            }	
				},30);
			}
		},30);
	}	
	
}
setInterval("setOpacityOne()",15000);
var timerTwo=null;
var timerrTwo=null;
function setOpacityTwo()
{
	var vedioPlaceOne=document.getElementsByClassName("vedioPlacePicTwo");
	var i=0;
	clearInterval(timerTwo)
	if(i<4)
	{
		timerTwo=setInterval(function()
		{
	        vedioPlaceOne[i].style.opacity=Math.floor((vedioPlaceOne[i].style.opacity*100-1))/100;
            if(vedioPlaceOne[i].style.opacity<=0)
	        {
				vedioPlaceOne[i].style.opacity=0
			    i=i+1;
			    return true;
		    }
			if(i==3)
			{
				vedioPlaceOne[i].style.opacity=1;
				clearInterval(timerTwo);
				i=0;
		        timerrTwo=setInterval(function()
				{
					vedioPlaceOne[i].style.opacity=Math.ceil((vedioPlaceOne[i].style.opacity*100+1))/100;
		            if(vedioPlaceOne[i].style.opacity>=1)
	                {
				        vedioPlaceOne[i].style.opac=1;
			            for(i=0;i<vedioPlaceOne.length;i++)
					    {
						    vedioPlaceOne[i].style.opacity=1;
					    }
					clearInterval(timerrTwo);
					return true;
		            }	
				},30);
			}
		},30);
	}	
	
}
setInterval("setOpacityTwo()",15000);
/*此函数设置两组纪录片图片的自动循环*/
/*纪录片2张图片JS~此函数设置两组纪录片图片的自动循环放映*/

function createPlaceActive(placeLink,placePic)
{
	placeLink=document.getElementsByClassName(placeLink);
	placePic=document.getElementsByClassName(placePic);
	for(var i=0;i<placeLink.length;i++)
	{
		placeLink[i].onmouseover=function(){placeLinkOnmouse(this,"rgba(65,98,124,0.15)","images/PlaceIconAfter.gif",1,10);}
		placeLink[i].onmouseout=function(){placeLinkOnmouse(this,"rgba(65,98,124,0)","images/PlaceIconBefore.gif",0,-10);}
	}
	var placeTimer=null
	function placeLinkOnmouse(obj,liBgColor,placeLinkIcon,picOpacity,picOpacitySpeed)
	{
		placeLink[obj.title-1].firstChild.style.backgroundColor=liBgColor;/*设置鼠标滑过文字部分的背景色*/
		placeLink[obj.title-1].firstChild.firstChild.src=placeLinkIcon;/*设置鼠标滑过文字前面图片的旋转*/
		clearInterval(obj.placeTimer)
		obj.placeTimer=setInterval(function()
		{
			if(picOpacitySpeed>0&&placePic[obj.title-1].style.opacity>=1||picOpacitySpeed<0&&placePic[obj.title-1].style.opacity<=0||obj.title-1==0)
			{
				clearInterval(obj.placeTimer)
			}
			else
			{
			placePic[obj.title-1].style.opacity=(placePic[obj.title-1].style.opacity*100+picOpacitySpeed)/100;
			}
		},50);
		placePic[0].style.opacity=1;
	}
}

function setPlacePicOpacity(opacityPlacePic)
{
	opacityPlacePic=document.getElementsByClassName(opacityPlacePic);
	for(var i=0;i<opacityPlacePic.length;i++)
	{
		opacityPlacePic[i].style.opacity=0;
	}
	opacityPlacePic[0].style.opacity=1;
}

/*当季游JS~此函数设置PlaceLink的Onmouseover和Onmouseout动作*/