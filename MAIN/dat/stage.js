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
	if(stageRawData[dat] == null)return"undefined"
	if(stageRawData[dat].split(":")[2])
	{
		return stageRawData[dat].split(":")[2]
	}
	else return "Level "+(dat+1);
}
function credit()//スタッフクレジット
{
	document.getElementById("staffcredit").style.display="block";
}
function config()//設定
{
	document.getElementById("config").style.display="block";
}
function configClose()//設定
{
	document.getElementById("config").style.display="none";
}

function creditClose()//スタッフクレジット
{
	document.getElementById("staffcredit").style.display="none";
}
function createStageMenu()//ステージ選択メニュー
{
	if(getUserName()==null){anonymousInit();}
	var isBossCleared= stageCleared[37]>0;
	var showList = isBossCleared ? "01" : "0";
	showList = GLOBAL.alpha?"2"+showList:showList;
	var mnu=document.getElementById('menu');//メニューのDOM
	var STAGE_NUM=stageOriginalData.length-1;
	var tmp='ステージを選択：<br>';
	tmp+='<table><tr>';
	
	var tlist=[];
	for(var i=0,j=0;i<STAGE_NUM;i++)
	{
		if(showList.indexOf(stageTagList[i],0)+1) // if(showList contains stageTag)
		{
			if(stageTagList[i]=='0'||stageTagList[i]=='1')
			{
				tmp+='<td><a id="sta'+i+'" class="button" style="background-color:'+colorButton[stageCleared[i]+""]+
				';" href="javascript:createStage('+i+')">'+stageNum(i)+'</a> </td>'
				j++;
			}
			else
			{
				tlist[tlist.length]=i
			}
		}
		if(j%11==0)
		{
			tmp+='</tr><tr>'
		}
	}
	tmp+='</tr></table><br>';
	tmp+='<table><tr>';
	for(var k=0,j=0;k<tlist.length;k++)
	{
		tmp+='<td><a id="sta'+tlist[k]+'" class="button" style="background-color:'+colorButton[stageCleared[tlist[k]]+""]+
				';" href="javascript:createStage('+tlist[k]+')">'+stageNum(tlist[k])+'</a> </td>'
				j++;
		if(j%11==0)
		{
			tmp+='</tr><tr>'
		}
	}
	tmp+='</tr></table><br>';
	tmp+=
	"<br><br><br>"+
	"<span id='shownew' style='display:none'>"+
	 "<div onclick='javascript:showNew()' class='bigbutton'>裏ステージで遊ぶ</div>"+
	"</span>"+
	"<a href='javascript:toTitle();'>タイトルに戻る</a><br>"+
	"<a href='javascript:do5();'>説明に戻る</a><br>"+
	"<a href='javascript:credit();'>スタッフクレジット</a><br>"+
	"<a href='javascript:config();'>設定</a><br>"+
	"<a href='javascript:logOut();'>ログアウトしてタイトルに戻る</a><br>"+
	"<br>"+
	"<a class='button' style='background-color:"+colorButton[0]+";' href='javascript:changeUser()'>Load...</a>&nbsp;"+
	"<a class='button' style='background-color:"+colorButton[0]+";' href='javascript:pseudoSave()'>Save...</a><br>"+
	"※既にユーザ登録していて、以前のデータで遊ぶ方はLoadをクリックして下さい。<br>"+
	"<a style='color:white' href='javascript:alpha();showNew();'>_</a>";
	mnu.innerHTML=tmp;

}

function alpha()
{
	GLOBAL.alpha=!GLOBAL.alpha;
}

function anonymousInit()
{
	
}


function pseudoSave(){
	if(getUserName()==null)
	{
		do3();
		return;
	}
	if(appendFile(dir()+".config.txt",""))
	{
		alert("保存しました。");
	}
	else
	{
		alert("保存できませんでした。");
	}
}
function createStage(n)
{
	if(n in stageOriginalData)//元データが空ではない
	{
		if(!(n in stageNowData))stageNowData[n]=stageOriginalData[n];
		var tmpp=stageNowData[n].split("@");//データ構造は固定なのでまとめる
		tmpp='{"rd":['+tmpp[0]+    '],"bl":['+tmpp[1]+'],"dish":['+tmpp[2]+']}';
		/*   '{"rd":["T","A","C","K"],"bl":[           ],"dish":["S"        ]}'というデータ構造*/
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

function changeUser()//fixme:repetition
{
	var $ = document.getElementById("login");
	$.style.display="block";
	$.innerHTML="ログイン<br>"+
	"<form name='log_in'>"+
		"ユーザー名: <input name='username' onsubmit='return false;'><br>"+
		"<input name='dummy' onsubmit='return false;' style='display:none;'>"+ // at least 2 textboxes must be present for `onsubmit' to take place
		"<input type='button' value='OK' onclick='logIn2(false,document.log_in.username.value)'> "+
		"<input type='button' value='Cancel' onclick='document.getElementById(\"login\").style.display=\"none\";' />"+
	"</form>";
}

function do3()//③ユーザ登録
{
	var $ = document.getElementById("login");
	$.style.display="block";
	$.innerHTML="アカウント作成<br>"+
	"<form name='log_in'>"+
		"ユーザー名: <input name='username' onsubmit='return false;'><br>"+
		"<input name='dummy' onsubmit='return false;' style='display:none;'>"+ // at least 2 textboxes must be present for `onsubmit' to take place
		"<input type='button' value='OK' onclick='do4(document.log_in.username.value);'> "+
		"<input type='button' value='Cancel' onclick='document.getElementById(\"login\").style.display=\"none\";' />"+
	"</form><br><br>"+
	"次に来た時に同じ名前でログインすると続きから遊べるよ。";	
}

function logIn2(makenew,name)
{
	var origDir=dir(true);
	setUserName(name);
	document.getElementById("login").style.display="none";
	if(!getDir(dir()))
	{
		if(!makenew)
		{
			alert("ロードするデータがありません");
			return;
		}
		else
		{
			document.getElementById("loading").style.display="none";
			saveFile(dir()+".config.txt","animate:true");
			return;
		}
	}
	else
	{
		if(!makenew)
		{
			load(true);load();
			return;
		}
		else
		{
			setUserName(null);
			document.getElementById("login").style.display="block";
			alert("そのユーザー名は既に使われています");
			return;
		}
	}
	
}


function ask()
{
	if(!GLOBAL.skipExplain&&confirm("ゲームのルール説明を見ますか？"))
	{
		do5();
	}
	else
	{
		do6();
	}
}

function do4(txt)//④質問
{

	// txt can be null
	if(txt==null)
	{
		setUserName(null);ask();return;
	}
	
	var origDir=dir(true);
	setUserName(txt);
	document.getElementById("login").style.display="none";
	if(!getDir(dir()))
	{
		document.getElementById("loading").style.display="none";
		var a=renameDir(origDir,dir(true));
		if(!a)
		{
			document.getElementById("loading").style.display="none";
			saveFile(dir()+".config.txt","animate:true");
		}
		ask();
		return;
	}
	else
	{
		setUserName(null);
		document.getElementById("login").style.display="block";
		alert("そのユーザー名は既に使われています");
		return;
	}
	
	
	// logIn2(true,txt); -- NO; we have to make another user
	ask();
}



function do6()//⑥ステージセレクト
{
	makStag();
}


function logOut()
{
	setUserName(null);
	stageCleared=new Array(stageRawData.length);
	toTitle();
}

var stageCleared=new Array(stageRawData.length);//ステージ数と同じ数作る