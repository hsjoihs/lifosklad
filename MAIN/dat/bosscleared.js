function bossCleared()
{
	alert("おめでとう！最後のステージをクリアした！　＼(・∀・)／\n裏ステージが遊べるようになったよ！\n");
	document.getElementById("shownew").style.display="block";
	alert("「裏ステージで遊ぶ」を押すと遊べるようになるよ！\n裏ステージには金クリアヒントがないから、自力で頑張ってね！");
}

function showNew()
{
	document.getElementById("shownew").style.display="none";
	makStag();
}