var reMake=false;
function explain(page)//ゲーム起動時の説明をする
{
	function samp(dd,redleft)
	{
		dd=dd.split(",");
		var Q=[dd[0].split(""),dd[1].split("")];
		var tmp='&nbsp;<span class="waku" style="width:420px;">\
		<div class="stac st1" style="left:10px;border-color:'+(redleft?'red':'blue')+';">';
		for(var i in Q[0]){tmp+='<div class="koo">'+Q[0][i]+'</div>'}
		tmp+='</div><div class="stac st2" style="left:160px;border-color:'+(redleft?'blue':'red')+';">';
		for(var i in Q[1]){tmp+='<div class="koo">'+Q[1][i]+'</div>'}
		tmp+='</div>\
	<div class="dish" style="left:310px;">'+(dd[2]?('<div class="koo">'+dd[2]+'</div>'):'')+'</div>\
	<div class="arrow" style="left:47px;"></div>\
</span>&nbsp;';return tmp;
	}
	var dat=[
	'\
	<br><div style="text-align:center;align:center"><span class="koo" style="font-size:100px"\
	onclick="alert(\'「リフォスクラッド」と読みます。\')">LIFOSKLAD</span></div>\
	<div style="text-align:center;align:center;font-size:50px"><br><br><br>\
	<span style="border:5px solid red;border-top:none;"><span class="koo" style="cursor:pointer" onclick="javascript:explain(-1)">遊ぶ</span></span>&nbsp;\
	<span style="border:5px solid blue;border-top:none"><span class="koo" style="cursor:pointer" onclick="javascript:explain(1)">説明</span></span></div>\
	',
	'\
	<h2>ゲームの説明</h2><span style="border:1px solid green"><img src="dat/disp.png"/></span><br>\
	↑こんな感じの画面が出てくるから4種類の操作をして、\
	<strong style="color:red">赤スタック</strong>に上から「<strong>STACK</strong>」と並べて、ステージをクリアしていくゲームだよ。<br>\
	<font size=1><a href="javascript:explain(-1)">これ以降の説明を飛ばしてゲームを始める</a></font><br>\
	','\
	<h2>スタックと皿</h2>'+samp(',,',true)+'\
	<h3>スタック</h3>\
	<span style="color:red">赤スタック</span>と<span style="color:blue">青スタック</span>の二つがあるよ。スタックには5つまでcookieを入れられるよ。上から入れて上から取り出せるよ。<br><br>\
	<h3>皿</h3>皿にはcookieは1つしか入れられないよ。上にcookieが乗ると下のcookieは消えちゃうよ。<br>\
	4種類の操作があるから、それらの操作を組み合わせて、できるだけ短い手順でミッションがクリアできるように頑張ってね！<br>\
	','\
	<h2>ステージクリア</h2><strong style="color:red">赤スタック</strong>にcookieを上から「<strong>STACK</strong>」と並べればミッションクリアだよ。<br>\
	ミッションをクリアするとこんなふうに↓<br>&nbsp;<img class="expl" src="dat/cleared.png"/><br><br>\
	&nbsp;<span class="expl"><img src="dat/alert.png"/>○○手でミッションクリア</span> と表示されるよ。\
	クリア目指して頑張ってね。<br>\
	','\
	<h2>操作</h2>操作には4種類あるよ。<br>\
	説明するより、遊んでみた方が分かりやすいっていう人は<a href="javascript:explain('+(page+5)+')">操作の説明を飛ばす</a>のもOKだよ。<br>\
	最初の方のステージには説明が書いてあるから安心してね。\
	','\
	<h2>操作1:皿へ移動</h2>この操作を使うと、矢印が指しているcookieを1つ、皿に移動できるよ。<br>\
	あと、皿には1つしかcookieを置けないから、この操作を使うと、もともと皿の上にあったcookieは消えちゃうよ。気をつけてね。<br>\
	間違って消しちゃったときは、「一手戻す」で戻せるよ。<br>'+samp('ASTCK,,',true)+'<img src="dat/arrow2.png"/>'+samp('STCK,,A',true)+'\
	','\
	<h2>操作2:皿からコピー</h2>この操作を使うと、皿の上にあるcookieを矢印が指しているところにコピーできるよ。<br>\
	cookieは上からしか入れられないから注意してね。\
	皿に何も置いていないときには操作できないから気をつけてね。<br>\
	この操作を使っても、もともと皿の上にあったcookieは消えないよ。<br>\
	'+samp('ACK,S,T',true)+'<img src="dat/arrow2.png"/>'+samp('TACK,S,T',true)+'\
	','\
	<h2>操作3:スタックを入れ替える</h2>この操作を使うと、赤と青のスタックの場所を入れ替えることができるよ。<br>\
	矢印が指すスタックを変えるときに使ってね。<br>\
	'+samp('TACK,,S',true)+'<img src="dat/arrow3.png"/>'+samp(',TACK,S',false)+'\
	','\
	<h2>操作4:もう一つのスタックに移動</h2>この操作を使うと、矢印が指しているcookieを左のスタックから右のスタックの上に移動できるよ。<br>\
	右から左のスタックにcookieを動かしたいときには、スタックを入れ替える必要があるよ。<br>\
	cookieを避難させたい時とかに使ってね。<br>\
	'+samp('TACK,,S',true)+'<img src="dat/arrow2.png"/>'+samp('ACK,T,S',true)+'\
	','\
	<h2>作者記録</h2>\
	このゲームの作者のCHAtsFtDがこのステージを何手でクリア出来たかが書いてあるよ。<font size=1>(大体IceSlimeとかLitverigとかが出した記録なんだけど)</font><br>\
	作者より手数が多ければ<span style="background-color:#7fffd4;border:1px outset #f0f0f0;">アクアマリン</span>で、<br>\
	作者と手数が同じなら<span style="background-color:#ffd700;border:1px outset #f0f0f0;">金色</span>で、<br>\
	作者より手数が少なければ<span style="background-color:#ff00ff;border:1px outset #f0f0f0;">マゼンダ</span>で<br>\
	ステージ名が表示されるよ。<br><br>\
	アクアマリンのステージを開くと、金クリアのためのヒントが出てくるよ。\
	全ステージ金クリア目指して、頑張ってね。\
	','\
	<h2>その他説明</h2>\
	<h3>一手戻す</h3>この操作を使うと、一手やり直すことができるよ。<br>\
	操作を間違えた時に使ってね。<br>\
	<h3>ステージをやり直す</h3>この操作を使うと、このステージを最初からやり直せるよ。<br>\
	やり直したい時に使ってね。<br>\
	<h3>ステージ選択に戻る</h3>この操作を使うと、遊ぶステージを変えられるよ。<br>\
	別のステージで遊びたい時に使ってね。<br>\
	'];
	var mnu=document.getElementById('menu');
	if(dat[page])
	{
		mnu.innerHTML=dat[page].replace(/cookie/g,"チョコクッキー")+
		(
			dat[page+1]?"<br>":"<br>これで説明は終わりだよ。ルールは分かったかな?　<b>じゃあ、ゲームを始めよう!</b>　( ・∀・)ノ<br>"
		)+
		(
			page?
			(
				"<a href='javascript:explain("+(page-1)+");'>前のページヘ</a> "+
				"<a href='javascript:explain("+(page+1)+");'>"+(dat[page+1]?"次のページヘ":"ゲーム開始")+"</a>"
			):""
		);
	}
	else
	{
		mnu.innerHTML="";//説明を空にする
		createStageMenu();//レベル選択画面
	}
}
function toTutor()
{
	reMake=true;
	explain(1);
}
function toTitle()
{
	reMake=true;
	explain(0);
}