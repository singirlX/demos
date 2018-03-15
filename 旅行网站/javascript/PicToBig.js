// JavaScript Document
window.onload=function()
{
	var showBigPic=document.getElementsByClassName("shareImg");
	for(var i=0;i<showBigPic.length;i++)
	{
		showBigPic[i].onclick=function(){showBigPicFun(this)};
	}
	
	var closeBigPic=document.getElementById("closeBigPic");
	closeBigPic.onclick=function(){hideBigPic()};
}

function hideBigPic()
{
	var BigPicBox=document.getElementById("includeBigPic");
	var BigPic=document.getElementById("BigPic");
	BigPicBox.style.zIndex=-2;
	BigPicBox.style.opacity=0;
	BigPic.src="images/LvPai/BigPicIf.jpg"
}

function showBigPicFun(obj)
{
	var BigPic=document.getElementById("BigPic");
	BigPic.src=obj.src;
	var BigPicBox=document.getElementById("includeBigPic");
	BigPicBox.style.zIndex=1;
	BigPicBox.style.opacity=1;
}
