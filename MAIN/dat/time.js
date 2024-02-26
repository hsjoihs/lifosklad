if (!window.JSON) {
  window.JSON = {
    parse: function (sJSON) { return eval("(" + sJSON + ")"); },
    stringify: function (vContent) {
      if (vContent instanceof Object) {
        var sOutput = "";
        if (vContent.constructor === Array) {
          for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
          return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
        }
        if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
        for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ","; }
        return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
      }
      return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
    }
  };
}


function timestamp(noRandom)
{
	var d=new Date();
	return(d.getUTCFullYear()+"-"+to2Dig(d.getUTCMonth()+1)+"-"+to2Dig(d.getUTCDate())+"&"+to2Dig(d.getUTCHours())+"-"+to2Dig(d.getUTCMinutes())+"-"+to2Dig(d.getUTCSeconds())+"."+d.getUTCMilliseconds()+"--"+(d-0)+(noRandom?"":("---"+(Math.random()+"").slice(2))))
}
function to2Dig(dat){return(dat+100+"").slice(1);}

/* 
label+to2Dig(currentStage+1)+"("+stageRawData[currentStage].split(":")[0]+")"+"-"+timestamp()+".txt"
*/
/* =01(TACK,,S)-2014-02-24&01-30-31.188--1393205431188---7530192462763088.txt */
function readFileName(txt)
{
	var obj={};
	obj.label=txt.charAt(0);
	obj.stage=("1"+txt.charAt(1)+txt.charAt(2))-100;
	txt=txt.slice(txt.indexOf("-")+1); // 2014-02-24&01-30-31.188--1393205431188---7530192462763088.txt
	obj.dat=txt.split("&")[0].replace(/-/g,"/");
	obj.tim=txt.split("&")[1].split(".")[0].replace(/-/g,":");//01:30:31
	return JSON.stringify(obj);
}

