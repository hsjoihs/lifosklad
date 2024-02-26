var red_is_left=true;//赤いスタックが左にあるかどうか
var datArr={"rd":[],"bl":[],"dish":[]};//現在のデータを収納するグローバル変数
var stageNowData=[];//ステージの現在のデータを一時保存用に確認する
var lastMove=[];//手を保管
var popKeeper=[];//popで消えたやつを保管する
var currentStage=-1;//現在のステージ

var GLOBAL = 
{
	userName:null,
	animate:true,
	from5:false, // is the user in routine #5?
	skipExplain:false, // did the user read the explanation?
	playid:function(n){var TMP="";for(var i=0;i<n;i++){TMP+=Math.floor(Math.random()*10)}return TMP}(40)//乱数でID。衝突が怖いので40桁。
};

function applyConfig(json)
{
	var dat = JSON.parse("{"+json+"}");
	if(dat)setAnimate(dat.animate);
}

function setUserName(val)
{
	GLOBAL.userName=val;
	if(val==null)
	{
		document.getElementById("username").style.display=
		document.getElementById("username2").style.display="none";
	}
	else
	{
		document.getElementById("username").style.display=
		document.getElementById("username2").style.display="block";
		document.uname.uname2.value=val;
	}
}
function getUserName(){return GLOBAL.userName;}
function animate()
{
	GLOBAL.animate=true;
	document.anim.on.disabled=true;
	document.anim.off.disabled=false;
	if(getUserName())appendFile(dir()+".config.txt",",\r\nanimate:true");
}
function noAnimate()
{
	GLOBAL.animate=false;
	document.anim.off.disabled=true;
	document.anim.on.disabled=false;
	if(getUserName())appendFile(dir()+".config.txt",",\r\nanimate:false");
}
function getAnimate(){return GLOBAL.animate;}
function setAnimate(t){if(t)animate();else noAnimate()}
function getPlayId(){return GLOBAL.playid}


function init()//初期処理
{
	resizeTo(1040,605);
	explain(0);
	animate();
	var E;
	saveFile(filepath+"playerdata/"+getPlayId()+".txt",'{"started-playing-at":"'+timestamp(true)+'"}');
}

function setStack(limit)//スタックをdatArrの通りにする
{
	var i,j="";
	var tmp=""
	var lg="";//ログ用
	for(i in datArr)
	{
		if( (limit!=null) && (limit!=i) )continue;
		for(j in datArr[i])
		{
			 tmp+='<div class="koo" id="'+i+'_'+j+'">'+datArr[i][j]+'</div>';
		}
		document.getElementById(i).innerHTML=tmp;
		tmp="";
	}
}

function termin()
{
	var datt=openFile(filepath+"playerdata/"+getPlayId()+".txt");
	if(datt!==null)
	{
		deleteFile(filepath+"playerdata/"+getPlayId()+".txt"); 
		saveFile(filepath+"playerdata/!"+getPlayId()+".txt",datt.replace("}","")+',"finished-playing-at":"'+timestamp(true)+'"}')
	}
}