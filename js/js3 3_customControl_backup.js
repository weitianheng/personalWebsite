var suoyouzp = ["gdpr","waehrung","chameleon","dreieck","dropbox","seeu","termostat","verdant","mechantronik"];

function iframeSize(){
    console.log("iframeResize");
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
    console.log("nihao");
}
function videoLoad() {
    console.log("video load start");
    var videoContainer = document.getElementById("video-container");
	var video = document.getElementById("video");
	var playButton = document.getElementById("play-pause");
	var muteButton = document.getElementById("mute");
	var fullScreenButton = document.getElementById("full-screen");
	var seekBar = document.getElementById("seek-bar");
    var volumeBar = document.getElementById("volume-bar");
    
	playButton.addEventListener("click", function() {
		if (video.paused == true) {
			video.play();
			playButton.innerHTML = "Pause";
		} else {
			video.pause();
			playButton.innerHTML = "Play";
		}
	});

	muteButton.addEventListener("click", function() {
		if (video.muted == false) {
			video.muted = true;
			muteButton.innerHTML = "Unmute";
		} else {
			video.muted = false;
			muteButton.innerHTML = "Mute";
		}
    });
    
	fullScreenButton.addEventListener("click", function() {
		if (videoContainer.requestFullscreen) {
			videoContainer.requestFullscreen();
		} else if (videoContainer.mozRequestFullScreen) {
			videoContainer.mozRequestFullScreen(); // Firefox
		} else if (videoContainer.webkitRequestFullscreen) {
			videoContainer.webkitRequestFullscreen(); // Chrome and Safari
		}
	});

	seekBar.addEventListener("change", function() {
		var time = video.duration * (seekBar.value / 100);
		video.currentTime = time;
	});

	video.addEventListener("timeupdate", function() {
		var value = (100 / video.duration) * video.currentTime;
		seekBar.value = value;
    });
    $("#video").on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e){
        $("#video-controls").css("bottom",0);
        $("video").click(function(){
            console.log("haha");
        });
    });
    $("#video-container").hover(function(){
        $("#video-controls").css("opacity",0.6);
    },function(){
        $("#video-controls").css("opacity",0);
    });

	seekBar.addEventListener("mousedown", function() {
		video.pause();
	});

	seekBar.addEventListener("mouseup", function() {
		video.play();
    });
    
	volumeBar.addEventListener("change", function() {
		video.volume = volumeBar.value;
    });
    
    
}

window.onload = function(){


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
var zuopinshu = $(".pictures").length;
console.log(zuopinshu);
$('.gallery').css({"width" : (spalt*200+200)+"px" , "margin-left":(-(spalt*200+200)/2)+"px"});
var galleryHeight = Math.round(2*zuopinshu/(spalt))*200*Math.sqrt(3)+200/Math.sqrt(3);
$('.gallery').css("height",galleryHeight+166+"px");

var shixian = (window.innerHeight/2 + window.pageYOffset - 166)/(galleryHeight+166)*100;
$(".gallery").css("perspective-origin", "50% "+shixian+"%"); 
// $('#playbutton').css("top", (window.innerWidth*540/960/5*4)+"px");

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
        $("#shadow"+i).css("transform","matrix(1, 0, 0, 1,"+(yushu*400+Number(liecha))+", "+(Math.floor((i)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")");

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

   },500);
   
   $(this).removeClass('buttonhover');
   $('#button').css('transition','all .5s');
   $('#space3').css({'transition':'all .5s','transform':'','overflow':'hidden'});
   $('#space').css('overflow','visible');
   window.scrollBy(0, offset);
   buttonclick = 0;
   };
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

        $('#space3').css({'transform':'translate('+(window.innerWidth)+'px)','overflow':'scroll'});
        $('#space3').scrollTop(0);
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("space3").innerHTML = this.responseText;
            }
        };
        var name = $('#pic'+dd).attr("data_name").toLowerCase().replace(" ","_").replace("ä","ae").replace;
        xmlhttp.open("GET", "WorkContent.php?n=" + (Number(dd)+1), true);
        xmlhttp.send();

        num = dd;        
        buttonclick = 1;
        offset = window.pageYOffset;   
    });
	$(this).mouseleave(function() {
        $("#pic"+dd).css({"transform":"matrix(1, 0, 0, 1,"+(yushu*400+liecha)+", "+(Math.floor((dd)/spalt)*Math.sqrt(3)*200*2+Math.sqrt(3)*paicha)+")",'z-index':'-1',"transition": "all 0.5s"});
        $("#shadow"+dd).css({"filter": "blur(0px)", 'z-index':'-2',"transition": "all 0.5s"});
        
    });
});




};
