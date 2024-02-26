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
	fso.CreateFolder(str);
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