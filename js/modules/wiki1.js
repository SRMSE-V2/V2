if($("#wiki").length===0){
$.ajax({
     		async: true,
                url: "/mediawiki/api.php?action=parse&page="+window.wikiTitle+"&prop=text&section=0&format=json&disablepp&redirects",
                dataType: 'text',
                type: "GET"
            }).done(function(text) {
            function allIndexOf(str, toSearch) {var indices = [];for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {indices.push(pos);}return indices;}
                var js = JSON.parse(text);
               var ht=js["parse"]["text"]["*"].replace(/\n/g,"");//.replace(/width:(.*?);/g,"");
               //.replace(/align="center"/g,"").replace(/text-align:center;/g,"").replace(/class="center";/g,"");
               if(ht.indexOf("infobox")>=0){
               var to=allIndexOf(ht,"</table>");
               var t=to.length;
               var too=allIndexOf(ht,"<table");
               var table_data=ht.substr(0,to[t-1]).replace(/\/mediawiki\/index.php\//g,"http://en.wikipedia.org/wiki/").replace(/<a/g,"<a target=\"_blank\"");
                var table=$(table_data);
                //replacing all File hrefs with img srcs
                var wrap_div=$("<div></div>");//wrapping up all infobox elements in a div
                wrap_div.append(table);
                table=wrap_div;
                $.each(table.find("a"),function(){
                	if($(this).attr("href")&&$(this).attr("href").indexOf("File")>=0){
                	$(this).text("");
                	var img=$("<img>");
                	var fn=$(this).attr("href").split("/");
                	img.attr("src","http://en.wikipedia.org/wiki/en:Special:Filepath/"+fn[fn.length-1].replace("File:","")+"?width=140");
                	$(this).append(img);
                	}
                });
                
                var desc_text=ht.replace(ht.substr(0,to[t-1]),"").replace(/&lt;/g,"<").replace(/&gt;/g,">");
               var split_tag=desc_text.match("</table>\\s*<p>")[0];
                var tables=desc_text.split(split_tag);
                desc_text="<p>"+tables[1].split("</p>")[0].replace("<p>","").replace(/\/mediawiki\/index.php\//g,"http://en.wikipedia.org/wiki/").replace(/<a/g,"<a target=\"_blank\"")
               // console.log(desc_text);
               desc=$("<p></p>").append($(desc_text));//wrap
               var temp=desc.html();
               var count=0;
               var ignore=false;
               var new_html="";
               for(c=0;c<temp.length;c++){
               
               if(temp[c]==="<"){
               ignore=true;
               }
                if(!ignore){count+=1;}new_html+=temp[c];
                if (count>400){var l=new_html.split(" ");
                new_html=l.slice(0,l.length-2).join(" ");new_html+="<b>...</b>";break;}
                if(ignore && temp[c]===">"){ignore=false;}
               
               }
              
               desc=$(new_html);
               table.addClass("wiki_module module");
               table.css({"margin-top":"20px","border":"0px"});
               table.attr("id","wiki");
                $("#wikiMain > div > .search_info").html(desc);
               window.InfoBox=table;
               }
               else{
               var desc_text=$(ht.split("<p>")[1].replace("</p>","").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\/mediawiki\/index.php\//g,"http://en.wikipedia.org/wiki/").replace(/<a/g,"<a target=\"_blank\"").trim());
                desc=$("<p></p>").append($(desc_text));//wrap
               table=$();
                window.InfoBox=table;
                $("#wikiMain > div > .search_info").append(desc);
               }
               $("#wikiMain > div > .search_info>a").on("click",function(e){e.stopPropagation();});
             
            });


}
