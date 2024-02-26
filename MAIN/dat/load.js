function load()
{
	document.getElementById("loadfile").style.display="block";
	var tmp="ステージ一覧:<br>";
	tmp+="<p style='overflow:scroll;height:400px'>";
	var files = getDir(filepath+"savedata/");
	for(var i=0,n=files.length;i<n;i++)
	{
		var pth=files[i].split("\\");
		pth=pth[pth.length-1];
		var pthInfo=JSON.parse(readFileName(pth));
		var label;
		switch(pthInfo.label)
		{
			case "!" : label=3;break;
			case "=" : label=2;break;
			default  : label=1;break;
		}
		tmp+="<a class='button' style='background-color:"+colorButton[label]+"' href='javascript:loadWith(\""+pth+"\","+(pthInfo.stage-1)+")'>"+
		     stageNum(pthInfo.stage-1)+"</a> "+pthInfo.dat+" "+pthInfo.tim+"<br>"
	}
	tmp+="</p>";
	
	tmp+="<a class='button' style='background-color:"+colorButton[0]+"' href='javascript:toMenu()'>戻る</a><br>";
	document.getElementById("loadfile").innerHTML=tmp;
}

function toMenu()
{
	document.getElementById("loadfile").style.display="none";
	document.getElementById("menu").style.display="block";
}

var datArr2;
function loadWith(pth,n)
{
	var contents=openFile(filepath+"savedata/"+pth)
	var obj=JSON.parse(contents);
	var id=obj["player-id"];
	var hands=obj["hand(s)"];
	document.getElementById("loadfile").style.display="none";
	document.getElementById("loadedfile").style.display="block";
	var tmp=""
	
	tmp+='<a class="menubar" >'+"解いたユーザーのID: "+id+"<br>"+'</a>'+
	'<br><span id="load_currst"></span><br>'+
	'<div class="waku">'+
	'	<div class="stac st1" id="load_rd"></div>'+
	'	<div class="stac st2" id="load_bl"></div>'+
	'	<div class="dish" id="load_dish"></div>'+
	'	<div class="arrow"></div>'+
	'</div>'+
	'	<input type="button" name="pop" value="次に進む"  onclick="autoNext(\''+hands+'\')" />'+
	'<span id="load_goldhint"></span>';
	document.getElementById("loadedfile").innerHTML=tmp;
	
	document.getElementById("load_currst").innerHTML=stageNum(n)+"：作者記録"+stageRawData[n].split(":")[1];
	stageNowData[n]=stageOriginalData[n];
	var tmpp=stageNowData[n].split("@");//データ構造は固定なのでまとめる
	tmpp='{"load_rd":['+tmpp[0]+'],"load_bl":['+tmpp[1]+'],"load_dish":['+tmpp[2]+']}';   /*'{"rd":["T","A","C","K"],"bl":[],"dish":["S"]}'というデータ構造*/
	
	datArr2=JSON.parse(tmpp);//書き換える
	
	document.getElementById("load_rd").style.left=50+"px";
	document.getElementById("load_bl").style.left=200+"px";
	red_is_left=true;
	lastMove=[];//リセットし忘れた
	writeDown(lastMove);//リセットし忘れた
	popKeeper=[];//リセットし忘れた
	setStack2();
	
}



function setStack2()//スタックをdatArr2の通りにする
{
	var i,j,tmp="";
	var lg="";//ログ用
	for(i in datArr2)
	{
		for(j in datArr2[i])
		{
			 tmp+='<div class="koo">'+datArr2[i][j]+'</div>';
		}
		document.getElementById(i).innerHTML=tmp;
		tmp="";
	}
}

var autoIndex=0;

function autoNext(hands)
{
	hands+="";
	autoplay1(hands.charAt(autoIndex));
	autoIndex++;
	if(autoIndex>=hands.length)
	{
		alert("ミッションクリア!!　＼(・∀・)／");
		document.getElementById("loadedfile").style.display="none";
		document.getElementById("loadedfile").innerHTML="";
		load();
	}
}


function autoplay1(hand)
{
	function pointed(){return red_is_left?"load_rd":"load_bl"}
	var ugoki=["皿移動","コピー","入替え","ス移動"];
	alert(ugoki[hand]);
	switch(hand)
	{
		case "0" : datArr2.load_dish[0]=datArr2[pointed()].shift();setStack2();break;
		case "1" : datArr2[pointed()].unshift(datArr2.load_dish[0]);setStack2();break;
		case "2" : recti2();break;
		case "3" : datArr2[red_is_left?"load_bl":"load_rd"].unshift(datArr2[pointed()].shift());setStack2();break;
		default  : alert("error");break;
	}
	
	function recti2()//入れ替え処理
	{
		var red=parseInt(document.getElementById("load_rd").style.left,10);
		var blu=parseInt(document.getElementById("load_bl").style.left,10);
		var Tim1;
		var dif=red_is_left?15:-15;//変化量
		Tim1=setInterval(function()
		{
			red+=dif;document.getElementById("load_rd").style.left=red+"px";
			blu-=dif;document.getElementById("load_bl").style.left=blu+"px";
			if(red>=200||blu>=200){clearTimeout(Tim1);}
		},35);
		red_is_left=!red_is_left;
	}
}