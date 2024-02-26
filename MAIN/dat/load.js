function load(overwrite)
{
	document.getElementById("loading").style.display="block";
	var files = getDir(filepath+"savedata/"+esc(userName));
	
	for(var i=0,n=files.length;i<n;i++)
	{
		var pth=files[i].split("\\");
		pth=pth[pth.length-1];
		var pthInfo=JSON.parse(readFileName(pth));
		
		var stage_num = pthInfo.stage-1;
		
		var stage_name = stageNum(stage_num);
		
		var stage_JSON = (function(n)
		{
			var tmpp=stageOriginalData[n].split("@");//データ構造は固定なのでまとめる
			return '{"rd":['+tmpp[0]+'],"bl":['+tmpp[1]+'],"dish":['+tmpp[2]+']}'; 
			/*'{"rd":["T","A","C","K"],"bl":[],"dish":["S"]}'というデータ構造*/
		})(stage_num);
		var contents=openFile(filepath+"savedata/"+esc(userName)+pth)
		var obj=JSON.parse(contents);
		var id=obj["player-id"];
		var hands=obj["hand(s)"];
		var record_length = stageRawData[stage_num].split(":")[1]-0	
		if(overwrite){stageCleared=new Array(stageRawData.length);}
		if(solves(hands,stage_JSON)=="STACK")
		{
			if(hands.length<record_length){stageCleared[stage_num] = 3}
			else if(hands.length==record_length && stageCleared[stage_num] != 3){stageCleared[stage_num] = 2}
			else if(stageCleared[stage_num] != 3 && stageCleared[stage_num] != 2){stageCleared[stage_num] = 1}
		}
	}
	document.getElementById("loading").style.display="none";
	createStageMenu();
}

function solves(hands,json)
{
	var stag = JSON.parse(json);
	var Rleft = true;
	
	var pointed  = function(){return  Rleft?"rd":"bl"}
	var nPointed = function(){return !Rleft?"rd":"bl"}
	var POP = function()
	{
		if(stag[pointed()].length==0){return -1;}
		stag.dish[0]=stag[pointed()].shift();return 0;
	}
	var PUSH = function()
	{
		if(stag.dish.length==0 || stag[pointed()].length==5){return -1;}
		stag[pointed()].unshift(stag.dish[0]);return 0;
	}
	var MOV = function(){
		if(stag[pointed()].length==0 || stag[nPointed()].length==5){return -1;}
		stag[nPointed()].unshift(stag[pointed()].shift());return 0;
	}
	for(var i=0;i<hands.length;i++)
	{
		switch(hands.charAt(i))
		{
			case "0": if(POP() )return false; else break;
			case "1": if(PUSH())return false; else break;
			case "2": Rleft=!Rleft; break;
			case "3": if(MOV() )return false; else break;
		}
	}
	return stag.rd.join("")//=="STACK")
}