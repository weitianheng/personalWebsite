var detailshow = 0;
var offset = 0;
var pwn;
var dialogSchow = 0;
var spalt;
var spalt2;
var s3top = 1;
var topbarH = 60;

var points_g = [
  "16.5,78.5",
  "0,69",
  "0,22",
  "40,0",
  "80,22",
  "80,69",
  "64.5,78.5",
];
var points = $("#loadingBar").attr("points").split(" ");
var numberOfP = $(".pictures").length;

var counter = 0;
var counter_p = [0, 0, 0, 0, 0, 0, 0];

var duringTransition = 1;
var loop_colors = ["#B69652", "#A56761", "#5B9588", "#7DAD49"];

function iframeSize() {
  $("#iframe_work").attr("height");
}
function GoInFullscreen(element) {
  if (element.requestFullscreen) element.requestFullscreen();
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
  else if (element.msRequestFullscreen) element.msRequestFullscreen();
}
function load() {
  var w = Number($("#iframe_work").css("width").replace("px", ""));
  var H = window.innerHeight;
  var minH = $("#iframe_work").attr("data");

  if (H - 100 < minH) {
    $("#iframe_work").attr("height", minH);
  } else {
    $("#iframe_work").attr("height", (w * 9) / 16);
  }
}

function videoLoad() {
  $("#video").on("click", function () {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  });
}
function getHfromHex(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16),
    g = parseInt(result[2], 16),
    b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  var d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    case b:
      h = ((r - g) / d + 4) / 6;
      break;
  }

  return {
    h: (h * 360 + 0.5) | 0,
    s: s,
  };
}
function showDialog(n) {
  if (dialogSchow == 0) {
    $("#text-box").css("transform", "translate(0px,0px)");
    dialogSchow = 1;
  }
  $("#dialogContent").css("color", dialogColor[n]);
  document.getElementById("dialogContent").innerHTML = dialog[n];

  var dw = Number($("#dialogContent").css("width").replace("px", "")) + 60;
  var dh = Number($("#dialogContent").css("height").replace("px", "")) + 40;
  if (dh - 40 > 25) {
    dw += 20;
    $("#dialogSVG").css("margin-left", "-10px");
  } else {
    $("#dialogSVG").css("margin-left", "0px");
  }
  $("#dialogBack").attr(
    "points",
    dh / 4 +
      ",0 0," +
      (dh * 4) / 5 +
      " " +
      dh / 5 +
      "," +
      dh +
      " " +
      (dw - dh / 5) +
      "," +
      dh +
      " " +
      dw +
      "," +
      dh / 4 +
      " " +
      (dw - dh / 5) +
      ",0"
  );
}
function hideDialog() {
  if (dialogSchow == 1) {
    setTimeout(function () {
      if (dialogSchow == 0) {
        document.getElementById("dialogContent").innerHTML = "";
      }
    }, 500);

    $("#text-box").css(
      "transform",
      "translate(" + (window.innerWidth * 0.6 + 130) + "px,0px)"
    );
    dialogSchow = 0;
  }
}
function openWork(hh, ani) {
  $("#space3").css({
    transform: "translate(" + window.innerWidth + "px)",
    overflow: "scroll",
  });
  $("#space3").scrollTop(0);

  s3top = 1;
  $("#titel3").css("transform", "translate(" + window.innerWidth + "px)");
  $(".kreuz").css("background-color", "#fff");
  $("#tianheng").css("display", "none");

  if (ani == 0) {
    $("#button").css("transition", "none");
    $("#space3").css("transition", "none");
    $("#space").css("overflow", "hidden");
    $("#button").css(
      "transform",
      "translate(" + (window.innerWidth - 120) + "px) rotate(90deg)"
    );
    $("#button").attr("title", "Back to Menu");
    $("#kreuz1").css("transform", "translateY(2px) rotate(45deg)");
    $("#kreuz2").css({
      transform: "translateY(-5px) rotate(45deg)",
      height: "20px",
    });
  }

  if (ani == 1) {
    setTimeout(function () {
      $("#button").css(
        "transform",
        "translate(" + (window.innerWidth - 120) + "px) rotate(90deg)"
      );
      $("#button").attr("title", "Back to Menu");
      $("#kreuz1").css("transform", "translateY(2px) rotate(45deg)");
      $("#kreuz2").css({
        transform: "translateY(-5px) rotate(45deg)",
        height: "20px",
      });
    }, 250);
    setTimeout(function () {
      $("#button").css("transition", "none");
      $("#space3").css("transition", "none");
      $("#space").css("overflow", "hidden");
    }, 750);
  }

  if (hh !== pwn) {
    fetch("./listOfWorks.json")
      .then((response) => response.json())
      .then((d) => {
        const data = d[hh];
        //space
        var innerHTML =
          '<div style="width:100%; height:100px; background-color:#fff; top:0px;" ></div>' +
            "<div >" +
            data["media"] ==
          "video"
            ? '<video id="video" width="100%" controls controlsList="nodownload" onloadstart="videoLoad()" >' +
              '<source src="video/' +
              data["name"] +
              '.mp4" type="video/mp4">' +
              '<source src="video/' +
              data["name"] +
              '.ogg" type="video/ogg">' +
              "Your browser does not support the video tag+" +
              "</video>"
            : '<iframe width="100%" id="iframe_work" data="' +
              data["H_min"] +
              '" src="' +
              data["url"] +
              '" frameborder="0" onload="load()" ></iframe>' +
              "</div>" +
              '<div id="shuming">' +
              "</div>" +
              '<div class="container_d" >';
        var n = 1;
        while (data["titel" + n]) {
          innerHTML =
            innerHTML +
            '<div class="detail">' +
            '<img class="detailimage" src="' +
            data["img" + n] +
            '">' +
            '<div class="detailtitle" style="color:' +
            data["color"] +
            '">' +
            data["titel" + n] +
            "</div>" +
            '<div class="detailtext" style="color:' +
            data["color"] +
            '">' +
            data["inhalt" + n] +
            "</div>" +
            "</div>";
          n++;
        }
        innerHTML = innerHTML + "</div>";

        document.getElementById("space3").innerHTML = innerHTML;

        var c = 0;
        var l = $(".detailimage>img").length + $(".detail>img").length;
        function zouni() {
          var imgs = document.getElementsByClassName("detailimage");
          var a_bili = [];
          for (var x = 0; x < imgs.length; x++) {
            a_bili.push(imgs[x].clientWidth / imgs[x].clientHeight);
          }
          var w_max = a_bili.sort(function (a, b) {
            return b - a;
          })[0];
          $(".detailimage").css("width", function (n) {
            var bili =
              Number($(this).css("width").replace("px", "")) /
              Number($(this).css("height").replace("px", ""));

            var wd0 = Number($(".detailtext").css("width").replace("px", ""));
            //手动调了一个值 2 因为有的宽高比都比较小的作品页 图会太大。。
            wd = Math.floor(
              $(".detailtext").css("width").replace("px", "") *
                Math.sqrt(bili / 2)
            );
            if (n / 2 !== Math.floor(n / 2)) {
              $(this).attr("data-margin-left", 1.25 * wd0 - wd);
            } else {
              $(this).attr("data-margin-left", -0.25 * wd0);
            }

            return wd;
          });
        }
        $(".detailimage").on("load", function () {
          c++;
          if (c == l) {
            zouni();
          }
        });
        $(".detailimage>img").on("load", function () {
          c++;
          if (c == l) {
            zouni();
          }
        });

        //title
        document.getElementById("titel3").innerHTML =
          '<div  style="position:absolute; top: 50%; padding: 0px 50px 0px 50px; margin-top: -14px; font-style: italic; color:' +
          data["color"] +
          '">' +
          '<h2 style="display: inline;">' +
          data["name"] +
          " </h2>" +
          '<p  id="workUnderTitle" data-color="' +
          data["color"] +
          '" style="display: inline;">' +
          data["worktype"] +
          "</p>" +
          "</div>";
        var color = data["color"];
        $("#logo").attr("fill", color);
        var h_dif = getHfromHex(color).h - 217;
        var gg = (getHfromHex(color).s * 100) / 89;
        document.getElementById("style").innerHTML =
          "video::-webkit-media-controls {-webkit-filter: hue-rotate(" +
          h_dif +
          "deg) saturate(" +
          gg +
          "); filter: hue-rotate(" +
          h_dif +
          "deg) saturate(" +
          gg +
          ");}";
      });
  }
  var name = $("#pic" + hh)
    .attr("data_name")
    .replace(/ /g, "_")
    .replace(/ä/g, "ae");
  window.location = "#" + name;

  detailshow = 1;
  offset = window.pageYOffset;
}
function closeWork() {
  if (detailshow == 1) {
    window.location = "#home";
    setTimeout(function () {
      $("#button").css({ transform: "", top: "50%" });
      $("#button").attr("title", "");
      $("#kreuz1").css("transform", "");
      $("#kreuz2").css({ transform: "", height: "30px" });
      $("h2").css("display", "block");
    }, 250);

    $("#button").css("transition", "all .5s");
    $("#space3").css({
      transition: "all .5s",
      transform: "",
      overflow: "hidden",
    });
    $("#titel3").css("transform", "");
    $(".kreuz").css("background-color", "#eee");
    $("#space").css("overflow", "visible");
    window.scrollBy(0, offset);
    detailshow = 0;

    document.getElementById("video").pause();
  }
}

