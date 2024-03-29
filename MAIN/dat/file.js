﻿function openFile(path){
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	if(fso.FileExists(path)){
		var stream=fso.OpenTextFile(path);
		var result=stream.ReadAll();
		stream.Close();
		return result;
	}else{return null;}
}

function makeFolder(str)
{
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	try{fso.CreateFolder(str);}catch(e){/*already made*/}
	return true;
}

function renameDir(src,dst)
{
	var fso=new ActiveXObject("Scripting.FileSystemObject");;
	try{fso.MoveFolder(src,dst);}catch(e){return false};
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
	catch(E){return null;}
}

function renameFolder(str,newS)
{
	var fso=new ActiveXObject("Scripting.FileSystemObject");
	try
	{
		fso.MoveFolder(str,newS);
		return true;
	}
	catch(e){alert(e.message);return null;}
}

function getDir(path)
{
	try
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
	}catch(e){return null}
}


function saveFile(path,text){
	try
	{
		var fso=new ActiveXObject("Scripting.FileSystemObject");
		var stream=fso.CreateTextFile(path);
		stream.Write(text);
		stream.Close();
		return true;
	}catch(e){return null;}
}

function appendFile(path,txt)
{
	var cont = openFile(path);
	if(cont===null)return null;
	return saveFile(path,cont+txt);
}


function dir(noslash){
	var ans = filepath+"savedata/";
	if(getUserName()==null) // anonymous
	{
		return ans+getPlayId()+(noslash?"":"/");
	}
	else
	{
		var txt = getUserName().toLowerCase();
		var tmp=[];
		for(var i=0,n=txt.length;i<n;i++)
		{
			tmp[tmp.length]=txt.charCodeAt(i).toString(36);
		}
		return ans+tmp.join("-")+(noslash?"":"/");
	}
}