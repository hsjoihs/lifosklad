function timestamp(noRandom)
{
	var d=new Date();
	return(d.getUTCFullYear()+"-"+to2Dig(d.getUTCMonth()+1)+"-"+to2Dig(d.getUTCDate())+"&"+to2Dig(d.getUTCHours())+"-"+to2Dig(d.getUTCMinutes())+"-"+to2Dig(d.getUTCSeconds())+"."+d.getUTCMilliseconds()+"--"+(d-0)+(noRandom?"":("---"+(Math.random()+"").slice(2))))
}
function to2Dig(dat){return(dat+100+"").slice(1);}