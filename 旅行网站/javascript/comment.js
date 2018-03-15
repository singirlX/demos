// JavaScript Document
window.onload=function()
{
	var submitComment=document.getElementById("submitComment");
	submitComment.onclick=function(){addComment();};
	
	var haha=document.getElementsByClassName("chooseBox");
	for(i=0;i<haha.length;i++)
	{
		haha[i].onclick=function(){headIconChoose(this);}
	}
	
	var closeWarning=document.getElementById("closeWarning");
	closeWarning.onclick=function(){hideWarning()};
}

function hideWarning()
{
	var warningBox=document.getElementById("includeWarning");
	warningBox.style.zIndex=-2;
	warningBox.style.opacity=0;
}

function addComment()
{
	var writeComment=document.getElementById("inputComment");
	var commentNum=Number(writeComment.value.length);
	var warningBox=document.getElementById("includeWarning");
	var warningWord=document.getElementById("warningWord");
	if(commentNum<=0)
	{
		warningWord.innerHTML="输入内容不能为空，请重新输入";
		warningBox.style.zIndex=1;
		warningBox.style.opacity=1;
		return true;
	}
	
	if(commentNum>200)
	{
		warningWord.innerHTML="输入内容不能超出200字，请重新输入";
		warningBox.style.zIndex=1;
		warningBox.style.opacity=1;
		writeComment.value="";
		return true;
	}
	var allBox=document.getElementById("commentBox");
	var includeComment=allBox.appendChild(document.createElement("div"));
	includeComment.className="includeComment";
	
	var headIcon=includeComment.appendChild(document.createElement("div"));
	headIcon.className="headIcon";
	
	var personIcon=headIcon.appendChild(document.createElement("img"));
	personIcon.src="images/headIcon.png";/************头像变化在下面******************************************************/
	
	var includecommentWord=includeComment.appendChild(document.createElement("div"));
	includecommentWord.className="includecommentWord";
	
	var floorAndPersonNum=document.getElementsByClassName("includeComment").length;
	var person=includecommentWord.appendChild(document.createElement("span"));
	person.className="person";
	person.innerHTML="匿名用户"+floorAndPersonNum;
	
	var nowTime=new Date();
	var commentTime=includecommentWord.appendChild(document.createElement("span"));
	commentTime.className="commentTime";
	var nowMouth=nowTime.getMonth()+1;
	commentTime.innerHTML="&nbsp;发表于："+nowTime.getFullYear()+"年"+nowMouth+"月"+nowTime.getDate()+"日"+"&nbsp;"+nowTime.getHours()+":"+nowTime.getMinutes()+":"+nowTime.getSeconds();
	
	var commentNum=includecommentWord.appendChild(document.createElement("span"));
	commentNum.className="commentNum";
	commentNum.innerHTML=floorAndPersonNum+"楼";
	
	var commentWord=includecommentWord.appendChild(document.createElement("p"));
	commentWord.className="commentWord";
	commentWord.innerHTML=writeComment.value;
	writeComment.value="";

/*******头像变化****************************************************************************************/
	var getIndex=document.getElementById("getIndex");
	var iconHeight=-getIndex.className*80;
	personIcon.style.top=iconHeight+"px";
/*******头像变化****************************************************************************************/


/*******头像边框恢复****************************************************************************************/	
	var o=document.getElementsByClassName("chooseBox");
	o[getIndex.className].style.border="none";
	o[getIndex.className].style.width="60px";
	o[getIndex.className].style.height="60px";
/*******头像边框恢复****************************************************************************************/
}

function headIconChoose(obj)
{
	 var o = document.getElementsByClassName("chooseBox");
     for(var i=0;i<o.length;i++)
	 {
		 if(o[i] == obj)
		 {
			 obj.value = i; 
		 }
	 }
 
  
	for(var i=0;i<o.length;i++)
	{
		o[i].style.border="none";
		o[i].style.width="60px";
		o[i].style.height="60px";
	}
	obj.style.border="3px rgb(164,199,205) solid";
	obj.style.width="55px";
	obj.style.height="56px";
    
	var getIndex=document.getElementById("getIndex");
	getIndex.className=obj.value;
}