function colorLoop() {
  $("#loadingBar").attr("fill", loop_colors[loop_c]);
  var n = loop_c - 1 >= 0 ? loop_c - 1 : loop_colors.length - 1;
  $("#loadingBg").attr("fill", loop_colors[n]);
  loop_c++;
  if (loop_c == loop_colors.length) {
    loop_c = 0;
  }
}

function go() {
  setTimeout(function () {
    $("#hidefirst").css("opacity", 1);
  }, 300);
  setTimeout(function () {
    duringTransition = 0;
  }, 600);

  spalt = Math.floor((window.innerWidth - 100 - 200) / 200);
  if (window.innerWidth < 500) {
    spalt = 1;
  }
  var zuopinshu = $(".pictures").length;
  var galleryHeight =
    Math.round((2 * zuopinshu) / spalt) * 200 * Math.sqrt(3) +
    200 / Math.sqrt(3);
  var shixian =
    ((window.innerHeight / 2 + window.pageYOffset - 166) /
      (galleryHeight + 166)) *
    100;
  var changshu = $(".pictures").attr("data");

  var chushi = function () {
    var galleryWidth = $(".gallery").css("width");
    var gW = galleryWidth.slice(0, -2);
    $(".pictures").css(
      "transform",
      "translate(" +
        (Number(gW) / 2 - changshu) +
        "px," +
        (window.innerHeight / 2 - 166) +
        "px)"
    );
  };

  var pailie = function (spalt) {
    $(".pictures").each(function (i) {
      var yushu = i - spalt * Math.floor(i / spalt);
      var liecha = 0;
      var paicha = 0;
      if (yushu >= Math.round(spalt / 2)) {
        liecha = changshu;
        paicha = changshu;
        yushu = yushu - Math.round(spalt / 2);
      }
      $("#shadow" + i).css(
        "transform",
        "matrix(1, 0, 0, 1," +
          (yushu * 400 + Number(liecha)) +
          ", " +
          (Math.floor(i / spalt) * Math.sqrt(3) * 200 * 2 +
            Math.sqrt(3) * paicha) +
          ")"
      );

      $(this).css(
        "transform",
        "matrix(1, 0, 0, 1," +
          (yushu * 400 + Number(liecha)) +
          ", " +
          (Math.floor(i / spalt) * Math.sqrt(3) * 200 * 2 +
            Math.sqrt(3) * paicha) +
          ")"
      );
    });
  };

  $(window).resize(function () {
    spalt = Math.floor((window.innerWidth - 100 - 200) / 200);
    if (window.innerWidth < 500) {
      spalt = 1;
    }
    $(".gallery").css({
      width: spalt * 200 + 200 + "px",
      "margin-left": -(spalt * 200 + 200) / 2 + "px",
    });
    if (spalt2 != spalt) {
      pailie(spalt);
      galleryHeight =
        Math.round(zuopinshu / (spalt / 2)) * 200 * Math.sqrt(3) +
        200 / Math.sqrt(3);
      $(".gallery").css("height", galleryHeight + 166 + "px");
    }
    spalt2 = spalt;
    if (detailshow == 1) {
      $("#button").css(
        "transform",
        "translate(" + (window.innerWidth - 120) + "px) rotate(90deg)"
      );
      $("#space3").css("transform", "translate(" + window.innerWidth + "px)");
      $("#titel3").css("transform", "translate(" + window.innerWidth + "px)");
    }
    $("#playbutton").css(
      "top",
      ((window.innerWidth * 540) / 960 / 5) * 4 + "px"
    );
    $(".iframes").attr("height", (window.innerWidth * 540) / 960 + "px");
  });
  $(window).scroll(function () {
    var shixian =
      ((window.innerHeight / 2 + window.pageYOffset - 166) /
        (galleryHeight + 166)) *
      100;
    $(".gallery").css("perspective-origin", "50% " + shixian + "%");
  });

  $("#space3").scroll(function () {
    var scrollTop = this.scrollTop;
    if (scrollTop <= 100 - topbarH) {
      $("#titel3").css({ height: 100 - scrollTop, "box-shadow": "none" });
      $("#button").css("top", (100 - scrollTop) / 2);
      $("#workUnderTitle").css("display", "inline");
      s3top = 1;
    } else if (scrollTop > 100 - topbarH && s3top == 1) {
      $("#titel3").css({ height: topbarH, "box-shadow": "0px 0px 4px grey" });
      $("#button").css("top", topbarH / 2);
      $("#workUnderTitle").css("display", "none");
      s3top = 0;
    }
    $(".detailimage")
      .filter(function () {
        return this.offsetTop < scrollTop + window.innerHeight / 2;
      })
      .css("margin-left", function () {
        return $(this).attr("data-margin-left");
      });
  });
  $("#svg").mouseenter(function () {
    $(".shanshuo").attr("stroke", "#eee");
    $(this).click(function () {
      $("#emailme").click();
    });
    $(this).mouseleave(function () {
      $(".shanshuo").attr("stroke", "#000");
    });
  });

  $("#button").click(function () {
    closeWork();
  });

  $("#video").click(function () {
    document.getElementById("video").play();
  });
  $(".hex").mouseenter(function () {
    if (duringTransition == 0) {
      $(".shadows").css("opacity", "1");
      var dd = $(this).attr("id").substr(3);
      var yushu = dd - spalt * Math.floor(dd / spalt);
      var liecha = 0;
      var paicha = 0;
      if (yushu >= Math.round(spalt / 2)) {
        liecha = 200;
        paicha = 200;
        yushu = yushu - Math.round(spalt / 2);
      }
      $("#pic" + dd).css({
        "z-index": "0",
        transform:
          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0," +
          (yushu * 400 + liecha) +
          ", " +
          (Math.floor(dd / spalt) * Math.sqrt(3) * 200 * 2 +
            Math.sqrt(3) * paicha) +
          ", 4, 1)",
        transition: "transform 0.5s",
      });

      $("#shadow" + dd).css({
        filter: "blur(10px)",
        "z-index": "0",
        transition: "filter 0.5s",
      });

      showDialog(dd);
      $(this).mousedown(function () {
        $("#pic" + dd).css({
          transform:
            "matrix(1, 0, 0, 1," +
            (yushu * 400 + liecha) +
            ", " +
            (Math.floor(dd / spalt) * Math.sqrt(3) * 200 * 2 +
              Math.sqrt(3) * paicha) +
            ")",
          "z-index": "-1",
          transition: "all 0.5s",
        });
        $(this).find("polygon").attr("filter", "none");
        $("#shadow" + dd).css({
          filter: "blur(0px)",
          "z-index": "-2",
          transition: "all 0.5s",
        });
        $(this).mouseup(function () {
          $("#pic" + dd).css({
            transform:
              "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0," +
              (yushu * 400 + liecha) +
              ", " +
              (Math.floor(dd / spalt) * Math.sqrt(3) * 200 * 2 +
                Math.sqrt(3) * paicha) +
              ", 4, 1)",
            "z-index": "0",
          });
        });
      });
      $(this).click(function () {
        openWork(dd, 1);
        pwn = dd;
      });
      $(this).mouseleave(function () {
        $("#pic" + dd).css({
          transform:
            "matrix(1, 0, 0, 1," +
            (yushu * 400 + liecha) +
            ", " +
            (Math.floor(dd / spalt) * Math.sqrt(3) * 200 * 2 +
              Math.sqrt(3) * paicha) +
            ")",
          "z-index": "-1",
          transition: "all 0.5s",
        });
        $("#shadow" + dd).css({
          filter: "blur(0px)",
          "z-index": "-2",
          transition: "all 0.5s",
        });
        hideDialog();
      });
    }
  });

  window.onhashchange = function () {
    if (window.location.hash && window.location.hash !== "#home") {
      var hash = window.location.hash
        .replace("#", "")
        .replace(/_/g, " ")
        .replace(/ae/g, "ä");
      for (var i = 0; i < $(".pictures").length; i++) {
        if ($("#pic" + i).attr("data_name") == hash) {
          openWork(i, 1);
        }
      }
    } else {
      closeWork();
    }
  };

  $(".gallery").css({
    width: spalt * 200 + 200 + "px",
    "margin-left": -(spalt * 200 + 200) / 2 + "px",
  });
  $(".gallery").css("height", galleryHeight + 166 + "px");
  $(".gallery").css("perspective-origin", "50% " + shixian + "%");
  chushi();
  setTimeout(function () {
    pailie(spalt);
    $(".pictures").css({ opacity: "1", transition: "all 0.5s" });
  }, 0);

  if (window.location.hash && window.location.hash !== "#home") {
    var hash = window.location.hash
      .replace("#", "")
      .replace(/_/g, " ")
      .replace(/ae/g, "ä");
    for (var i = 0; i < $(".pictures").length; i++) {
      if ($("#pic" + i).attr("data_name") == hash) {
        openWork(i, 0);
      }
    }
  }
}

