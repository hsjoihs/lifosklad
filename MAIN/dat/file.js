function openFile(path){
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	if(fso.FileExists(path)){
		var stream=fso.OpenTextFile(path);
		var result=stream.ReadAll();
		stream.Close();
		return result;
	}else{return null;}
}

function saveFile(path,text){
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	var stream=fso.CreateTextFile(path);
	stream.Write(text);
	stream.Close();
	return true;
}

function makeFolder(str)
{
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	try{fso.CreateFolder(str);}catch(e){}
	return true;
}

function deleteFile(str)
{
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	try
	{
		fso.DeleteFile(str);
		return true;
	}
	catch(E){return false;}
}

function getDir(path)
{
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	var fldr=fso.getFolder(path);
	var files=new Enumerator(fldr.Files);
	var stream;
	var ans=[];
	while(!files.atEnd())
	{
		ans[ans.length]=files.item()+"";
		files.moveNext();
	}
	return ans;	
}





function esc(txt){
	txt=txt.toLowerCase();
	var tmp=[];
	for(var i=0,n=txt.length;i<n;i++)
	{
		tmp[tmp.length]=txt.charCodeAt(i).toString(36)
	}
	return tmp.join("-")+"/"
}

function dec(txt){
	var tmp=txt.split("-");
	var ans="";
	for(var i=0,n=tmp.length;i<n;i++)
	{
		ans+=String.fromCharCode(parseInt(tmp[i],36));
	}
	return ans;
}