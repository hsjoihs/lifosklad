var stageOriginalData=[];
;(function(){

	var tm;
	var tmp=[];
	var tp=[];
	function quote(datt){if(datt)return'"'+datt.split('').join('","')+'"';else return""}//ACK→"A","C","K"
	for(var q in stageRawData)//1データごとに
	{
		tm="";
		tp=stageRawData[q].split(":")[0];
		tmp=tp.split(",");//ACK S T
		for(var I=0;I<2;I++)//ACK
		{
			tm+=quote(tmp[I])+'@';
		}
		stageOriginalData[q]=tm+quote(tmp[2]);
	}
	stageOriginalData.push(false);
	
})();
function stageNum(dat)
{
	if(stageRawData[dat].split(":")[2])
	{
		return stageRawData[dat].split(":")[2]
	}
	else return"Level "+(dat+1);
}
function credit()//スタッフクレジット
{
	document.getElementById("staffcredit").style.display="block";
}
function creditClose()//スタッフクレジット
{
	document.getElementById("staffcredit").style.display="none";
}
function createStageMenu()//ステージ選択メニュー
{
	if(userName==null){logIn();}
	var isBossCleared= stageCleared[stageRawData.length-1]>0;
	var mnu=document.getElementById('menu');//メニューのDOM
	var STAGE_NUM=stageOriginalData.length-1;
	var tmp='ステージを選択：<br>';
	for(var i=0;i<STAGE_NUM;i++)
	{
		if(!(isHidden[i]-0)||isBossCleared)tmp+='<a id="sta'+i+'" class="button" style="background-color:'+colorButton[stageCleared[i]+""]+
		';" href="javascript:createStage('+i+')">'+stageNum(i)+'</a> '
	}
	tmp+="<br><br><br><br><br><br><a href='javascript:toTitle();'>タイトルに戻る</a><br><a href='javascript:toTutor();'>説明に戻る</a><br>"+
	"<a href='javascript:credit();'>スタッフクレジット</a><br><a href='javascript:logOut();'>ログアウトしてタイトルに戻る</a><br><br><a class='button' style='background-color:"+colorButton[0]+";' href='javascript:logIn2(true,userName)'>Load...</a>&nbsp;"+"<a class='button' style='background-color:"+colorButton[0]+";' href='javascript:alert(\"保存されました。\")'>Save...</a>";
	mnu.innerHTML=tmp;

}
function createStage(n)
{
	if(n in stageOriginalData)//元データが空ではない
	{
		if(!(n in stageNowData))stageNowData[n]=stageOriginalData[n];
		var tmpp=stageNowData[n].split("@");//データ構造は固定なのでまとめる
		tmpp='{"rd":['+tmpp[0]+'],"bl":['+tmpp[1]+'],"dish":['+tmpp[2]+']}';
		/*'{"rd":["T","A","C","K"],"bl":[],"dish":["S"]}'というデータ構造*/
			datArr=JSON.parse(tmpp);//書き換える
			document.getElementById("rd").style.left=50+"px";//DOMを作っておかないと怒られる
			document.getElementById("bl").style.left=200+"px";
			document.inp.und.disabled=true;
			red_is_left=true;
			lastMove=[];//リセットし忘れた
			writeDown(lastMove);//リセットし忘れた
			popKeeper=[];//リセットし忘れた
			setStack();
		document.getElementById('menu').style.display="none";
		currentStage=n;
		document.getElementById("currst").innerHTML=stageNum(n)+"：作者記録"+stageRawData[n].split(":")[1];
		document.getElementById("comm").innerHTML=stageRawData[n].split(":")[3]?stageRawData[n].split(":")[3]:"";
		if(stageCleared[n]==1){document.getElementById("goldhint").innerHTML=goldHint[n];}
		else{document.getElementById("goldhint").innerHTML=""}
	}
	else
	{
		alert("このステージはまだ出来ていないよ");//最早死にコードだが
	}
}
function pauseMenu(noConf)//メニューに戻る　関数名がおかしいのは仕様ですｗｗ
{
	if(!noConf&&lastMove.length!=0)
	{
		if(confirm("メニューに戻るとこのステージを最初からやり直さなくてはいけないが、大丈夫か？"))
		{
			document.getElementById('menu').style.display='block';
			currentStage=-1;
		}
	}
	else
	{
		document.getElementById('menu').style.display='block';
		currentStage=-1;
	}
}

function logIn()
{
	var $ = document.getElementById("login");
	$.style.display="block";
	$.innerHTML="ログイン/アカウント作成<br>"+"<form name='log_in'>ユーザー名: <input name='username'><br>"+
	"<input type='button' value='OK' onclick='logIn2(false,document.log_in.username.value)'> "+
	"<input type='button' value='Cancel' onclick='document.getElementById(\"login\").style.display=\"none\";toTitle();'></form><br><br>"+
	"次に来た時に同じ名前でログインすると続きから遊べるよ。";
}

function logIn2(warn,name)
{
	userName = name;
	document.getElementById("login").style.display="none";
	try{load(true);load();}catch(E){document.getElementById("loading").style.display="none";if(warn)alert("ロードするデータがありません")}
}

function logOut()
{
	userName = null;
	stageCleared=new Array(stageRawData.length);
	toTitle();
}

var stageCleared=new Array(stageRawData.length);//ステージ数と同じ数作る