function bossCleared()
{
	alert("おめでとう！最後のステージをクリアした！　＼(・∀・)／\n隠しステージが遊べるようになったよ！\n");
	document.getElementById("shownew").style.display="block";
	alert("「裏ステージで遊ぶ」を押すと遊べるようになるよ！\n隠しステージには金クリアヒントがないから、自力で頑張ってね！");
}

function showNew()
{
	document.getElementById("shownew").style.display="none";
	explain(-1);
}