var step_n = 10;
var toggle_fx = true;
var loop_c = 1;
var LA;
var dontstart = 0;
setTimeout(function () {
  if (dontstart == 0) {
    colorLoop();
    LA = setInterval(function () {
      var points_str = "";
      var c = 0;
      if (toggle_fx) {
        var ZC = Math.floor(counter / step_n);
        var YS = counter - ZC * step_n;
        for (var y = 0; y < ZC; y++) {
          counter_p[y] = step_n;
        }
        if (YS != 0) {
          counter_p[ZC] = YS;
        }
        counter++;
        if (counter > step_n * counter_p.length) {
          toggle_fx = !toggle_fx;
          counter = step_n * counter_p.length;
          for (var q = 0; q < counter_p.length; q++) {
            counter_p[q] = 0;
          }
          colorLoop();
        }
      } else {
        var ZC = Math.ceil(counter / step_n);
        var YS = ZC * step_n - counter;
        for (var y = counter_p.length - 1; y > ZC - 1; y--) {
          counter_p[y] = step_n;
        }
        if (YS != 0) {
          counter_p[ZC - 1] = YS;
        }
        counter--;
        if (counter < 0) {
          toggle_fx = !toggle_fx;
          counter = 0;
          for (var w = 0; w < counter_p.length; w++) {
            counter_p[w] = 0;
          }
          colorLoop();
        }
      }

      points.forEach(function (it, i) {
        if (i > 0 && i < 8) {
          points_str +=
            (counter_p[c] / step_n) *
              (Number(points_g[c].split(",")[0]) -
                Number(points[i].split(",")[0])) +
            Number(points[i].split(",")[0]);
          points_str += ",";
          points_str +=
            (counter_p[c] / step_n) *
              (Number(points_g[c].split(",")[1]) -
                Number(points[i].split(",")[1])) +
            Number(points[i].split(",")[1]);
          c++;
        } else {
          points_str += it;
        }
        points_str += " ";
      });
      $("#loadingBar").attr("points", points_str);
    }, 20);
  }
}, 300);
