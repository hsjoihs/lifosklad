﻿var colorButton={0:"#f0f0f0","undefined":"#f0f0f0",1:"#7fffd4",2:"#ffd700",3:"#ff00ff"};

function unlock(t){var $=document.inp;$.pop.disabled=$.pus.disabled=$.lgt.disabled=$.mov.disabled=$.rel.disabled=$.rel.disabled=t}
function writeDown(dtt)
{
	var rTmp=dtt.length+"手目： ";
	var ugoki=["皿移動","コピー","入替え","ス移動"];
	for(var i=0;i<dtt.length;i++)
	{
		rTmp+=ugoki[dtt[i]]+",";
	}
	document.getElementById("mvm").innerHTML=rTmp;
}
function cmd(v)//コマンド受け取る
{
	function pointed(){return red_is_left?"rd":"bl"}
	function POP()//皿へ移動
	{
		popKeeper[popKeeper.length]=datArr.dish[0];//popKeeperに保管
		if(datArr[pointed()].length==0)
		{alert("移動できません");return 0;}
		else
		{
			unlock(true);//封じ
			datArr.dish[0]=datArr[pointed()].shift();//左のスタックから一つ抜く
			setStack();//スタックから消して皿に出す
			unlock(false);//封じ
			return 1;
		}
	}
	function PUSH()//皿からコピー
	{
		if(datArr.dish.length==0){alert("移動できません");return 0;}
		if(datArr[pointed()].length==5){alert("移動できません");return 0;}
		unlock(true);//封じ
		datArr[pointed()].unshift(datArr.dish[0]);//皿から貰う
		setStack();
		unlock(false);//封じ
		return 1;
	}
	function MOV()//一つ動かす
	{
		if(datArr[pointed()].length==0){alert("移動できません");return 0;}
		if(datArr[red_is_left?"bl":"rd"].length==5){alert("移動できません");return 0;}
		unlock(true);//封じ
		datArr[red_is_left?"bl":"rd"].unshift(datArr[pointed()].shift());//一つ動かす
		setStack();
		unlock(false);//封じ
		return 1;
	}
	function recti()//入れ替え処理
	{
		var red=parseInt(document.getElementById("rd").style.left,10);
		var blu=parseInt(document.getElementById("bl").style.left,10);
		var Tim1;
		unlock(true);//副作用防止のために封じておく
		var dif=red_is_left?15:-15;//変化量
		Tim1=setInterval(function()
		{
			red+=dif;document.getElementById("rd").style.left=red+"px";
			blu-=dif;document.getElementById("bl").style.left=blu+"px";
			if(red>=200||blu>=200){unlock(false);clearTimeout(Tim1);}
		},35);
		red_is_left=!red_is_left;
	}
	function jigo(mvnm)//移動処理後の事後処理（Undoなどの管理のため）
	{
		lastMove[lastMove.length]=mvnm;//動きを追加
		var label;
		if(datArr.rd.join("")=="STACK")//クリア条件
		{
			writeDown(lastMove);
			alert(lastMove.length+"手でミッションクリア!!　＼(・∀・)／");
			var isBossCleared= stageCleared[stageRawData.length-1]>0;
			/*if(lastMove.length<stageRawData[currentStage].split(":")[1]-0)//短い
			{
				stageCleared[currentStage]=3;
				label="!";
			}
			else if(stageCleared[currentStage]!=3&&lastMove.length==stageRawData[currentStage].split(":")[1]-0)//等しいかつ記録を超えていない
			{
				stageCleared[currentStage]=2;
				label="=";
			}
			else if(stageCleared[currentStage]!=2)//フルクリアでなくてノルマ以上
			{
				stageCleared[currentStage]=1;
				label="@";
			}*/
			/*var E;
			try
			{
				saveFile(filepath+"savedata/"+label+to2Dig(currentStage+1)+"("+stageRawData[currentStage].split(":")[0]+")"+"-"+timestamp()+".txt",
				'{"player-id":"'+playerid+'","hand(s)":"'+lastMove.join("")+'"}');
				alert("保存しました。");
			}
			catch(E)
			{
				alert("保存出来ませんでした。");//エラーチェック
			}
			
			if(currentStage==(stageRawData.length-1)&&!isBossCleared)//ボスをクリアしたら
			{
				alert("おめでとう！最後のステージをクリアした！　＼(・∀・)／\n隠しステージが遊べるようになったよ！\n");
				alert("一度説明に戻って、ゲームを始めると遊べるようになるよ！\n隠しステージには金クリアヒントがないから、自力で頑張ってね！");
			}*/
			showClearedStage();
			pauseMenu(true);
			lastMove=[];
			self.focus();//フォーカスバグ解決
		}
		else//クリア条件を満たしていないとき
		{
			document.inp.und.disabled=false;
			writeDown(lastMove);
		}
	}
	function showClearedStage()
	{
		var clor;
		var staDom;
		for(iii=0;iii<stageCleared.length;iii++)
		{
			clor=colorButton[stageCleared[iii]+""];
			staDom=document.getElementById('sta'+iii);//ステージのDOM
			if(staDom)
			{
				staDom.style.backgroundColor=staDom.style.borderColor=clor;
			}
		}
	}
	function UNDOPOP()
	{
		datArr[pointed()].unshift(datArr.dish[0]);//皿から貰う
		datArr.dish[0]=popKeeper.pop();
		if(datArr.dish[0]===void 0)datArr.dish=[];//undefinedデータの生成防止
		setStack();
	}
	/*dup-bug debug start*/
	function UNDOPUSH()
	{
		datArr.dish[0]=datArr[pointed()].shift();
		setStack();
	}
	function UNDOMOV()
	{
		datArr[pointed()].unshift(datArr[red_is_left?"bl":"rd"].shift());//一つ動かす
		setStack();
	}
	function undo()
	{
		var mv=lastMove.pop();//一個消す
		writeDown(lastMove);//ログ
		switch(mv)
		{
			case 0:UNDOPOP();break;
			case 1:UNDOPUSH();break;//皿からコピー→皿から移動で一手戻る←何を言っているんだお前は
			case 2:recti();break;//入れ替え処理→一手戻る
			case 3:UNDOMOV();break;
		}
		if(lastMove.length==0)document.inp.und.disabled=true;//戻す手がなければdisable
	}
	/*dup-bug debug end*/
	switch(v)
	{
		case 0:if(POP())jigo(0);break;
		case 1:if(PUSH())jigo(1);break;
		case 2:recti();jigo(2);break;
		case 3:if(MOV())jigo(3);break;
		case 4:undo();break;
	}
}
function restart()
{
	if(confirm("このステージを最初からやり直すが、大丈夫か？"))
	{
		document.getElementById('menu').style.display='block';
		createStage(currentStage);
		self.focus();
	}
}