﻿var stageRawData=[];/*future extension*/
var stageTagList=[];
var goldHint=[];
;(function(){

	for(i=0;i<stageRawDataNew.length;i++)
	{
		stageRawData[i]=stageRawDataNew[i].split(";")[0];
		stageTagList[i]=stageRawDataNew[i].split(";")[1];
		goldHint[i]=stageRawDataNew[i].split(";")[2];
	}

})();
