(function(q,F){var u="undefined"!=typeof module;u&&(q=global,q.JS_MD5_TEST&&(q.navigator={userAgent:"Firefox"}));var C=(q.JS_MD5_TEST||!u)&&-1!=navigator.userAgent.indexOf("Firefox"),y=!q.JS_MD5_TEST&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),D=[128,32768,8388608,-2147483648],t=[0,8,16,24],e=[],r;if(y){var A=new ArrayBuffer(68);r=new Uint8Array(A);e=new Uint32Array(A)}var x=function(g){var q="string"!=typeof g;q&&g.constructor==ArrayBuffer&&(g=new Uint8Array(g));var k,l,m,n,b,
a,d,c,h,u=!0,x=!1,p=0,v=0,z=0,w=g.length;e[16]=0;do{e[0]=e[16];e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0;if(q)if(y)for(a=v;p<w&&64>a;++p)r[a++]=g[p];else for(a=v;p<w&&64>a;++p)e[a>>2]|=g[p]<<t[a++&3];else if(y)for(a=v;p<w&&64>a;++p)b=g.charCodeAt(p),128>b?r[a++]=b:(2048>b?r[a++]=192|b>>6:(55296>b||57344<=b?r[a++]=224|b>>12:(b=65536+((b&1023)<<10|g.charCodeAt(++p)&1023),r[a++]=240|b>>18,r[a++]=128|b>>12&63),r[a++]=128|b>>6&63),r[a++]=128|b&63);else for(a=
v;p<w&&64>a;++p)b=g.charCodeAt(p),128>b?e[a>>2]|=b<<t[a++&3]:(2048>b?e[a>>2]|=(192|b>>6)<<t[a++&3]:(55296>b||57344<=b?e[a>>2]|=(224|b>>12)<<t[a++&3]:(b=65536+((b&1023)<<10|g.charCodeAt(++p)&1023),e[a>>2]|=(240|b>>18)<<t[a++&3],e[a>>2]|=(128|b>>12&63)<<t[a++&3]),e[a>>2]|=(128|b>>6&63)<<t[a++&3]),e[a>>2]|=(128|b&63)<<t[a++&3]);z+=a-v;v=a-64;p==w&&(e[a>>2]|=D[a&3],++p);p>w&&56>a&&(e[14]=z<<3,x=!0);u?(b=e[0]-680876937,b=(b<<7|b>>>25)-271733879<<0,c=(-1732584194^b&2004318071)+e[1]-117830708,c=(c<<12|c>>>
20)+b<<0,d=(-271733879^c&(b^-271733879))+e[2]-1126478375,d=(d<<17|d>>>15)+c<<0,a=(b^d&(c^b))+e[3]-1316259209):(b=k,a=l,d=m,c=n,b+=(c^a&(d^c))+e[0]-680876936,b=(b<<7|b>>>25)+a<<0,c+=(d^b&(a^d))+e[1]-389564586,c=(c<<12|c>>>20)+b<<0,d+=(a^c&(b^a))+e[2]+606105819,d=(d<<17|d>>>15)+c<<0,a+=(b^d&(c^b))+e[3]-1044525330);a=(a<<22|a>>>10)+d<<0;b+=(c^a&(d^c))+e[4]-176418897;b=(b<<7|b>>>25)+a<<0;c+=(d^b&(a^d))+e[5]+1200080426;c=(c<<12|c>>>20)+b<<0;d+=(a^c&(b^a))+e[6]-1473231341;d=(d<<17|d>>>15)+c<<0;a+=(b^d&
(c^b))+e[7]-45705983;a=(a<<22|a>>>10)+d<<0;b+=(c^a&(d^c))+e[8]+1770035416;b=(b<<7|b>>>25)+a<<0;c+=(d^b&(a^d))+e[9]-1958414417;c=(c<<12|c>>>20)+b<<0;d+=(a^c&(b^a))+e[10]-42063;d=(d<<17|d>>>15)+c<<0;a+=(b^d&(c^b))+e[11]-1990404162;a=(a<<22|a>>>10)+d<<0;b+=(c^a&(d^c))+e[12]+1804603682;b=(b<<7|b>>>25)+a<<0;c+=(d^b&(a^d))+e[13]-40341101;c=(c<<12|c>>>20)+b<<0;d+=(a^c&(b^a))+e[14]-1502002290;d=(d<<17|d>>>15)+c<<0;a+=(b^d&(c^b))+e[15]+1236535329;a=(a<<22|a>>>10)+d<<0;b+=(d^c&(a^d))+e[1]-165796510;b=(b<<5|
b>>>27)+a<<0;c+=(a^d&(b^a))+e[6]-1069501632;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[11]+643717713;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[0]-373897302;a=(a<<20|a>>>12)+d<<0;b+=(d^c&(a^d))+e[5]-701558691;b=(b<<5|b>>>27)+a<<0;c+=(a^d&(b^a))+e[10]+38016083;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[15]-660478335;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[4]-405537848;a=(a<<20|a>>>12)+d<<0;b+=(d^c&(a^d))+e[9]+568446438;b=(b<<5|b>>>27)+a<<0;c+=(a^d&(b^a))+e[14]-1019803690;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[3]-
187363961;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[8]+1163531501;a=(a<<20|a>>>12)+d<<0;b+=(d^c&(a^d))+e[13]-1444681467;b=(b<<5|b>>>27)+a<<0;c+=(a^d&(b^a))+e[2]-51403784;c=(c<<9|c>>>23)+b<<0;d+=(b^a&(c^b))+e[7]+1735328473;d=(d<<14|d>>>18)+c<<0;a+=(c^b&(d^c))+e[12]-1926607734;a=(a<<20|a>>>12)+d<<0;h=a^d;b+=(h^c)+e[5]-378558;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[8]-2022574463;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[11]+1839030562;d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[14]-35309556;a=(a<<23|a>>>9)+d<<0;h=a^d;b+=(h^
c)+e[1]-1530992060;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[4]+1272893353;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[7]-155497632;d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[10]-1094730640;a=(a<<23|a>>>9)+d<<0;h=a^d;b+=(h^c)+e[13]+681279174;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[0]-358537222;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[3]-722521979;d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[6]+76029189;a=(a<<23|a>>>9)+d<<0;h=a^d;b+=(h^c)+e[9]-640364487;b=(b<<4|b>>>28)+a<<0;c+=(h^b)+e[12]-421815835;c=(c<<11|c>>>21)+b<<0;h=c^b;d+=(h^a)+e[15]+530742520;
d=(d<<16|d>>>16)+c<<0;a+=(h^d)+e[2]-995338651;a=(a<<23|a>>>9)+d<<0;b+=(d^(a|~c))+e[0]-198630844;b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[7]+1126891415;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[14]-1416354905;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[5]-57434055;a=(a<<21|a>>>11)+d<<0;b+=(d^(a|~c))+e[12]+1700485571;b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[3]-1894986606;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[10]-1051523;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[1]-2054922799;a=(a<<21|a>>>11)+d<<0;b+=(d^(a|~c))+e[8]+1873313359;
b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[15]-30611744;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[6]-1560198380;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[13]+1309151649;a=(a<<21|a>>>11)+d<<0;b+=(d^(a|~c))+e[4]-145523070;b=(b<<6|b>>>26)+a<<0;c+=(a^(b|~d))+e[11]-1120210379;c=(c<<10|c>>>22)+b<<0;d+=(b^(c|~a))+e[2]+718787259;d=(d<<15|d>>>17)+c<<0;a+=(c^(d|~b))+e[9]-343485551;a=(a<<21|a>>>11)+d<<0;u?(k=b+1732584193<<0,l=a-271733879<<0,m=d-1732584194<<0,n=c+271733878<<0,u=!1):(k=k+b<<0,l=l+a<<0,m=m+d<<0,n=n+c<<0)}while(!x);
return C?(g=f[k>>4&15]+f[k&15],g+=f[k>>12&15]+f[k>>8&15],g+=f[k>>20&15]+f[k>>16&15],g+=f[k>>28&15]+f[k>>24&15],g+=f[l>>4&15]+f[l&15],g+=f[l>>12&15]+f[l>>8&15],g+=f[l>>20&15]+f[l>>16&15],g+=f[l>>28&15]+f[l>>24&15],g+=f[m>>4&15]+f[m&15],g+=f[m>>12&15]+f[m>>8&15],g+=f[m>>20&15]+f[m>>16&15],g+=f[m>>28&15]+f[m>>24&15],g+=f[n>>4&15]+f[n&15],g+=f[n>>12&15]+f[n>>8&15],g+=f[n>>20&15]+f[n>>16&15],g+=f[n>>28&15]+f[n>>24&15]):f[k>>4&15]+f[k&15]+f[k>>12&15]+f[k>>8&15]+f[k>>20&15]+f[k>>16&15]+f[k>>28&15]+f[k>>
24&15]+f[l>>4&15]+f[l&15]+f[l>>12&15]+f[l>>8&15]+f[l>>20&15]+f[l>>16&15]+f[l>>28&15]+f[l>>24&15]+f[m>>4&15]+f[m&15]+f[m>>12&15]+f[m>>8&15]+f[m>>20&15]+f[m>>16&15]+f[m>>28&15]+f[m>>24&15]+f[n>>4&15]+f[n&15]+f[n>>12&15]+f[n>>8&15]+f[n>>20&15]+f[n>>16&15]+f[n>>28&15]+f[n>>24&15]};if(!q.JS_MD5_TEST&&u){var B=require("crypto"),E=require("buffer").Buffer;module.exports=function(e){if("string"==typeof e)return 80>=e.length||183>=e.length&&!/[^\x00-\x7F]/.test(e)?x(e):B.createHash("md5").update(e,"utf8").digest("hex");
e.constructor==ArrayBuffer&&(e=new Uint8Array(e));return 370>=e.length?x(e):B.createHash("md5").update(new E(e)).digest("hex")}}else q&&(q.md5=x)})(this);

