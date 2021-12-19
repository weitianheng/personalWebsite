var detailshow = 0;
var offset = 0;
var pwn;
var dialogSchow = 0;
var spalt;
var spalt2;
var s3top = 1;
var topbarH = 60;

var points_g = ["16.5,78.5","0,69","0,22","40,0","80,22","80,69","64.5,78.5"]
var points = $('#loadingBar').attr('points').split(" ");
var numberOfP = $('.pictures').length;
    
var counter = 0;
var counter_p = [0,0,0,0,0,0,0];

//var goodtogo = 0;
var duringTransition = 1;


function iframeSize(){
    //console.log("iframeResize");
    $("#iframe_work").attr("height");
}
function GoInFullscreen(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}
function load(){
    var w = Number($('#iframe_work').css('width').replace("px",""));
    var H = window.innerHeight;
    var minH = $('#iframe_work').attr('data');
  
    if(H-100 < minH){
        $('#iframe_work').attr('height',minH);
    }else{
        $('#iframe_work').attr('height',w*9/16);
    }
    // console.log(w);
    // console.log($('#iframe_work').attr('height'));    
}

function videoLoad(){
    // var o = document.getElementsByTagName("video::-webkit-media-controls");
    // o.style.webkitFilter = 'hue-rotate(-157deg)';
    // //$('video > div').css({'filter':'hue-rotate(-157deg)','-webkit-filter':'hue-rotate(-157deg)'});
    // console.log($('video > div'));
    // console.log(o);
}
function getHfromHex(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16), g = parseInt(result[2], 16), b = parseInt(result[3], 16);
    // console.log("r:"+r);
    // console.log("g:"+g);
    // console.log("b:"+b);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
	var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max){
        case r: h = ( (g - b) / d + (g < b ? 6 : 0) )/6; break;
        case g: h = ( (b - r) / d + 2 )/6; break;
        case b: h = ( (r - g) / d + 4 )/6; break;
    }
			
	return {
        h: (h*360+0.5)|0,
        s: s
    }
}
function showDialog(n){
    if(dialogSchow == 0){
        $('#text-box').css('transform','translate(0px,0px)');
        dialogSchow = 1;
    }
    $("#dialogContent").css('color',dialogColor[n]);
    document.getElementById("dialogContent").innerHTML = dialog[n];

    var dw = Number($('#dialogContent').css('width').replace('px',''))+60;
    var dh = Number($('#dialogContent').css('height').replace('px',''))+40;
    if(dh-40 > 25){
        dw += 20;
        $('#dialogSVG').css('margin-left','-10px');
    }else{
        $('#dialogSVG').css('margin-left','0px');
    }
    //平行四边形
    //$('#dialogBack').attr('points',(dh/4)+",0 0,"+dh+" "+(dw-dh/4)+","+dh+" "+dw+",0");
    //六边形
    $('#dialogBack').attr('points',(dh/4)+",0 0,"+(dh*4/5)+" "+(dh/5)+","+dh+" "+(dw-dh/5)+","+dh+" "+dw+","+(dh/4)+" "+(dw-dh/5)+",0");
    
}
function hideDialog(){
    if(dialogSchow == 1){
        setTimeout(function(){
            if(dialogSchow == 0){
            document.getElementById("dialogContent").innerHTML = "";
            }
        },500);
        
        $('#text-box').css('transform','translate('+ (window.innerWidth*0.6+130) +'px,0px)');
        dialogSchow = 0;
    }
}
function openWork(hh, ani){
    // click, 点击进入 back，后退进入 reload，刷新进入
    // ani 0, no ani; 1, with

    $('#space3').css({'transform':'translate('+(window.innerWidth)+'px)','overflow':'scroll'});
    $('#space3').scrollTop(0);
    
    s3top = 1;
    $('#titel3').css('transform','translate('+(window.innerWidth)+'px)');
    $('.kreuz').css('background-color','#fff');
    $('#tianheng').css('display','none');
    
    // no animation
    if(ani == 0){
        $('#button').css('transition','none');
        $('#space3').css('transition','none');
        $('#space').css('overflow','hidden');
        $('#button').css('transform','translate('+(window.innerWidth-120)+'px) rotate(90deg)');
        $('#button').attr('title','Back to Menu');
        $('#kreuz1').css('transform','translateY(2px) rotate(45deg)');
        $('#kreuz2').css({'transform':'translateY(-5px) rotate(45deg)','height':'20px'});
    }
    
    // animation
    if(ani == 1){
        setTimeout(function(){
            $('#button').css('transform','translate('+(window.innerWidth-120)+'px) rotate(90deg)');
            $('#button').attr('title','Back to Menu');
            $('#kreuz1').css('transform','translateY(2px) rotate(45deg)');
            $('#kreuz2').css({'transform':'translateY(-5px) rotate(45deg)','height':'20px'});
            
        },250);
        setTimeout(function(){
            $('#button').css('transition','none');
            $('#space3').css('transition','none');
            $('#space').css('overflow','hidden');
            // $("#titel").css("background-color","#fff");
        },750);
    }
    
        
    //2 ajax (reload)
    if(hh !== pwn){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("space3").innerHTML = this.responseText; 

                var c = 0;
                var l = $( '.detailimage>img' ).length + $( '.detail>img' ).length;
                console.log(l);
                function zouni(){
                    var imgs = document.getElementsByClassName("detailimage");
                    var a_bili =[];
                    for(var x=0; x<imgs.length; x++){
                        a_bili.push(imgs[x].clientWidth/imgs[x].clientHeight);
                    }
                    var w_max =  a_bili.sort(function(a,b){return b-a})[0];
                    console.log(w_max);
                    $('.detailimage').css('width',function(n){

                        var bili = Number($(this).css('width').replace("px","")) / Number($(this).css('height').replace("px",""));
                        
                        var wd0 = Number($('.detailtext').css('width').replace("px",""));
                        //var wd = Math.floor($('.detailtext').css('width').replace("px","") * Math.sqrt(bili / w_max));
                        //手动调了一个值 2 因为有的宽高比都比较小的作品页 图会太大。。
                        wd = Math.floor($('.detailtext').css('width').replace("px","") * Math.sqrt(bili / 2));
                        if(n/2 !== Math.floor(n/2)){
                            $(this).css('margin-left', 1.25*wd0-wd);
                        }

                        return wd;
                    });
                }
                $( '.detailimage' ).on( "load", function() {
                    c++;
                    if(c == l ){
                        zouni();
                    }
                }); 
                $( '.detailimage>img' ).on( "load", function() {
                    c++;
                    if(c == l ){
                        zouni();
                    }
                });   
            }
        };
        xmlhttp.open("GET", "WorkContent.php?n=" + (Number(hh)+1), true);
        xmlhttp.send();
        var xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("titel3").innerHTML = this.responseText;
                var color = $('#workUnderTitle').attr('data-color');
                $('#logo').attr('fill', color);
                var h_dif = getHfromHex(color).h-217;
                var gg = (getHfromHex(color).s) * 100 / 89;
                //var l = l*100;
                console.log(getHfromHex(color));
                document.getElementById("style").innerHTML = "video::-webkit-media-controls {-webkit-filter: hue-rotate("+h_dif+"deg) saturate("+gg+"); filter: hue-rotate("+h_dif+"deg) saturate("+gg+");}";
            }
        };
        xmlhttp2.open("GET", "WorkTitle.php?n=" + (Number(hh)+1), true);
        xmlhttp2.send();
    }
    //url
    var name = $('#pic'+hh).attr("data_name").replace(/ /g,"_").replace(/ä/g,"ae");
    window.location = "#"+name;
    console.log(window.location.hash);
    console.log(name);

    detailshow = 1;
    offset = window.pageYOffset;  

}
function closeWork(){
    if(detailshow == 1){
        window.location = "#home";
        console.log(window.location.hash);
        setTimeout(function(){
        $('#button').css({'transform':'','top':'50%'});
        $('#button').attr('title','');
        $('#kreuz1').css('transform','');
        $('#kreuz2').css({'transform':'','height':'30px'});
        $('h2').css('display','block');
        },250);
        
        //$(this).removeClass('buttonhover');
        $('#button').css('transition','all .5s');
        $('#space3').css({'transition':'all .5s','transform':'','overflow':'hidden'});
        $('#titel3').css('transform','');
        $('.kreuz').css('background-color','#eee');
        $('#space').css('overflow','visible');
        window.scrollBy(0, offset);
        detailshow = 0;
    };
}



