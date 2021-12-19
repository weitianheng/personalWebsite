var suoyouzp = ["gdpr","waehrung","chameleon","dreieck","dropbox","seeu","termostat","verdant","mechantronik"];

window.onload = function(){


co = 100;
console.log('load');
// setTimeout(function(){
// $('#jindukuang').fadeOut(100);    
// },400);
// setTimeout(function(){
//  $('#kaichang').css('display','block');
//  document.getElementById('kaichang').play();
// },1000);
var spalt;
var spalt2;
spalt = Math.floor((window.innerWidth-100-200)/200);
if(window.innerWidth < 500){
    spalt = 1;
}
$('.gallery').css({"width" : (spalt*200+200)+"px" , "margin-left":(-(spalt*200+200)/2)+"px"});
var galleryHeight = Math.round(zuopinshu/(spalt/2))*200*Math.sqrt(3)+200/Math.sqrt(3);
$('.gallery').css("height",galleryHeight+166+"px");

var shixian = (window.innerHeight/2 + window.pageYOffset - 166)/(galleryHeight+166)*100;
$(".gallery").css("perspective-origin", "50% "+shixian+"%"); 
$('#playbutton').css("top", (window.innerWidth*540/960/5*4)+"px");
$('.iframes').attr('height',(window.innerWidth*540/960)+"px");

var changshu = $('.pictures').attr("data");
var chushi = function(){
   var galleryWidth = $('.gallery').css("width");
   var gW = galleryWidth.slice(0, -2);
   //$('.pictures').css("transform","translate("+(Number(gW)/2-200)+"px,"+240+"px)"); 
    $('.pictures').css("transform","translate("+(Number(gW)/2-changshu)+"px,"+(window.innerHeight/2-166)+"px)");  
}
chushi();

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
        $(this).css("transform","matrix(1, 0, 0, 1,"+(yushu*400+Number(liecha))+", "+(Math.floor((i)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")");
    });
}