var wiki=$("<div class=\"well alpha-blur alpha-shadow\" style=\"margin-top:20px;border:0px;\" id=\"wiki\"><div class=\"panel panel-primary\" style=\"margin-bottom:0px;\">       <div class=\"panel-heading\" style=\"background-color:#00B4FF;\"> <h3 class=\"panel-title\" id=\"name\" style=\"text-align: center;\"> </h3></div> <div class=\"panel-body\" style=\"color:#474747;\">  <div class=\"row\">   <div class=\"col-lg-12 col-md-12 col-sm-4 col-xs-4\"><a href=\"#\" class=\"thumbnail\">      <img id=\"info_pic\" src=\"\" alt=\"...\">  </a></div>  <div class=\"col-lg-12 col-md-12 col-sm-8 col-xs-8\"> <table class=\"wiki_table\"></table> </div>   </div>   </div>  </div>");
$("#smart_col").html("").append(wiki);
$("#smart_answer").addClass("hide");
var dic=window.val["infobox"];

if(dic["image"]){
var s="image";
}
else if(dic["logo"]){
s="logo";
}
$("#name").text(dic["name"]["text"]);
delete dic["name"];
$.each(dic,function(k,v){
 if(k.indexOf(s)<0){
		$(".wiki_table").append("<tr style=\"padding-top:15px;\"> <td><b>"+k.replace(/_/g,' ').capitalizeMe()+"</b>: "+v["text"]+"</br> </td> </tr> ");
}
else{
var d=md5(dic[s]["text"].replace("File:","").replace(/ /g,"_"));

$("#info_pic").attr("src","http://upload.wikimedia.org/wikipedia/commons/"+d[0]+"/"+d.substr(0,2)+"/"+dic[s]["text"].replace("File:","").replace(/ /g,"_"));
 $("#info_pic").on("error",function(){
        $("#info_pic").attr("src","http://upload.wikimedia.org/wikipedia/en/"+d[0]+"/"+d.substr(0,2)+"/"+dic[s]["text"].replace("File:","").replace(/ /g,"_"));
         $("#info_pic").off("error");
    });


}
	
});
$("#name").text(window.val["wiki"]["infobox"]["name"]["text"]);
$("#one").text(window.val["wiki"]["infobox"]["website"]["text"]);
$("#two").text(window.val["wiki"]["infobox"]["caption"]["text"]);
$("#three").text(window.val["wiki"]["infobox"]["birth_place"]["text"]);
$("#smart_col").removeClass("hide");