function go(){ 
    
    setTimeout(function(){ $('#hidefirst').css('opacity',1); },300);
    setTimeout(function(){ duringTransition = 0; },600);

    spalt = Math.floor((window.innerWidth-100-200)/200);
    if(window.innerWidth < 500){
        spalt = 1;
    }
    var zuopinshu = $(".pictures").length;
    var galleryHeight = Math.round(2*zuopinshu/(spalt))*200*Math.sqrt(3)+200/Math.sqrt(3);
    var shixian = (window.innerHeight/2 + window.pageYOffset - 166)/(galleryHeight+166)*100;
    var changshu = $('.pictures').attr("data");
    
    var chushi = function(){
        var galleryWidth = $('.gallery').css("width");
        var gW = galleryWidth.slice(0, -2);
        //$('.pictures').css("transform","translate("+(Number(gW)/2-200)+"px,"+240+"px)"); 
        $('.pictures').css("transform","translate("+(Number(gW)/2-changshu)+"px,"+(window.innerHeight/2-166)+"px)");  
    }
    
    var pailie = function(spalt){
        $('.pictures').each(function(i){
            //console.log(i);
            var yushu = (i)-spalt*(Math.floor((i)/spalt));
                    var liecha = 0;
                    var paicha = 0;
                    if(yushu >= Math.round(spalt/2)) {
                    liecha = changshu;
                    paicha = changshu;
                    yushu = yushu - Math.round(spalt/2);
                    }
            $("#shadow"+i).css("transform","matrix(1, 0, 0, 1,"+(yushu*400+Number(liecha))+", "+(Math.floor((i)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")");

            $(this).css("transform","matrix(1, 0, 0, 1,"+(yushu*400+Number(liecha))+", "+(Math.floor((i)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")");
        });
    }

    
    //needs trigger  
        
    $(window).resize(function(){
        spalt = Math.floor((window.innerWidth-100-200)/200);
        if(window.innerWidth < 500){
            spalt = 1;
        }
        $('.gallery').css({"width" : (spalt*200+200)+"px" , "margin-left":(-(spalt*200+200)/2)+"px"});
        if(spalt2 != spalt){
        pailie(spalt);
        galleryHeight = Math.round(zuopinshu/(spalt/2))*200*Math.sqrt(3)+200/Math.sqrt(3);
        $('.gallery').css("height",galleryHeight+166+"px");
        //console.log(spalt);
        }
        spalt2 = spalt;
        if(detailshow == 1){
            $('#button').css('transform','translate('+(window.innerWidth-120)+'px) rotate(90deg)');
            $('#space3').css('transform','translate('+(window.innerWidth)+'px)');
            $("#titel3").css('transform','translate('+(window.innerWidth)+'px)');
        };
        $('#playbutton').css("top", (window.innerWidth*540/960/5*4)+"px");
        $('.iframes').attr('height',(window.innerWidth*540/960)+"px");
        });
    $(window).scroll(function(){  
        var shixian = (window.innerHeight/2 + window.pageYOffset - 166)/(galleryHeight+166)*100;
        $(".gallery").css("perspective-origin", "50% "+shixian+"%"); 
    });
    
    $('#space3').scroll(function(){
        if(this.scrollTop <= 100-topbarH){
            $('#titel3').css({'height':100-this.scrollTop,'box-shadow':'none'});
            $('#button').css('top',(100-this.scrollTop)/2);
            $('#workUnderTitle').css('display','inline');
            s3top = 1;
        }else if(this.scrollTop > 100-topbarH && s3top == 1){   
            $('#titel3').css({'height':topbarH,'box-shadow':'0px 0px 4px grey'});
            // $('.kreuz').css('background-color','rgb(159, 160, 104)');
            // $('#logo').attr('fill','#fff');
            $('#button').css('top',topbarH/2);
            $('#workUnderTitle').css('display','none');
            s3top = 0;
        }
    });
    $('#svg').mouseenter(function() {
    $('.shanshuo').attr('stroke','#eee');
    $(this).click(function(){
    $('#emailme').click();
    });
    $(this).mouseleave(function() {
    $('.shanshuo').attr('stroke','#000');
    });
    });
    
    
    $('#button').click(function(){
        closeWork();
    });


    $('#video').click(function(){
    document.getElementById('video').play();
    
    });
    $(".hex").mouseenter(function() {
        if(duringTransition == 0){
            $('.shadows').css("opacity","1");
            //var dd = $(this).attr("id");
            var dd = $(this).attr("id").substr(3);
            //console.log(dd);
            var yushu = (dd)-spalt*(Math.floor((dd)/spalt));
            var liecha = 0;
            var paicha = 0;
            if(yushu >= Math.round(spalt/2)) {
            liecha = 200;
            paicha = 200;
            yushu = yushu - Math.round(spalt/2);
            }
            $("#pic"+dd).css({'z-index':'0',"transform":"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+", 4, 1)","transition":"transform 0.5s"});

            $("#shadow"+dd).css({"filter": "blur(10px)", 'z-index':'0',"transition": "filter 0.5s"});
            
            showDialog(dd);
            //console.log($("#set"+dd).attr("stdDeviation"));
                
            $(this).mousedown(function() {
                $("#pic"+dd).css({"transform":"matrix(1, 0, 0, 1,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")",'z-index':'-1',"transition": "all 0.5s"});
                $( this ).find( "polygon" ).attr("filter","none");
                $("#shadow"+dd).css({"filter": "blur(0px)", 'z-index':'-2',"transition": "all 0.5s"});
                $(this).mouseup(function() {
                $("#pic"+dd).css({"transform":"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+", 4, 1)",'z-index':'0'});
                });
            });
            $(this).click(function() {
                openWork(dd, 1);
                console.log("pwn"+pwn)

                pwn = dd;
            });
            $(this).mouseleave(function() {
                $("#pic"+dd).css({"transform":"matrix(1, 0, 0, 1,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")",'z-index':'-1',"transition": "all 0.5s"});
                $("#shadow"+dd).css({"filter": "blur(0px)", 'z-index':'-2',"transition": "all 0.5s"});
                hideDialog();
            });
        }
    });

    //backbutton of browser
    window.onhashchange = function(){
        if(window.location.hash && window.location.hash !== "#home"){
            var hash = window.location.hash.replace("#","").replace("_"," ").replace("ae","ä");
            for(var i=0; i<$('.pictures').length; i++){
                if($('#pic'+i).attr('data_name') == hash){
                    openWork(i, 1);
                }
            }
        }else{
            closeWork();
        }
    }
    


    // execute directly

    $('.gallery').css({"width" : (spalt*200+200)+"px" , "margin-left":(-(spalt*200+200)/2)+"px"});
    $('.gallery').css("height",galleryHeight+166+"px");
    $(".gallery").css("perspective-origin", "50% "+shixian+"%"); 
    // $('#playbutton').css("top", (window.innerWidth*540/960/5*4)+"px");
    chushi();
    console.log("start");
    setTimeout(
        function(){
            pailie(spalt);
            $('.pictures').css({"opacity":"1", "transition":"all 0.5s"});
            
        }
    ,0);

    if(window.location.hash && window.location.hash !== "#home"){
        var hash = window.location.hash.replace("#","").replace(/_/g," ").replace(/ae/g,"ä");
        for(var i=0; i<$('.pictures').length; i++){
            if($('#pic'+i).attr('data_name') == hash){
                openWork(i, 0);
            }
        }
    }
    
};


//只是不停循环
var step_n = 5;
var toggle_jj = true;
var toggle_fx = true;
var twice = 0;
var LA = setInterval(function(){
    var points_str = "";
    var c = 0;
    if(toggle_fx){
        var ZC = Math.floor(counter/step_n);
        var YS = counter - ZC*step_n;
        if(toggle_jj){ 
            for(var y = 0; y < ZC; y++){       
                counter_p[y] = step_n;
            }
            if(YS != 0){
                counter_p[ZC] = YS;
            }   
        }else{
            for(var x = 0; x < ZC; x++){
                counter_p[x] = 0;
            }
            if(YS != 0){
                counter_p[ZC] = step_n-YS;
            }
        }
        counter++;
        if(counter == step_n*counter_p.length){
            twice++;
        }
        if(twice < 2){
            if(counter > step_n*counter_p.length){
                toggle_jj = !toggle_jj;
                counter = 0;
            }   
        }
        
    }else{
        var ZC = Math.ceil(counter/step_n);
        var YS = ZC*step_n - counter;
        if(toggle_jj){ 
            for(var y = counter_p.length-1; y > ZC-1; y--){   
                counter_p[y] = step_n;
            }
            if(YS != 0){
                counter_p[ZC-1] = YS;
            }   
        }else{
            for(var x = counter_p.length-1; x > ZC-1; x--){
                counter_p[x] = 0;
            }
            if(YS != 0){
                counter_p[ZC-1] = step_n-YS;
            }
        }
        counter--;
        if(counter == 0){
            twice++;
        }
        if(twice < 2){
            if(counter < 0){
                toggle_jj = !toggle_jj;
                counter = step_n*counter_p.length;
            } 
        }
        
    }
    if(twice == 2){
        toggle_jj = !toggle_jj;
        toggle_fx=!toggle_fx;
        twice = 0;
    }
    
    
    console.log(ZC);
    console.log(counter_p);
    points.forEach(function(it, i){      
        
        if(i>0 && i<8){
            points_str += counter_p[c]/step_n*(Number(points_g[c].split(",")[0])-Number(points[i].split(",")[0]))+Number(points[i].split(",")[0]);
            points_str += ",";
            points_str += counter_p[c]/step_n*(Number(points_g[c].split(",")[1])-Number(points[i].split(",")[1]))+Number(points[i].split(",")[1]);
            c++;  
        }else{
            points_str += it;
        }
        points_str += " ";
    });
    console.log(points_str);
    $('#loadingBar').attr('points',points_str);

    

},20);

setTimeout(function(){
    clearTimeout(LA);
},10000);

// window.onload = function(){
//     $('#loading').css('display','none');
//     go();
// };



