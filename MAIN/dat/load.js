function load()
{
	document.getElementById("loadfile").style.display="block";
	var tmp="";
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
	document.getElementById("loadfile").innerHTML=tmp;
}

function loadWith(pth,n)
{
	alert(pth);
	var contents=openFile(filepath+"savedata/"+pth)
	var obj=JSON.parse(contents);
	var id=obj["player-id"];
	var hands=obj["hand(s)"];
	alert(id+" "+hands);
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
	'<form name="load_inp">'+
	'	<input type="button" name="pop" value="皿へ移動" disabled="disabled" />'+
	'	<input type="button" name="pus" value="皿からコピー" disabled="disabled" />'+
	'	<input type="button" name="lgt" value="スタックを入れ替える" disabled="disabled" />'+
	'	<input type="button" name="mov" value="もう一つのスタックに移動" disabled="disabled" />'+
	'	<input type="button" name="und" value="一手戻す" disabled="disabled" /><br><br>'+
	'	<input type="button" name="rel" value="ステージをやり直す" disabled="disabled" />'+
	'</form>'+
	'<span id="load_log"></span><br>'+
	'<span id="load_mvm"></span><br><br>'+
	'<span id="load_comm"></span><br>'+
	'<span id="load_goldhint"></span>';
	document.getElementById("loadedfile").innerHTML=tmp;
	
	document.getElementById("load_currst").innerHTML=stageNum(n)+"：作者記録"+stageRawData[n].split(":")[1];
	stageNowData[n]=stageOriginalData[n];
	var tmpp=stageNowData[n].split("@");//データ構造は固定なのでまとめる
	tmpp='({"rd":['+tmpp[0]+'],"bl":['+tmpp[1]+'],"dish":['+tmpp[2]+']})';
	/*'{"rd":["T","A","C","K"],"bl":[],"dish":["S"]}'というデータ構造*/
	datArr=eval(tmpp);//書き換える
	
	document.getElementById("load_rd").style.left=50+"px";
	document.getElementById("load_bl").style.left=200+"px";
	red_is_left=true;
	lastMove=[];//リセットし忘れた
	writeDown(lastMove);//リセットし忘れた
	popKeeper=[];//リセットし忘れた
	setStack2();

	function setStack2()//スタックをdatArrの通りにする
	{
		var i,j,tmp="";
		var lg="";//ログ用
		for(i in datArr)
		{
			for(j in datArr[i])
			{
				 tmp+='<div class="koo">'+datArr[i][j]+'</div>';
			}
			document.getElementById("load_"+i).innerHTML=tmp;
			tmp="";
		}
	}
	
	
}
