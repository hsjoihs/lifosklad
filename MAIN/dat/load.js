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
		tmp+="<a class='button' style='background-color:"+colorButton[label]+"' href='javascript:loadWith(\""+pth+"\")'>"+stageNum(pthInfo.stage-1)+"</a> "+pthInfo.dat+" "+pthInfo.tim+"<br>"
	}
	document.getElementById("loadfile").innerHTML=tmp;
}

function loadWith(pth)
{
	alert(pth);
	//alert();
}