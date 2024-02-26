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

function createStageMenu()//ステージ選択メニュー
{
	var isBossCleared= stageCleared[stageRawData.length-1]>0;
	var mnu=document.getElementById('menu');//メニューのDOM
	var STAGE_NUM=stageOriginalData.length-1;
	var tmp='<br>&nbsp;'+
	'<form name="make">'+
		'&nbsp;赤<input type="text" name="aka_" /><br>'+
		'&nbsp;青<input type="text" name="ao_" /><br>'+
		'&nbsp;皿<input type="text" name="sara_" /><br>'+
		'<input type="button" value="make" onclick="makeStageWith(document.make.aka_.value,document.make.ao_.value,document.make.sara_.value)" /></form>';
	

	mnu.innerHTML=tmp;

}
	function makeStage(stDat)
	{
		datArr=eval(stDat);//書き換える
		document.getElementById("rd").style.left=50+"px";//DOMを作っておかないと怒られる
		document.getElementById("bl").style.left=200+"px";
		document.inp.und.disabled=true;
		red_is_left=true;
		lastMove=[];//リセットし忘れた
		writeDown(lastMove);//リセットし忘れた
		popKeeper=[];//リセットし忘れた
		setStack();
	}
function makeStageWith(a,b,c)
{
	if (!window.JSON) {
  window.JSON = {
    parse: function (sJSON) { return eval("(" + sJSON + ")"); },
    stringify: function (vContent) {
      if (vContent instanceof Object) {
        var sOutput = "";
        if (vContent.constructor === Array) {
          for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
          return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
        }
        if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
        for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ","; }
        return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
      }
      return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
    }
  };
}
		a=JSON.stringify(a.split(""));
		b=JSON.stringify(b.split(""));
		c=JSON.stringify(c.split(""));
		tmpp='({"rd":'+a+',"bl":'+b+',"dish":'+c+'})';
		/*'{"rd":["T","A","C","K"],"bl":[],"dish":["S"]}'というデータ構造*/
		makeStage(tmpp);//ステージ作る
		document.getElementById('menu').style.display="none";
		//currentStage=undefined;
}
function createStage(n)
{

	if(n in stageOriginalData)//元データが空ではない
	{
		if(!(n in stageNowData))stageNowData[n]=stageOriginalData[n];
		var tmpp=stageNowData[n].split("@");//データ構造は固定なのでまとめる
		tmpp='({"rd":['+tmpp[0]+'],"bl":['+tmpp[1]+'],"dish":['+tmpp[2]+']})';
		/*'{"rd":["T","A","C","K"],"bl":[],"dish":["S"]}'というデータ構造*/
		makeStage(tmpp);//ステージ作る
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
var stageCleared=new Array(stageRawData.length);//ステージ数と同じ数作る