console.log("start");
setTimeout(
    function(){
        pailie(spalt);
        $('.pictures').css({"opacity":"1", "transition":"all 0.5s"});
    
    }
,0);
        
       
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
console.log(spalt);
}
spalt2 = spalt;
if(buttonclick == 1){
    $('#button').css('transform','translate('+(window.innerWidth-120)+'px) rotate(90deg)');
    $('#space3').css('transform','translate('+(window.innerWidth)+'px)');
};
$('#playbutton').css("top", (window.innerWidth*540/960/5*4)+"px");
$('.iframes').attr('height',(window.innerWidth*540/960)+"px");
});
$(window).scroll(function(){  
	var shixian = (window.innerHeight/2 + window.pageYOffset - 166)/(galleryHeight+166)*100;
	$(".gallery").css("perspective-origin", "50% "+shixian+"%"); 
});
$('#space3').scroll(function(){
    if(this.scrollTop == window.innerWidth*540/960/2 && $('#button').css('display')=='none'){
       $('#button').css('display','block');
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
var buttonclick = 0;
var offset = 0;
var num;
$('#logo').click(function(){
   if(buttonclick == 1){
   setTimeout(function(){
   $('#button').css('transform','');
   $('#button').attr('title','');
   $('#kreuz1').css('transform','');
   $('#kreuz2').css({'transform':'','height':'30px'});
   $('h2').css('display','block');
   },250);
   setTimeout(function(){
   $('#work'+num).css('display','none'); 
   $('#playbutton').css('display','none');
   if(num <= 1 || num == 7){
   $('#iframe'+num).attr('src',$('#iframe'+num).attr('src'));
   }
   if(num > 1 && num != 7){
   document.getElementById('video'+num).load();
   }  
   },500);
   
   $(this).removeClass('buttonhover');
   $('#button').css('transition','all .5s');
   $('#space3').css({'transition':'all .5s','transform':'','overflow':'hidden'});
   $('#space').css('overflow','visible');
   window.scrollBy(0, offset);
   buttonclick = 0;
   };
});
$('.zzuozhuan2').mouseenter(function(){
   if(buttonclick == 1){
    $(this).addClass('buttonhover');
   };
    $(this).mouseleave(function(){
    $(this).removeClass('buttonhover');
   });
});
$('.videos').click(function(){
  if(this.paused == true || this.ended == true) {
    this.play();
    $('#button').css('display','none');
    $('#playbutton').css('display','none');
  }else{
    this.pause();
    $('#button').css('display','block');
  } 
});
$('.videos').mousemove(function(){  
    console.log()
    var raolu = this;
    if($('#button').css('display') == 'none'){
    $('#button').css('display','block');
    setTimeout(function(){
    if(raolu.paused == false && $('.zzuozhuan2').css('background-color') == "rgb(255, 235, 114)" && document.getElementById('space3').scrollTop < window.innerWidth*540/960/2) { 
    $('#button').css('display','none');
    }
    if($('.zzuozhuan2').css('background-color') != "rgb(255, 235, 114)"){
    console.log('haha');
       $('#button').mouseleave(function(){
           setTimeout(function(){
           if(raolu.paused == false){
           $('#button').css('display','none');
           }
           },2000);
       });
    }
    },2000);
    }
});
$('#playbutton').click(function(){
   document.getElementById('video'+num).play();
   $(this).css('display','none');
   $('#button').css('display','none');
});
$(".hex").mouseenter(function() {
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
    $("#pic"+dd).css({'z-index':'0',"transition":"none"});
    
    var shadowUpDown;
    
            $("#pic"+dd).css({"transform":"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+", 4, 1)","transition":"all 0.5s"});

            //$("#hex"+dd).find( "polygon" ).attr("filter","url(#shadow"+dd+")");
            //var pfx = ["webkit", "moz", "MS", "o", ""]; css animation的callback 不知道 transition有用不
            clearInterval(shadowUpDown);
            shadowUpDown = setInterval(function(){ 
                var tf = $("#pic"+dd).css("transform");
                var tf_n = Number(tf.split(",")[14]) ;
                //y=u0(1−x)3+3u1(1−x)2x+3u2(1−x)x2+u3x3
                //(0.25,0.1,0.25,1)
                // console.log("t:"+tf_n);
                var x = !tf_n ? 0 : tf_n/4;
                var y = 0.25*Math.pow((1-x),3) + 3*0.1*Math.pow((1-x),2)*x + 3*0.25*(1-x)*Math.pow(x,2) + 1*Math.pow(x,3);
                
                // console.log(x);
                $("#set"+dd).attr("stdDeviation", y*12-3);
                if(tf_n == 4){//xuyao string chaijie
                    clearInterval(shadowUpDown);
                    console.log("up");
                }
             }, 5);
            
            //console.log($("#set"+dd).attr("stdDeviation"));
        
   
    
    
    $(this).mousedown(function() {
        $("#pic"+dd).css({"transform":"matrix(1, 0, 0, 1,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")",'z-index':'-1'});
        $( this ).find( "polygon" ).attr("filter","none");
        $(this).mouseup(function() {
           $("#pic"+dd).css({"transform":"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+", 4, 1)",'z-index':'0'});
        });
    });
    $(this).click(function() {
        setTimeout(function(){
        $('#button').css('transform','translate('+(window.innerWidth-120)+'px) rotate(90deg)');
        $('#button').attr('title','Back to Menu');
        $('#kreuz1').css('transform','translateY(2px) rotate(45deg)');
        $('#kreuz2').css({'transform':'translateY(-5px) rotate(45deg)','height':'20px'});
        $('#tianheng').css('display','none');
        },250);
        setTimeout(function(){
        $('#button').css('transition','none');
        $('#space3').css('transition','none');
        $('#space').css('overflow','hidden');
        },750);
        $('#work'+dd).css('display','block');
        $('#space3').css({'transform':'translate('+(window.innerWidth)+'px)','overflow':'scroll'});
        $('#space3').scrollTop(0);
        if(dd <= 1){
        $('#iframe'+dd).attr('src',$('#iframe'+dd).attr('src'));
        }        
        if(dd > 1 && dd != 7){       
        $('#playbutton').css('display','block');
        }
        num = dd;        
        buttonclick = 1;
        offset = window.pageYOffset;   
    });
	$(this).mouseleave(function() {
        $("#pic"+dd).css({"transform":"matrix(1, 0, 0, 1,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")",'z-index':'-1'});
        //
        clearInterval(shadowUpDown);
        shadowUpDown = setInterval(function(){ 
            var tf = $("#pic"+dd).css("transform");
            var tf_n = Number(tf.split(",")[14]) ;
            //y=u0(1−x)3+3u1(1−x)2x+3u2(1−x)x2+u3x3
            //(0.25,0.1,0.25,1)
            // console.log("t:"+tf_n);
            var x = !tf_n ? 0 : tf_n/4;
            var y = 0.25*Math.pow((1-x),3) + 3*0.1*Math.pow((1-x),2)*x + 3*0.25*(1-x)*Math.pow(x,2) + 1*Math.pow(x,3);
            
            // console.log(x);
            // console.log("y:"+y);
            $("#set"+dd).attr("stdDeviation", y*12-3);
            if(x == 0){//xuyao string chaijie
                //$( "#hex"+dd ).find( "polygon" ).attr("filter","none");
                clearInterval(shadowUpDown);
                console.log("down");
            }
        }, 5);
        //clearInterval(shadowUp);
    });
});
};
