// JavaScript Document
window.onload=function(){
	document.onselectstart=function(){return false;};//禁止选中页面文本；
	function $(id_name){
		return document.getElementById(id_name);
	}
	function getTag(tag_name){
		return document.getElementsByTagName(tag_name);
	}
	var web_body=document.getElementsByTagName("body")[0];
	web_body.style.height=window.innerHeight+"px";	
	var slip_top=0,
		list_li=$("mp3_list").children;
	$("mp3_list").onmousewheel=function(){/*播放列表滚动事件*/
		slip_top+=-(event.wheelDelta/120)*45;
		var max_top=$("false_scroll").offsetHeight-$("scroll_slip").offsetHeight;
		if(slip_top>max_top){
			slip_top=max_top;
		}
		if(slip_top<0){
			slip_top=0;
		}
		$("scroll_slip").style.marginTop=slip_top+"px";
		$("scroll_slip").style.transition="margin-top 1s";
	}
	
	var musics=document.getElementById("musics"),
		start_btn=document.getElementById("play_btn"),
		next_btn=document.getElementById("aft_btn"),
		before_btn=document.getElementById("bef_btn"),
		mp3_name=["氹氹转","凉风有信","似是故人来","长恨歌","晓秋月明","牡丹亭外","Hold on There","The Rose","さよならの夏~コクリコ坂から~ - 口琴版","さよならの夏~コクリコ坂から~","初恋の顷","绀色のうねりが","恋恋风尘","바람","我俩"],
		mp3_src=[],
		mp3_img=[],
		radiu_trans=document.getElementsByClassName("radiu_trans"),
		for_radius=document.getElementsByClassName("for_radius"),
		loop_item=document.getElementsByClassName("loop_item");
		
	/***************************************************************************/	
	for(var i=0;i<mp3_name.length;i++){//添加歌曲列表
		//使用label+input的组合能够使得对表单的控制更加顺利；
		var new_sing="<input type='radio' name='sing_name' class='m_input' id='"+i+"'/><label class='m_item' for='"+i+"'>"+mp3_name[i]+"</label>"
		$("mp3_list").innerHTML+=new_sing;
		mp3_src[i]="music/"+mp3_name[i]+".mp3";
		mp3_img[i]="img/"+mp3_name[i]+".jpg";
	}
	var mp3_item=document.getElementsByClassName("m_item"),
		m_input=document.getElementsByClassName("m_input");
	m_input[0].checked="checked";//默认选择第一首；
	console.log(mp3_item[0].nextSibling);
	//以下·页面加载后设置播放列表滚动轴长度；
	visib_li=$("hide_scroll").offsetHeight/(mp3_item[0].offsetHeight*mp3_item.length);
	visib_li>1?visib_li=1:visib_li=visib_li;//防止，滚动轴长度溢出
	$("scroll_slip").style.height=$("false_scroll").offsetHeight*visib_li+"px";

	/***************************************************************************///删除歌曲；思路已定，视觉还未实现;思路：将其他功能封装，然后在删除和添加功能中调用他们；
	var del_btn=document.getElementById("del_btn");
	del_btn.onclick=function(){
		var del_index=mp3_src.indexOf(decodeURI(musics.src.split("BDNM/")[1]));
		mp3_name.splice(del_index,1);
		mp3_img.splice(del_index,1);
		mp3_src.splice(del_index,1);
		console.log(mp3_name);
	}
	/****************************************************************************/
	musics.src=mp3_src[0];//初始播放；
	musics.autoplay=true;//加载完毕即播放音乐；
	loopList(1,0);//初次加载运行后面的设置函数；调用loopList函数；
	musics.loopstyle=1;/*给musics自定义属性，定义默认循环方式为“列表播放”*/
	start_btn.onclick=function(){//添加播放操纵按钮时间函数；
		if(this.checked==true){
			musicPlay(musics);	
		}else{
			musics.pause();
		}
	}
	before_btn.onclick=function(){loopList(musics.loopstyle,-1);};
	next_btn.onclick=function(){loopList(musics.loopstyle,1);};
	
	var music_befsrc=null;
	/****************************************************************************/
	for(var i=0;i<mp3_src.length;i++){//播放列表中音乐；
			m_input[i].nums=i;//存储索引值；
			m_input[i].onchange=function(){
			//注意！！！之前给直接label标签定义onclick事件时，会报错DOMException表示该操作不可能执行，所以修改为给input添加change事件；
				music_befsrc=musics.src;
				musics.src=mp3_src[this.nums];
				musicPlay(musics);
			}
	}
	function musicPlay(ele_name){//自定义audio播放函数；
		ele_name.play();
		music_befsrc_index=mp3_src.indexOf(decodeURI(music_befsrc.split("BDNM/")[1]));
		now_index=mp3_src.indexOf(decodeURI(musics.src.split("BDNM/")[1]));
		//切歌样式；代码太冗余，待完善；
		if(now_index>music_befsrc_index){//下一首
			for_radius[0].style="animation:img_move 1s linear;"
			setTimeout(function(){
				for_radius[0].style="animation:img_move_aft 1s linear;"
				radiu_trans[0].src=mp3_img[now_index];
			},500);
			if(music_befsrc_index==0&&now_index==mp3_src.length-1){
				for_radius[0].style="animation:img_bef 1s linear;"
				setTimeout(function(){
					for_radius[0].style="animation:img_bef_aft 1s linear;"
					radiu_trans[0].src=mp3_img[now_index];
				},500);
			}
		}
		if(now_index<music_befsrc_index){//上一首
			for_radius[0].style="animation:img_bef 1s linear;"
			setTimeout(function(){
				for_radius[0].style="animation:img_bef_aft 1s linear;"
				radiu_trans[0].src=mp3_img[now_index];
			},500);
			if(music_befsrc_index==mp3_src.length-1&&now_index==0){
				for_radius[0].style="animation:img_move 1s linear;"
				setTimeout(function(){
					for_radius[0].style="animation:img_move_aft 1s linear;"
					radiu_trans[0].src=mp3_img[now_index];
				},500);
			}
		}
		$("sing_name").innerHTML=mp3_name[now_index];
		setTimeout(function(){timeLine(ele_name)},1000)//延迟是防止马上反应，时间来不及找到，UI中会短暂显示NaN；
	}
	
	
	/****************************************************************************/
	for(var i=0;i<loop_item.length;i++){//循环列表的事件添加；
		(function (i){
			loop_item[i].onclick=function(){
				musics.loopstyle=i;
			}
		})(i);
	}
	musics.onended=function(){//播放结束后的事件
		loopList(this.loopstyle,1);
	}
	function loopList(num,add_sign){//循环响应事件，同时上一曲+下一曲也在该函数中；
		music_befsrc=musics.src;
		switch(num){
			case 0://单曲循环
				musics.src=musics.src;
				musicPlay(musics);
				break;
			case 1://列表循环
				var mp3_now=decodeURI(musics.src.split("BDNM/")[1]),
					mp3_dir=mp3_src.indexOf(mp3_now)+add_sign;
				if(mp3_dir>=mp3_src.length){//处理播放列表结尾；
					mp3_dir=0;
				}
				if(mp3_dir<0){//处理播放列表开头；
					mp3_dir=mp3_src.length-1;
				}
				m_input[mp3_dir].checked="true";//切换时，对应的radio切换；
				musics.src=mp3_src[mp3_dir];
				musicPlay(musics);
				break;
			case 2://随机播放；
				m_input[(Math.floor(Math.random()*mp3_src.length))].checked="true";//切换时，对应的radio切换；
				musics.src=mp3_src[(Math.floor(Math.random()*mp3_src.length))];
				musicPlay(musics);
				break;
		}
	}
	
	
	/****************************************************************************///以上为播放相关音乐设置，以下为UI相关设置；
	var mp3_time=document.getElementById("mp3_time"),//进度条拖拽函数；
		time_circle=document.getElementById("time_circle"),
		time_length=document.getElementById("time_length"),
		the_body=document.getElementsByTagName("body")[0],
		timer_1=null,
		timer_3=null,
		timer_4=null;
	var len_box=document.getElementById("len_box"),//进度条拖拽函数；
		voice_circle=document.getElementById("voice_cir"),
		voice_length=document.getElementById("voice_len");

	len_box.onmousedown=function(){
		new_drag(len_box,voice_circle,voice_length,["volume"],["clientY","offsetTop","offsetHeight","top","height"],timer_4)
	}
	mp3_time.onmousedown=function(){
		new_drag(mp3_time,time_circle,time_length,["currentTime","duration"],["clientX","offsetLeft","offsetWidth","left","width"],timer_3)
	}
	
	
	/****************************************************************************/
	var timer_2=null,//显示播放时间；
		now_time=document.getElementById("now_time"),
		all_time=document.getElementById("all_time"),
		minute=0,
		second=0;
	function timeLine(ele_name){
		clearInterval(timer_2);
		//进度条随时间变化；
		time_circle.style.left=ele_name.currentTime/ele_name.duration*time_length.offsetWidth+"px";
		time_length.nextSibling.nextSibling.style.width=time_circle.offsetLeft+2+"px";//进度条颜色改变
		time_length.nextSibling.nextSibling.style.backgroundColor="yellow";
		//时间动态显示数字；
		if(ele_name.currentTime/ele_name.duration==1){
			clearInterval(timer_2);
			return false;
		}
		var now_move_time=String(ele_name.currentTime),
			all_move_time=String(ele_name.duration/60);
		if(now_move_time<60){
			second=now_move_time.substring(0,2);
			minute="00";
		}else{
			second=String(now_move_time%60).substring(0,2);
			minute="0"+Math.floor(now_move_time/60);
		}
		if(second<10){
			second="0"+second.substring(0,1);
		}
		now_time.innerHTML=minute+":"+second;//当前播放时长；
		all_time.innerHTML="0"+all_move_time.substring(0,1)+":"+String(ele_name.duration%60).substring(0,2);/*音乐总时长*/
		timer_2=setInterval(function(){timeLine(ele_name)},1000);
	}
	
	
	/****************************************************************************/
	function new_drag(drag_box,drag_circle,drag_length,ele_obj,dir,timers){//此处为进度滑块的封装函数，为了加强该函数的复用性；
			var f_client=event[dir[0]];
				circleOffset=drag_circle[dir[1]];
				console.log(drag_circle)
			//把mouseup和mousemove事件放在body元素下使圆圈滑动起来更流畅，不会受元素边界影响；
			//但此body事件的加载要放在进度条的mousedown事件中，否则会与其他元素鼠标事件互相影响；
			the_body.onmousemove=function(){
				moveCircle(event,drag_circle,drag_length,f_client,circleOffset,ele_obj,dir,timers);
			}
			the_body.onmouseup=function(){
				//控制音乐播放时间；
				clearInterval(timers);
				the_body.onmousemove=function(){//后面不会用到的情况下，尽量将时间，清除计时器等放在前面位置，减少误差影响；
					return false;
				}	
				if(drag_circle[dir[1]]>drag_length[dir[2]]){
					return false;
				}
				if(String(musics[ele_obj[1]])=="undefined"){//此判断待完善，（完善后应尽量避免该IF判断的出现，减小程序的压力；）
					musics[ele_obj[0]]=1-drag_circle[dir[1]]/drag_length[dir[2]];
				}else{
					musics[ele_obj[0]]=drag_circle[dir[1]]/drag_length[dir[2]]*musics[ele_obj[1]];
				}
				//停止圆圈的滑动操作；
			}
		}
		
		/*************************///事件响应函数；
		function moveCircle(eve,drag_circle,drag_length,f_client,circleOffset,ele_obj,dir,timers){//进度条滑动事件响应函数；
			timers=setInterval(function(){
				clearInterval(timers);
				var now_circle=circleOffset+(eve[dir[0]]-f_client);
				if(now_circle<0){
					now_circle=0;
					return false;
				}
				if(now_circle>drag_length[dir[2]]){
					now_circle=drag_length[dir[2]];
					return false;
				}
				drag_circle.style[dir[3]]=now_circle+"px";
				if(dir[4]=="width"){//此判断待完善，（完善后应尽量避免该IF判断的出现，减小程序的压力；）
					drag_length.nextSibling.nextSibling.style[dir[4]]=now_circle+2+"px";//进度条颜色改变(时长)
					drag_length.nextSibling.nextSibling.style.backgroundColor="yellow";
				}else{
					drag_length.firstElementChild.style[dir[4]]=drag_length.offsetHeight-now_circle+"px";//进度条颜色改变（音量）
					drag_length.firstElementChild.style.backgroundColor="yellow";
				}
			},1);
		}
		
	

/*********************************/
	
	
}
