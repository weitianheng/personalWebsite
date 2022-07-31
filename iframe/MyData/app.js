window.onload = function () {
  setTimeout(function () {
    // face div

    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;
    d3.selectAll(".scrollBox").style("height", winHeight - 44 + "px");
    var appWidth = winWidth - 360 - 1;
    d3.select("#appview").style("width", appWidth + "px");
    var adjustWidth = winWidth - 360 - 1 - 52 - 14;
    d3.select("#widthAdjust").style("width", adjustWidth + "px");

    d3.select("#clusterList")
      .style("width", winWidth + "px")
      .style("height", winHeight + 44 + "px");
    d3.select("#clusterImg").style(
      "margin-top",
      (winHeight + 44 - 814) / 2 + "px"
    );
    // document.getElementById("faceDiv").style.marginTop = (winHeight - 360)/2 + "px";

    // svg
    var svg,
      button,
      OUTER_MARGIN = 0,
      MARGIN = {
        TOP: OUTER_MARGIN,
        RIGHT: OUTER_MARGIN,
        BOTTOM: OUTER_MARGIN + 10,
        LEFT: OUTER_MARGIN,
      },
      TRANSITION_DURATION = 800,
      TRANSITION_DURATION2 = 100,
      HEIGHT = winHeight - MARGIN.TOP - MARGIN.BOTTOM,
      WIDTH = winWidth - MARGIN.LEFT - MARGIN.RIGHT,
      MITT_H = HEIGHT / 2 + 44 - 20,
      MITT_W = WIDTH / 2,
      INNERRADIUS = 250,
      STROCKE_MAX = 100,
      STROCKE_MIN = 2,
      LUPERADIUS = 75,
      OFFSET_TEXT_Y = MITT_H - 320 / 2 - 100,
      OFFSET_APP_Y = MITT_H - 75,
      OFFSET_LINK_Y = MITT_H - 75,
      OFFSET_FACECONTAINER_Y = MITT_H - 75,
      OFFSET_FACE_Y = MITT_H - 320 / 2 - 100,
      OFFSET_FACE_X = MITT_W - 320 / 2,
      SUODING = 0,
      Modus = "explorer";
    (discription_array = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
      "Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.",
      "Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue.",
    ]),
      (discription_array_a = [
        "Sed haec quidem liberius ab eo dicuntur et saepius. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Haec non erant eius, qui innumerabilis mundos infinitasque regiones, quarum nulla esset ora, nulla extremitas, mente peragravisset. Tamen aberramus a proposito, et, ne longius, prorsus, inquam, Piso, si ista mala sunt, placet. ",
        "Quid iudicant sensus?</b> Sin kakan malitiam dixisses, ad aliud nos unum certum vitium consuetudo Latina traduceret. Res enim se praeclare habebat, et quidem in utraque parte. Sed tamen enitar et, si minus multa mihi occurrent, non fugiam ista popularia. ",
        "Quae tamen a te agetur non melior, quam illae sunt, quas interdum optines. Nam si quae sunt aliae, falsum est omnis animi voluptates esse e corporis societate. Cur, nisi quod turpis oratio est? Maximas vero virtutes iacere omnis necesse est voluptate dominante. Quem Tiberina descensio festo illo die tanto gaudio affecit, quanto L.",
      ]),
      (purpose_text =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ad bona praeterita redeamus. Qui igitur convenit ab alia voluptate dicere naturam proficisci, in alia summum bonum ponere? At hoc in eo M. Duo Reges: constructio interrete. Ubi ut eam caperet aut quando? Quid igitur dubitamus in tota eius natura quaerere quid sit effectum? Quorum sine causa fieri nihil putandum est." +
        "<br><br>" +
        "Philosophi autem in suis lectulis plerumque moriuntur. An vero displicuit ea, quae tributa est animi virtutibus tanta praestantia? Hic nihil fuit, quod quaereremus. Non quaeritur autem quid naturae tuae consentaneum sit, sed quid disciplinae. Duo enim genera quae erant, fecit tria. Ampulla enim sit necne sit, quis non iure optimo irrideatur, si laboret? Videmusne ut pueri ne verberibus quidem a contemplandis rebus perquirendisque deterreantur? Cur igitur, inquam, res tam dissimiles eodem nomine appellas?" +
        "<br><br>" +
        "Ita multa dicunt, quae vix intellegam. Quamvis enim depravatae non sint, pravae tamen esse possunt. Utrum igitur tibi litteram videor an totas paginas commovere? Nosti, credo, illud: Nemo pius est, qui pietatem-; Quid ei reliquisti, nisi te, quoquo modo loqueretur, intellegere, quid diceret? Huius, Lyco, oratione locuples, rebus ipsis ielunior. "),
      (INFOSTATUS = 0),
      (VIEWSTATUS = 0),
      (CHOOSESTATUS = 0),
      (FILTERSTATUS = 0),
      (FILTERSTATUS_APP = 0),
      (NOTISTATUS = 0),
      (SEARCHON = 0);
    VISIWINSTATUS = 0;
    VISISTATUS = 0;

    var dataSearch = [
      "Geschlecht",
      "Nachname",
      "Länderkennzeichen",
      "Ortsbezeichnung",
      "Ortsbezeichnung-2",
      "Tätigkeitsschlüssel",
      "Aktuelle Stellen-Bezeichnung",
      "Beschäftigungsjahr zu Tarifgruppe",
      "Suchnachname",
      "Suchrufname",
      "Suchvorname",
      "Telefonanschluß /MA",
      "Faxanschluß /MA",
      "Mobilanschluß /MA",
      "EMail-ID Stellvertreter/Datenansprechpartner",
    ];
    var dataName = [
      "Geschlecht",
      "Nachname",
      "Vorname",
      "Titel",
      "Geburtsdatum",
      "Länderkennzeichen",
      "Postleitzahl",
      "Ortsbezeichnung",
      "wohnhaft bei",
      "Länderkennzeichen-2",
      "Postleitzahl-2",
      "Ortsbezeichnung-2",
      "Geburtsland",
      "Geburtsort",
      "Staatsangehörigkeit",
      "Strasse + Hausnummer",
      "Strasse + Hausnummer oder Postfach-2",
      "Tätigkeitsschlüssel",
      "Kostenstelle",
      "Monatsgehalt",
      "Aktuelle Stellen-Bezeichnung",
      "Gehaltsband",
      "Entlohnungsart",
      "Zeitraumart Steuerdaten",
      "Zeitraumbeginn Steuerdaten",
      "Zeitraumende Steuerdaten",
      "Komm/Geh Zeit",
      "Tarifgruppe",
      "Beschäftigungsjahr zu Tarifgruppe",
      "Entgeltgruppe",
      "Bundesland / -staat",
      "Bundesland / -staat 2",
      "wohnhaft bei - 2",
      "Suchnachname",
      "Suchrufname",
      "Suchvorname",
      "Telefon Vorwahl Land /MA",
      "Telefon Vorwahl Stadt /MA",
      "Telefonanschluß /MA",
      "Fax Vorwahl Land /MA",
      "Fax Vorwahl Stadt /MA",
      "Faxanschluß /MA",
      "Mobil Vorwahl Land /MA",
      "Mobil Vorwahl Netz /MA",
      "Mobilanschluß /MA",
      "EMail-ID Stellvertreter/Datenansprechpartner",
      "Tätigkeitsschlüssel",
      "Bundesland / -staat",
      "Bundesland / -staat 2",
      "wohnhaft bei - 2",
      "Suchnachname",
      "Suchrufname",
      "Suchvorname",
      "Telefon Vorwahl Land /MA",
      "Telefon Vorwahl Stadt /MA",
      "Telefonanschluß /MA",
    ];
    var dataFilter = [
      "Nachname",
      "Vorname",
      "Titel",
      "Geburtsdatum",
      "Länderkennzeichen",
      "Postleitzahl",
      "Ortsbezeichnung",
      "Komm/Geh Zeit",
      "Tarifgruppe",
      "Beschäftigungsjahr zu Tarifgruppe",
      "Entgeltgruppe",
      "Bundesland / -staat",
      "Bundesland / -staat 2",
      "wohnhaft bei - 2",
      "Suchnachname",
      "Suchrufname",
      "Suchvorname",
      "Telefon Vorwahl Land /MA",
      "Telefon Vorwahl Stadt /MA",
      "Telefonanschluß /MA",
      "Fax Vorwahl Land /MA",
      "Fax Vorwahl Stadt /MA",
      "Faxanschluß /MA",
      "Mobil Vorwahl Land /MA",
      "Mobil Vorwahl Netz /MA",
      "Mobilanschluß /MA",
      "EMail-ID Stellvertreter/Datenansprechpartner",
      "Tätigkeitsschlüssel",
      "Bundesland / -staat",
      "Bundesland / -staat 2",
      "wohnhaft bei - 2",
      "Suchnachname",
      "Suchrufname",
      "Suchvorname",
      "Telefon Vorwahl Land /MA",
      "Telefon Vorwahl Stadt /MA",
      "Telefonanschluß /MA",
      "Monatsgehalt",
      "Aktuelle Stellen-Bezeichnung",
      "Gehaltsband",
      "Entlohnungsart",
      "Zeitraumart Steuerdaten",
      "Zeitraumbeginn Steuerdaten",
      "Zeitraumende Steuerdaten",
    ];
    var dataValue = [
      "männlich",
      "Wei",
      "Tianheng",
      "None",
      "1988-01-02",
      "DE",
      "73527",
      "Schwäbisch Gmünd",
      "Mieter Mustermann",
      "CN",
      "not availible",
      "ort-2",
      "CN",
      "Shanghai",
      "VR China",
      "Berlinerplatz 1",
      "not availible",
      "not availible",
      "E6",
      "6,000",
      "not availible",
      "not availible",
      "not availible",
      "not availible",
      "not availible",
      "not availible",
      "08:00-19:00",
      "not availible",
      "not availible",
      "Gruppe A",
      "BW",
      "BW",
      "not availible",
      "TIANHW",
      "TIAN",
      "TH",
      "0049",
      "071",
      "12345678",
      "not availible",
      "not availible",
      "not availible",
      "0049",
      "151",
      "12345678",
      "not availible",
      "webdesign",
      "Baden Wüttemburg",
      "Bayern",
      "Mitwohner Musterfrau",
      "not availible",
      "not availible",
      "not availible",
      "0049",
      "071",
      "12345678",
    ];
    var appKacheln_all = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ];
    var appKacheln_crspd = [
      [1, 2, 3, 6, 7, 8, 9, 10, 11, 13, 14, 15, 18, 19, 20, 21, 22, 23],
      [1, 3, 4, 6, 7, 8, 9, 10, 11, 13, 14, 15, 18, 19, 20, 21, 22, 23],
      [0, 1, 4, 5, 7, 9, 10, 11, 13, 14, 15, 18, 19, 20, 21, 22, 23],
    ];
    var appKacheln_search = [4, 7, 8, 15, 20];
    var appKacheln_update = [1, 9];
    var appKacheln_name = [
      "Daimler4You",
      "MyData",
      "MyDevelopment",
      "WED",
      "CarLeasing S",
      "TMS",
      "eTraining",
      "Consulting i",
      "Consulting h",
      "eTravel",
      "JKM",
      "LunchRollete",
      "OPA",
      "MMS",
      "NAACS",
      "C.A.P.S",
      "TM@ITM",
      "HR Reporting",
      "ImWatching",
      "OSOS",
      "CardMS",
      "AAA",
      "NFG",
      "AMT",
    ];
    var appKacheln_num = [67, 1250, 26, 152, 56, 8, 23, 100, 12, 23, 212, 30];
    var data_crspd = [
      [3, 4, 7, 13, 14, 19, 20, 21, 22, 29, 30],
      [1, 2, 3, 11, 12, 19, 20, 21, 26, 27, 32],
      [2, 8, 9, 11, 12, 14, 15, 21, 26, 27, 32],
      [1, 2, 3, 4, 5, 6, 8, 9, 26, 27, 32],
      [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
      [1, 2, 6, 11, 12, 14, 15, 18, 26, 27, 31],
      [0, 1, 2, 11, 12, 19, 20, 23, 26, 27, 32],
      [0, 2, 4, 11, 12, 13, 14, 21, 26, 27, 28],
      [1, 2, 16, 17, 18, 19, 20, 21, 22, 27, 32],
      [10, 11, 12, 13, 14, 15, 20, 21, 26, 27, 32],
      [0, 1, 3, 7, 12, 19, 20, 28, 29, 30, 31],
      [0, 5, 10, 15, 16, 17, 20, 25, 30],
    ];

    //先就可以激活的function
    d3.selectAll(".darButton").on("click", function () {
      var th = d3.select(this);
      if (th.attr("id") == "darList") {
        if (width - 52 - 28 < 989) {
          d3.select("#appList")
            .select("img")
            .attr("src", "assets/img/inhalt/applist_r.png");
        } else {
          d3.select("#appList")
            .select("img")
            .attr("src", "assets/img/inhalt/applist_n.png");
        }
        d3.select("#chooser_dstlg").style("transform", "translateX(46px)");
        d3.select("#appGrid").style("display", "none");
        d3.select("#appList").style("display", "block");
        var width = Number(d3.select("#appview").style("width").split("p")[0]);
        // console.log(width);
        // this is also temporary
        // 26padding 14padding
      } else {
        d3.select("#chooser_dstlg").style("transform", "translateX(0px)");
        d3.select("#appGrid").style("display", "block");
        d3.select("#appList").style("display", "none");
      }
      d3.selectAll(".darButton").classed("darButton_a", false);
      th.classed("darButton_a", true);
    });
    d3.select("#filter_data").on("mouseenter", function () {
      if (FILTERSTATUS == 0) {
        d3.select(this)
          .attr("src", "assets/img/icons/filter_hover.png")
          .on("mouseleave", function () {
            d3.select(this).attr("src", "assets/img/icons/filter_off.png");
          });
      }
      d3.select("#filter_data").on("click", function () {
        d3.select("#filterWin")
          .style("display", "block")
          .on("click", function () {
            d3.select(this).style("display", "none");
            d3.select("#filterWin2").style("display", "block");
            d3.select("#filter_data").attr(
              "src",
              "assets/img/icons/filter_on.png"
            );
            dataRight_cl(dataFilter);
            d3.select("#headbar_data")
              .select("p")
              .select("span")
              .select("#fz_vsb")
              .style("display", "inline");
            d3.select("#headbar_data")
              .select("p")
              .select("span")
              .select("#fz_vsb")
              .select("#fz_num")
              .text(101);
            d3.select("#filter_sensitive")
              .style("display", "block")
              .on("click", function () {
                d3.select(this).style("display", "none");
                d3.select("#filter_data").attr(
                  "src",
                  "assets/img/icons/filter_off.png"
                );
                removeChoose();
                FILTERSTATUS = 0;
              });
            FILTERSTATUS = 1;
          });
      });
    });
    d3.select("#filter_app").on("mouseenter", function () {
      if (FILTERSTATUS_APP == 0) {
        d3.select(this)
          .attr("src", "assets/img/icons/filter_hover.png")
          .on("mouseleave", function () {
            d3.select(this).attr("src", "assets/img/icons/filter_off.png");
          });
      }
      d3.select("#filter_app").on("click", function () {
        if (FILTERSTATUS_APP == 0) {
          d3.select("#filterWin_app").style("display", "block");
          FILTERSTATUS_APP = 1;
        } else {
          d3.select("#filterWin_app").style("display", "none");
          FILTERSTATUS_APP = 0;
        }
      });
    });
    d3.select("#notification").on("mouseenter", function () {
      if (NOTISTATUS == 0) {
        d3.select(this)
          .attr("src", "assets/img/icons/notification_hover.png")
          .on("mouseleave", function () {
            d3.select(this).attr("src", "assets/img/icons/notification.png");
          });
      }
      d3.select("#notification").on("click", function () {
        d3.select("#notificationWin").style("display", "block");
        d3.select("#noti_data").on("mouseenter", function () {
          d3.select(this).attr("src", "assets/img/inhalt/noti_data_hover.png");
        });
        d3.select("#noti_data").on("mouseleave", function () {
          d3.select(this).attr("src", "assets/img/inhalt/noti_data.png");
        });
        d3.select("#noti_app").on("mouseenter", function () {
          d3.select(this)
            .attr("src", "assets/img/inhalt/noti_app_hover.png")
            .on("click", function () {
              //details
              d3.select("#details_inhalt").attr(
                "src",
                "assets/img/inhalt/details_noti.png"
              );
              d3.select("#clusterButton").style("display", "none");
              d3.select("#notificationWin").style("display", "none");
              NOTISTATUS = 1;
              d3.select("#detailShow").attr(
                "src",
                "assets/img/details_noti.png"
              );
              appRight_cl(appKacheln_update);
              d3.select("#headbar_app")
                .select("p")
                .select("span")
                .select("#fm")
                .text(2);
              d3.select("#noti_feld")
                .style("display", "inline")
                .on("click", function () {
                  d3.select(this).style("display", "none");
                  d3.select("#titel_dis").style("background-color", "white");
                  d3.select("#detailShow").attr(
                    "src",
                    "assets/img/details.png"
                  );
                  appAll_cl();
                  d3.select("#headbar_app")
                    .select("p")
                    .select("span")
                    .select("#fm")
                    .text(211);

                  //details
                  d3.select("#details_inhalt").attr(
                    "src",
                    "assets/img/inhalt/details_normal.png"
                  );
                  d3.select("#clusterButton").style("display", "block");

                  NOTISTATUS = 0;
                });
            });
        });
        d3.select("#noti_app").on("mouseleave", function () {
          d3.select(this).attr("src", "assets/img/inhalt/noti_app.png");
        });
      });
    });
    d3.select("#search").on("mouseenter", function () {
      d3.select(this)
        .attr("src", "assets/img/icons/search_hover.png")
        .on("mouseleave", function () {
          d3.select(this).attr("src", "assets/img/icons/search.png");
        });

      d3.select("#search").on("click", function () {
        d3.select("#search0").style("display", "block");
        d3.select(window).on("keydown", function () {
          if (d3.event.keyCode == 67) {
            console.log("ohoho");
            d3.select("#search0").style("display", "none");
            d3.select("#search1").style("display", "block");
            d3.selectAll(".searchBDA").on("mouseenter", function () {
              var th = d3.select(this);
              th.style("background-color", "#E6E6E6");
              var id = th.attr("id");
              if (id == "searchB") {
                dataRight_cl(dataSearch);
                appRight_cl(appKacheln_search);
                d3.select("#headbar_app")
                  .select("p")
                  .select("span")
                  .select("#fm")
                  .text(5);
                d3.select("#headbar_data")
                  .select("p")
                  .select("span")
                  .select("#fm")
                  .text(15);
              } else if (id == "searchD") {
                dataRight_cl(dataSearch);
                appAll_cl();
                d3.select("#headbar_app")
                  .select("p")
                  .select("span")
                  .select("#fm")
                  .text(211);
                d3.select("#headbar_data")
                  .select("p")
                  .select("span")
                  .select("#fm")
                  .text(15);
              } else if (id == "searchA") {
                dataAll_cl();
                appRight_cl(appKacheln_search);
                d3.select("#headbar_app")
                  .select("p")
                  .select("span")
                  .select("#fm")
                  .text(5);
                d3.select("#headbar_data")
                  .select("p")
                  .select("span")
                  .select("#fm")
                  .text(1250);
              }
            });
            d3.selectAll(".searchBDA").on("mouseleave", function () {
              d3.select(this).style("background-color", "transparent");
            });
            d3.selectAll(".searchBDA").on("click", function () {
              d3.select("#search1").style("display", "none");
              d3.select("#search_feld")
                .style("display", "inline")
                .on("click", function () {
                  d3.select("#search_feld").style("display", "none");
                  appAll_cl();
                  dataAll_cl();
                  d3.select("#headbar_app")
                    .select("p")
                    .select("span")
                    .select("#fm")
                    .text(211);
                  d3.select("#headbar_data")
                    .select("p")
                    .select("span")
                    .select("#fm")
                    .text(1250);
                });
              d3.select(window).on("keydown", null);
            });
          }
        });
      });
    });
    d3.select("#visibility").on("mouseenter", function () {
      if (VISIWINSTATUS == 0 && VISISTATUS == 0) {
        d3.select(this)
          .attr("src", "assets/img/icons/visibility_hover.png")
          .on("mouseleave", function () {
            d3.select(this).attr("src", "assets/img/icons/visibility_off.png");
          });
      }

      d3.select(this).on("click", function () {
        if (VISIWINSTATUS == 0) {
          d3.select("#visibilityWin").style("display", "block");
          VISIWINSTATUS = 1;

          d3.select("#visiSlider_block").on("click", function () {
            if (VISISTATUS == 0) {
              d3.select("#visiSlider")
                .transition()
                .duration(500)
                .style("transform", "translateX(26px)")
                .style("background-color", "#5A9CB2")
                .on("end", function () {
                  d3.select("#visibility").attr(
                    "src",
                    "assets/img/icons/visibility_on.png"
                  );
                });
              d3.select("#details_inhalt").attr(
                "src",
                "assets/img/inhalt/details_visi.png"
              );
              VISISTATUS = 1;
            } else {
              d3.select("#visiSlider")
                .transition()
                .duration(500)
                .style("transform", "translateX(0px)")
                .style("background-color", "#B6B6B6")
                .on("end", function () {
                  d3.select("#visibility").attr(
                    "src",
                    "assets/img/icons/visibility_off.png"
                  );
                });
              d3.select("#details_inhalt").attr(
                "src",
                "assets/img/inhalt/details_normal.png"
              );
              VISISTATUS = 0;
            }
          });
        } else {
          d3.select("#visibilityWin").style("display", "none");
          VISIWINSTATUS = 0;
        }
      });
    });
    d3.select("#shield").on("mouseenter", function () {
      var th = d3.select(this);
      var x = th._groups[0][0].x - 16;
      var y = th._groups[0][0].y - 11;
      console.log(th._groups[0][0].x);
      d3.select("#shield_info")
        .style("display", "block")
        .style("transform", "translate(" + x + "px, " + y + "px)");
      th.on("mouseleave", function () {
        d3.select("#shield_info").style("display", "none");
      });
    });
    d3.select("#clusterButton").on("click", function () {
      d3.select("#clusterList").style("display", "block");
      d3.select("#closeCluster").on("click", function () {
        d3.select("#clusterList").style("display", "none");
      });
    });

    var c = document.getElementById("imgData");
    var ctx = c.getContext("2d");
    var faceImg = document.getElementById("faceImg");
    ctx.drawImage(faceImg, 0, 0);
    var faceData = ctx.getImageData(0, 0, 320, 320);
    var cataData = [];
    var counter = 0;
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 2; j++) {
        counter++;
        var id = "icon" + counter.toString();
        var img = document.getElementById(id);
        ctx.drawImage(img, 320 + 160 * j, 160 * i);
        cataData.push(ctx.getImageData(320 + 160 * j, 160 * i, 160, 160));
      }
    }
    var sourceData = [];
    var counter_s = 0;
    for (var i = 0; i < 3; i++) {
      counter_s++;
      var id = "icon_s" + counter_s.toString();
      var img = document.getElementById(id);
      ctx.drawImage(img, 160 * i, 320);
      sourceData.push(ctx.getImageData(160 * i, 320, 160, 160));
    }
    var sourceName = [
      "my self", //0

      "Tax Bureau", //1-4
      "Citizen Office",
      "Vehicle Administration",
      "business Doctor",

      "my Supervisor", //5-9
      "Apartment ITH",
      "Apartment HR",
      "Apartment IT",
      "System generated",
    ];
    var recipientName = [
      "my self",
      "All employee",
      "my supervisor",
      "Apartment ITH",
      "Apartment HR",
      "Apartment IT",
      "transportation bureau",
      "Controller A",
      "Controller B",
    ];
    var categories = [
      "Identifikation",
      "Sicherheit",
      "Ausbildung",
      "Schulung&Gehalts",
      "Aufzeichnung",
      "Basic",
      "Struktur",
    ];
    var cate_4 = [
      "Sensitive",
      "Sensitive",
      "Assessment",
      "Assessment",
      "Recordings",
      "Basic",
      "Basic",
    ];
    var cateScale = d3.scaleOrdinal().domain(categories).range(cate_4);

    var colors = [
      "#066963",
      "#14609A",
      "#268A87",
      "#4481B1",
      "#63B1B1",
      "#7EA9CC",
      "#A5DADA",
      "#BAD2E9",
    ];
    // var colors = [  "#0A6773", "#2C5DA2", "#28909E", "#5D84BA", "#60B7C3", "#90ACD3", "#A3DBE3", "#C1D2EB" ]; //绿紫
    // var colors = [  "#007870", "#186198", "#3F9F9C", "#5487B4", "#77BCBC", "#8AAED0", "#9BD2D2", "#BAD2E9" ]; //调蓝
    // var colorScale = d3.scaleOrdinal().domain(categories).range(colors);

    //https://gist.github.com/mjackson/5311256
    function rgbToHsl(r, g, b) {
      (r /= 255), (g /= 255), (b /= 255);

      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h,
        s,
        l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      return [h, s, l];
    }

    function getFaceData(numberOfPoints_Max) {
      var data = [];
      var data_key = [];
      var n = numberOfPoints_Max;
      var fn = 0;
      var i = 1;
      while (fn < n && i < 320) {
        var data_level_l = [];
        var data_level_map = d3.map();
        var decimalMark = 0.001; // 以免重复，加几位的 顺序区分 小数。。三位应该足够？
        var m_y = 320 / i; // 18.12修改 原为320-i 导致每级的数量差越来越大
        var m_x = (m_y * 2) / Math.sqrt(3);
        var numbOfRank = 0;
        for (var y = 0; y <= 320; y += m_y) {
          numbOfRank++;
          cy = Math.floor(y);
          for (var x = 0; x <= 320; x += m_x) {
            var rx =
              numbOfRank / 2 == Math.floor(numbOfRank / 2) ? x : x + m_x / 2; // 急需调整(done)
            var cx = Math.floor(rx);

            var r = faceData.data[(cx + cy * 320) * 4];
            var g = faceData.data[(cx + cy * 320) * 4 + 1];
            var b = faceData.data[(cx + cy * 320) * 4 + 2];
            var hsl = rgbToHsl(r, g, b);

            if (hsl[2] < 1) {
              //这个对图片质量还有要求。。
              // var obj = {x:rx, y:y, r:(320-i)/2, h:hsl[0], l:hsl[2]};
              var obj = {
                x: rx,
                y: y - 320 / i / 3,
                r: 320 / i / 2,
                h: hsl[0],
                l: hsl[2],
              }; //粗糙地调整下位置。。
              // console.log(rx+","+y);
              var ld = Math.floor(hsl[2] * 10000) + decimalMark;
              // console.log(ld);
              data_level_l.push(ld);
              data_level_map.set(ld, obj);
              decimalMark += 0.001;
            }
          }
        }
        i++;
        if (fn < data_level_map.keys().length - 1) {
          data.push(data_level_map);
          data_key.push(data_level_l); // no sort(), 因为我们之后需要一个中间填满的顺序。。。
        }
        fn = data_level_map.keys().length - 1;
      }

      return {
        map: data,
        keys: data_key,
      };
    }

    function getDataAndPointsCorresponding_cata(data, cataData) {
      var d = data;
      // console.log(data_frame);
      var c = [];
      (c[0] = []), (c[1] = []), (c[2] = []), (c[3] = []);

      for (x in d) {
        var e = d[x];
        var ct = e.category;
        switch (ct) {
          case "Identifikation":
            c[0].push(e);
            break;
          case "Sicherheit":
            c[0].push(e);
            break;
          case "Ausbildung":
            c[1].push(e);
            break;
          case "Schulung&Gehalts":
            c[1].push(e);
            break;
          case "Aufzeichnung":
            c[2].push(e);
            break;
          case "Basic":
            c[3].push(e);
            break;
          case "Struktur":
            c[3].push(e);
            break;
        }
      }

      for (var a = 0; a < 4; a++) {
        var n = c[a].length;
        var fn = 0;
        var i = 0;
        var data = [];
        while (fn < n && i < 160) {
          data = [];
          var m_y = 160 / i;
          var m_x = ((160 / i) * 2) / Math.sqrt(3);
          var numbOfRank = 0;
          for (var y = 0; y <= 160; y += m_y) {
            numbOfRank++;
            cy = Math.floor(y);
            for (var x = 0; x <= 160; x += m_x) {
              var rx =
                numbOfRank / 2 == Math.floor(numbOfRank / 2) ? x : x + m_x / 2;
              var cx = Math.round(rx);

              var r = cataData[a].data[(cx + cy * 160) * 4];
              var g = cataData[a].data[(cx + cy * 160) * 4 + 1];
              var b = cataData[a].data[(cx + cy * 160) * 4 + 2];

              if (r < 250) {
                //非白即黑
                var obj = { x: rx, y: y, r: 160 / i / 2 };
                data.push(obj);
              }
            }
          }
          i++;
          fn = data.length;
        }
        // console.log("fn = "+fn);
        // console.log("c-length = "+c[a].length);//看来是没问题的 现实如此 除非用圆心

        c[a].forEach(function (e, index) {
          e.x_cata = data[index].x / data[index].r;
          e.y_cata = data[index].y / data[index].r;
          e.r_cata = data[index].r;
          // e.y_cata = data[index].y;
          e.cata = a;
        });
        // console.log("data");
        // console.log(cataData[a]);
      }
    }
    function getDataAndPointsCorresponding_source(data, sourceData) {
      var d = data;
      // console.log(data_frame);
      var c = [];
      (c[0] = []), (c[1] = []), (c[2] = []);

      for (x in d) {
        var e = d[x];
        var so = e.source;
        if (sourceName.indexOf(so) == 0) {
          c[0].push(e);
        } else if (sourceName.indexOf(so) > 4) {
          c[1].push(e);
        } else {
          c[2].push(e);
        }
      }

      for (var a = 0; a < 3; a++) {
        var n = c[a].length;
        var fn = 0;
        var i = 0;
        var data = [];
        while (fn < n && i < 160) {
          data = [];
          var m_y = 160 / i;
          var m_x = ((160 / i) * 2) / Math.sqrt(3);
          var numbOfRank = 0;
          for (var y = 0; y <= 160; y += m_y) {
            numbOfRank++;
            cy = Math.floor(y);
            for (var x = 0; x <= 160; x += m_x) {
              var rx =
                numbOfRank / 2 == Math.floor(numbOfRank / 2) ? x : x + m_x / 2;
              var cx = Math.round(rx);

              var r = sourceData[a].data[(cx + cy * 160) * 4];
              var g = sourceData[a].data[(cx + cy * 160) * 4 + 1];
              var b = sourceData[a].data[(cx + cy * 160) * 4 + 2];

              if (r < 250) {
                //非白即黑
                var obj = { x: rx, y: y, r: 160 / i / 2 };
                data.push(obj);
              }
            }
          }
          i++;
          fn = data.length;
        }

        c[a].forEach(function (e, index) {
          e.x_source = data[index].x / data[index].r;
          e.y_source = data[index].y / data[index].r;
          e.r_source = data[index].r;
          // e.y_source = data[index].y;
          e.sourceRank = a;
        });
        // console.log("data");
        // console.log(sourceData[a]);
      }
    }
    function correctOrigin_cata(n, r1, r2) {
      var coordi = [];
      (coordi[0] = [80, 80]),
        (coordi[1] = [240, 55]),
        (coordi[2] = [80, 260]),
        (coordi[3] = [240, 240]);
      var dx = coordi[n][0] - ((160 / r1) * r2) / 2; //有问题啊 此r非彼r
      var dy = coordi[n][1] - ((160 / r1) * r2) / 2;

      return { dx: dx, dy: dy };
    }
    function correctOrigin_source(n, r1, r2) {
      var coordi = [];
      (coordi[0] = [170, 310]),
        (coordi[1] = [100, 110]),
        (coordi[2] = [280, 150]);
      var dx = coordi[n][0] - ((160 / r1) * r2) / 2;
      var dy = coordi[n][1] - ((160 / r1) * r2) / 2;

      return { dx: dx, dy: dy };
    }

    function pointsCorrespondingFace(data_frame, faceData) {
      var df = data_frame;
      // console.log(data_frame);
      var amount_l1 = 0,
        amount_l2 = 0,
        amount_l3 = 0,
        amount_l4 = 0;
      var c1 = [],
        c2 = [],
        c3 = [],
        c4 = [],
        c5 = [],
        c6 = [],
        c7 = [],
        c8 = [];

      for (x in df) {
        var e = df[x];
        var c = e.category;
        var s = e.source;
        switch (c) {
          case "Identifikation":
            amount_l1++;
            if (sourceName.indexOf(s) < 5) {
              c1.push(e);
              e.color = colors[0];
            } else {
              c2.push(e);
              e.color = colors[1];
            }

            break;
          case "Sicherheit":
            amount_l1++;
            if (sourceName.indexOf(s) < 5) {
              c1.push(e);
              e.color = colors[0];
            } else {
              c2.push(e);
              e.color = colors[1];
            }

            break;
          case "Ausbildung":
            amount_l2++;
            if (sourceName.indexOf(s) < 5) {
              c3.push(e);
              e.color = colors[2];
            } else {
              c4.push(e);
              e.color = colors[3];
            }

            break;
          case "Schulung&Gehalts":
            amount_l2++;
            if (sourceName.indexOf(s) < 5) {
              c3.push(e);
              e.color = colors[2];
            } else {
              c4.push(e);
              e.color = colors[3];
            }
            break;
          case "Aufzeichnung":
            amount_l3++;
            if (sourceName.indexOf(s) < 5) {
              c5.push(e);
              e.color = colors[4];
            } else {
              c6.push(e);
              e.color = colors[5];
            }

            break;
          case "Basic":
            amount_l4++;
            if (sourceName.indexOf(s) < 5) {
              c7.push(e);
              e.color = colors[6];
            } else {
              c8.push(e);
              e.color = colors[7];
            }
            break;
          case "Struktur":
            amount_l4++;
            c8.push(e);
            e.color = colors[7];
            break;
        }
      }
      // choice the right map..
      var rightNum;
      faceData.keys.forEach(function (e, index) {
        if (e.length <= data_frame.length) {
          rightNum = index + 1;
        }
      });
      var map = faceData.map[rightNum];
      var key = faceData.keys[rightNum].slice(0, data_frame.length); // not effect the original。。也不是在取值时候丢失的。。。

      key.sort(function (a, b) {
        return a - b;
      });

      var a = 0;
      var b = amount_l1;
      var c = b + amount_l2;
      var d = c + amount_l3;
      var f = d + amount_l4;

      var index1, index3, index5, index7;
      if (c1.length > 0) {
        c1.forEach(function (e, index) {
          e.x = arrayForHue(a, b, key, map)[index].x;
          e.y = arrayForHue(a, b, key, map)[index].y;
          e.r = arrayForHue(a, b, key, map)[index].r;
          index1 = index;
        });
      }
      if (c2.length > 0) {
        if (index1 == undefined) index1 = -1;
        c2.forEach(function (e, index) {
          e.x = arrayForHue(a, b, key, map)[index + index1 + 1].x;
          e.y = arrayForHue(a, b, key, map)[index + index1 + 1].y;
          e.r = arrayForHue(a, b, key, map)[index + index1 + 1].r;
        });
      }
      if (c3.length > 0) {
        c3.forEach(function (e, index) {
          e.x = arrayForHue(b, c, key, map)[index].x;
          e.y = arrayForHue(b, c, key, map)[index].y;
          e.r = arrayForHue(b, c, key, map)[index].r;
          index3 = index;
        });
      }
      if (c4.length > 0) {
        if (index3 == undefined) index3 = -1;
        c4.forEach(function (e, index) {
          e.x = arrayForHue(b, c, key, map)[index + index3 + 1].x;
          e.y = arrayForHue(b, c, key, map)[index + index3 + 1].y;
          e.r = arrayForHue(b, c, key, map)[index + index3 + 1].r;
        });
      }
      if (c5.length > 0) {
        c5.forEach(function (e, index) {
          e.x = arrayForHue(c, d, key, map)[index].x;
          e.y = arrayForHue(c, d, key, map)[index].y;
          e.r = arrayForHue(c, d, key, map)[index].r;
          index5 = index;
        });
      }

      if (c6.length > 0) {
        if (index5 == undefined) index5 = -1;
        c6.forEach(function (e, index) {
          e.x = arrayForHue(c, d, key, map)[index + index5 + 1].x;
          e.y = arrayForHue(c, d, key, map)[index + index5 + 1].y;
          e.r = arrayForHue(c, d, key, map)[index + index5 + 1].r;
        });
      }
      if (c7.length > 0) {
        c7.forEach(function (e, index) {
          e.x = arrayForHue(d, f, key, map)[index].x;
          e.y = arrayForHue(d, f, key, map)[index].y;
          e.r = arrayForHue(d, f, key, map)[index].r;
          index7 = index;
        });
      }
      if (c8.length > 0) {
        if (index7 == undefined) index7 = -1;
        c8.forEach(function (e, index) {
          e.x = arrayForHue(d, f, key, map)[index + index7 + 1].x;
          e.y = arrayForHue(d, f, key, map)[index + index7 + 1].y;
          e.r = arrayForHue(d, f, key, map)[index + index7 + 1].r;
        });
      }
    }

    function arrayForHue(a, b, key, map) {
      var map_h = d3.map();
      var key_h = [];

      var decimalMark = 0.001; //居然是这里 忘记用小数了 28.11 02
      key.slice(a, b).forEach(function (e) {
        var o = map.get(e.toString());
        var h = Math.floor(o.h * 10000) + decimalMark;
        key_h.push(h);
        map_h.set(h, o);

        decimalMark += 0.001;
      });

      var output = [];
      key_h
        .sort(function (a, b) {
          return a - b;
        })
        .forEach(function (e) {
          output.push(map_h.get(e.toString()));
        });

      return output;
    }

    svg = d3
      .select("#faceDiv")
      .append("svg")
      .attr("id", "face")
      .attr("height", HEIGHT)
      .attr("width", WIDTH)
      .style("overflow", "visible");
    var defs = svg.append("defs");
    defs
      .append("clipPath")
      .attr("id", "clip_face")
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", INNERRADIUS - 14)
      .attr("transform", function () {
        var x = MITT_W;
        var y = OFFSET_APP_Y;
        return "translate(" + x + "," + y + ")";
      });
    defs
      .append("clipPath")
      .attr("id", "clip_link")
      .append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", INNERRADIUS);

    g_links = svg
      .append("g")
      .attr("transform", function () {
        var x = MITT_W;
        var y = OFFSET_LINK_Y;
        return "translate(" + x + "," + y + ")";
      })
      .attr("clip-path", "url(#clip_link)");
    g_face_container = svg.append("g");
    g_face_container
      .append("circle")
      .attr("id", "lupe_area")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", INNERRADIUS)
      .attr("opacity", 0)
      .attr("transform", function () {
        var x = MITT_W;
        var y = OFFSET_FACECONTAINER_Y;
        return "translate(" + x + "," + y + ")";
      });
    g_face_zoom = g_face_container.append("g");
    g_face = g_face_zoom.append("g").attr("transform", function () {
      var x = OFFSET_FACE_X;
      var y = OFFSET_FACE_Y;
      return "translate(" + x + "," + y + ")";
    });
    g_text = svg
      .append("g")
      .attr("id", "dialog")
      .attr("transform", function () {
        var y = OFFSET_TEXT_Y;
        return "translate(0," + y + ")";
      });
    g_apps = svg.append("g").attr("transform", function () {
      var x = MITT_W;
      var y = OFFSET_APP_Y;
      return "translate(" + x + "," + y + ")";
    });

    g_text
      .append("text")
      .attr("id", "number")
      .attr("fill", "#ddd")
      .attr("text-anchor", "middle")
      .attr("font-size", "48px")
      .attr("x", WIDTH / 2)
      .attr("y", -100)
      .attr("opacity", 0)
      .text(0)
      .transition()
      .duration(TRANSITION_DURATION / 2)
      .attr("opacity", 1);

    button = d3
      .select("#buttonDiv")
      .append("svg")
      .attr("id", "button")
      .attr("transform", function () {
        var x = MITT_W - 160;
        return "translate(" + x + ", 0)";
      })
      .attr("height", 100)
      .attr("width", 320)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

    var dataDatum_map = d3.map(); //这个前提是 没有重复时间的数据 如果出现 就打开毫秒差。。
    var dataDatum = [];

    var appsDatum_map = d3.map();
    var appsDatum = [];
    var appsName_map = d3.map();
    var appsName = [];

    // getFaceData check, need the fake data...
    d3.json("fakeData1.json", function (error, data) {
      if (error) throw error;

      for (c in categories) {
        data[categories[c]].forEach(function (e) {
          var d = new Date(e.datum);
          e.apps = [];
          e.category = categories[c];
          dataDatum_map.set(d.getTime(), e);
          dataDatum.push(d.getTime());
        });
      }
      dataDatum.sort(function (a, b) {
        return a - b;
      });
      var dataChrono = [];
      dataDatum.map(function (e) {
        dataChrono.push(dataDatum_map.get(e));
      });

      var dataLink = [];
      var dataLink_map_s = d3.map();
      var dataLink_map_t = d3.map();
      data.apps.forEach(function (e) {
        appsDatum.push(e.datum);
        appsDatum_map.set(e.datum, e);
        appsName.push(e.name);
        appsName_map.set(e.name, e);
        e.data.forEach(function (d) {
          dataChrono.forEach(function (c) {
            if (c.name == d.name) {
              d.data = c;
              c.apps.push(e);
              var ob = { source: c, target: e };
              dataLink.push(ob);
              var arrayS = dataLink_map_s.get(c.name);
              if (arrayS) {
                arrayS.push(ob);
              } else {
                dataLink_map_s.set(c.name, [ob]);
              }
              var arrayT = dataLink_map_t.get(e.name);
              if (arrayT) {
                arrayT.push(ob);
              } else {
                dataLink_map_t.set(e.name, [ob]);
              }
            }
          });
        });
      });
      // console.log(dataLink_map_t);
      // console.log(dataChrono);
      appsDatum.sort(function (a, b) {
        return a - b;
      });
      var appsChrono = [];
      appsDatum.map(function (e) {
        appsChrono.push(appsDatum_map.get(e));
      });
      appsName.sort();
      var appsAlphabet = [];
      appsName.map(function (e) {
        appsAlphabet.push(appsName_map.get(e));
      });
      appsAlphabet.forEach(function (d, index) {
        var angle = 360 / appsAlphabet.length;
        d.angle_alph = angle * index;
      });
      // console.log("appsChrono:");
      // console.log(appsChrono);
      var appsDatausage = appsChrono.concat();
      appsDatausage.sort(function (a, b) {
        return b.data.length - a.data.length;
      });
      appsDatausage.forEach(function (d, index) {
        var angle = 360 / appsDatausage.length;
        d.angle_usg = angle * index;
      });
      // console.log(appsDatausage);
      //还需要一个alphabetisch的！

      // just one time
      var faceData = getFaceData(dataDatum.length);
      if (faceData.keys.length == 0) throw "no photo";

      getDataAndPointsCorresponding_cata(dataChrono, cataData);
      getDataAndPointsCorresponding_source(dataChrono, sourceData);

      var DataPoints = g_face.append("g").attr("id", "DataPoints");

      // hier would be a position for animation
      var timer = 1;
      var end = 0;
      var numb_data = 0;

      function kaichang() {
        var frame = 3;

        var bis0 = Math.floor(
          (timer / frame) * (timer / frame) * dataChrono.length
        );
        var bis = bis0 == 0 ? 1 : bis0;

        var dataframe = dataChrono.slice(0, bis);
        pointsCorrespondingFace(dataframe, faceData);
        var nodes_data = DataPoints.selectAll(".circle").data(
          dataframe,
          function (d) {
            return d.name;
          }
        );

        nodes_data.exit().remove();
        DataPoints.selectAll(".circle")
          .transition()
          .duration(TRANSITION_DURATION)
          .attr("opacity", 1)
          .attr("transform", function (d) {
            d.choose = 0;
            d.x0 = d.x;
            d.y0 = d.y;
            return "translate(" + d.x + "," + d.y + ")";
          });
        DataPoints.selectAll(".circle")
          .select("circle")
          .transition()
          .duration(TRANSITION_DURATION)
          .attr("r", function (d) {
            return d.r;
          });
        DataPoints.selectAll(".circle")
          .select("path")
          .transition()
          .duration(TRANSITION_DURATION)
          .attr("d", function (d) {
            var db = (d.r * 2) / Math.sqrt(3);
            var cb = (db * 2) / Math.sqrt(3);
            return (
              "M" +
              -db +
              " " +
              -cb / 2 +
              " L0 " +
              -cb +
              " L" +
              db +
              " " +
              -cb / 2 +
              " L" +
              db +
              " " +
              cb / 2 +
              " L0 " +
              cb +
              " L" +
              -db +
              " " +
              cb / 2 +
              " Z"
            );
          });

        var nodes_data_enter = nodes_data
          .enter()
          .append("g")
          .attr("class", "circle")
          .attr("id", function (d) {
            return d.name;
          })

          .attr("transform", function () {
            var xV = Math.random() * 1400 - 700;
            var zo = (Math.round(Math.random()) - 0.5) * 2;
            var y = zo * Math.sqrt(700 * 700 - xV * xV);

            return "translate(" + xV + "," + y + ")";
          })
          .attr("opacity", 0);

        nodes_data_enter
          .append("circle")
          .attr("class", "circlec")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("fill", function (d) {
            return d.color;
          })
          .attr("r", function (d) {
            return d.r;
          });
        nodes_data_enter
          .append("path")
          .attr("opacity", 0)
          .attr("d", function (d) {
            var db = (d.r * 2) / Math.sqrt(3);
            var cb = (db * 2) / Math.sqrt(3);
            return (
              "M" +
              -db +
              " " +
              -cb / 2 +
              " L0 " +
              -cb +
              " L" +
              db +
              " " +
              -cb / 2 +
              " L" +
              db +
              " " +
              cb / 2 +
              " L0 " +
              cb +
              " L" +
              -db +
              " " +
              cb / 2 +
              " Z"
            );
          });

        nodes_data_enter
          .transition()
          .duration(TRANSITION_DURATION)
          .delay(function () {
            return 500 * Math.random();
          })
          .attr("transform", function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
            return "translate(" + d.x + "," + d.y + ")";
          })
          .attr("opacity", 1)
          .on("end", function () {
            numb_data++;
            g_text.select("#number").text(numb_data);
          });

        if (timer == 1) {
          g_text
            .append("text")
            .attr("id", "dialog1")
            .attr("fill", "#78ADBF")
            .attr("text-anchor", "middle")
            .attr("font-size", 28)
            .attr("x", WIDTH / 2)
            .attr("y", 480)
            .attr("opacity", 0)
            .text("The more your data is mastered,")
            .transition()
            .duration(TRANSITION_DURATION)
            .delay(TRANSITION_DURATION)
            .attr("opacity", 1);
        } else if (timer == 2) {
          g_text
            .select("#dialog1")
            .transition()
            .duration(TRANSITION_DURATION)
            .delay(TRANSITION_DURATION / 2)
            .attr("font-size", 22)
            .attr("opacity", 0.8)
            .attr("y", 440);
          g_text
            .append("text")
            .attr("id", "dialog2")
            .attr("fill", "#78ADBF")
            .attr("text-anchor", "middle")
            .attr("font-size", 28)
            .attr("x", WIDTH / 2)
            .attr("y", 480)
            .attr("opacity", 0)
            .text("the clearer you will be for me.")
            .transition()
            .duration(TRANSITION_DURATION)
            .delay(TRANSITION_DURATION)
            .attr("opacity", 1);
        }

        if (bis < dataChrono.length) {
          timer++;
        }
        if (bis == dataChrono.length) {
          end = 1;
        }
      }

      function showHallo() {
        g_text
          .select("#dialog1")
          .transition()
          .duration(TRANSITION_DURATION)
          .remove()
          .attr("font-size", 16)
          .attr("opacity", 0)
          .attr("y", 410);
        g_text
          .select("#dialog2")
          .transition()
          .duration(TRANSITION_DURATION)
          .remove()
          .attr("font-size", 22)
          .attr("opacity", 0)
          .attr("y", 440);

        g_text
          .append("text")
          .attr("id", "hi")
          .attr("fill", "#78ADBF")
          .attr("text-anchor", "middle")
          .attr("font-size", 28)
          .attr("x", WIDTH / 2)
          .attr("y", 480)
          .attr("opacity", 0)
          .text("Hi, Tianheng!")
          .transition()
          .duration(TRANSITION_DURATION)
          .delay(TRANSITION_DURATION / 2)
          .attr("opacity", 1);
      }
      function hideHallo() {
        g_text
          .select("#hi")
          .transition()
          .duration(TRANSITION_DURATION)
          .remove()
          .attr("opacity", 0);
        g_text
          .select("#number")
          .transition()
          .duration(TRANSITION_DURATION)
          .remove()
          .attr("opacity", 0);
      }

      kaichang();

      var go = setInterval(function () {
        kaichang();
        if (end == 1) {
          setTimeout(function () {
            var start = 1;
            svg.on("mouseover", function () {
              if (start == 1) {
                hideHallo();
                showButton();
                d3.select("#headbar").style("display", "block");
                svg.on("mouseover", null);
                start = 0;

                setTimeout(function () {
                  showApps(appsChrono, dataDatum.length, dataLink_map_t);
                }, 500);
              }
            });
            showHallo();

            d3.selectAll(".modus").on("mouseenter", function () {
              var th = d3.select(this);
              var id = th.attr("id");
              console.log(id);
              if (th.style("opacity") == 0.25) {
                console.log(Modus);
                th.style("opacity", 0.5);
                th.on("click", function () {
                  d3.select("#" + Modus).style("opacity", 0.25);
                  Modus = id;
                  modusSwitch(Modus);
                  th.style("opacity", 1);
                });
                th.on("mouseleave", function () {
                  if (id !== Modus) {
                    th.style("opacity", 0.25);
                  }
                });
              }
            });

            g_face.selectAll(".circle").on("mouseenter", function (d) {
              var th = d3.select(this);
              showInfo(d, th);
            });
            g_face.selectAll(".circle").on("mouseleave", function (d) {
              // hideLinks();
              hideInfo();
            });
            g_face.selectAll(".circle").on("click", function (d) {
              var th = d3.select(this);
              infoRight_content(d);
              infoRight_show_d();
              if (INFOSTATUS == 0) {
                infoRight_show();
              }
              lockChoose(d, th);
            });

            addText();
            addTitel();

            g_face_container
              .attr("clip-path", "url(#clip_face)")
              .on("mouseenter", function () {
                svg.call(d3.zoom().scaleExtent([1, 12]).on("zoom", zoomed));
              });
            g_face_container.on("mouseleave", function () {
              svg.on(".zoom", null);
            });
          }, 1000);

          clearInterval(go);
        }
      }, 1800);
    });

    function loading() {}
    function appRight_cl(dataarray) {
      var data = dataarray;
      //d3.select("#appGrid").selectAll("img").remove();
      var grid = d3
        .select("#appGrid")
        .selectAll("img")
        .data(data, function (d) {
          return d;
        });
      grid.exit().remove();
      var gridEnter = grid
        .enter()
        .append("img")
        .attr("class", "appGrid")
        .attr("src", function (d) {
          var src = "assets/img/inhalt/grid" + d + ".png";
          return src;
        });
      gridEnter.on("mouseenter", function (d) {
        d3.select(this).classed("appGrid_hover", true);
      });
      gridEnter.on("click", function (d) {
        d3.select("#appGrid").selectAll("img").classed("appGrid_active", false);
        d3.select("#datalist").selectAll("p").classed("datalist_active", false);
        d3.select(this).classed("appGrid_active", true);
        // give it a data array (just for fake data)
        var d_a = { name: appKacheln_name[d] };
        infoRight_content(d_a);
        console.log(INFOSTATUS);
        infoRight_show_a();
        if (INFOSTATUS == 0) {
          infoRight_show();
        }
        CHOOSESTATUS = 1;
        showCrspd_data(d);
        if (NOTISTATUS == 0) {
          appAll_cl();
        }

        changeCrspd();
      });
      gridEnter.on("mouseleave", function (d) {
        d3.select(this).classed("appGrid_hover", false);
      });
    }
    function dataRight_cl(dataarray) {
      var data = dataarray;
      // d3.select("#datalist").selectAll("p").remove();
      var list = d3
        .select("#datalist")
        .selectAll("p")
        .data(data, function (d) {
          return d;
        });
      list.exit().remove();
      var listEnter = list
        .enter()
        .append("p")
        .attr("class", "datalist")
        .text(function (d) {
          return d;
        });
      listEnter.on("mouseenter", function (d) {
        d3.select(this).classed("datalist_hover", true);
      });
      listEnter.on("click", function (d) {
        d3.select("#datalist").selectAll("p").classed("datalist_active", false);
        d3.select("#appGrid").selectAll("img").classed("appGrid_active", false);
        d3.select(this).classed("datalist_active", true);

        var d_a = {
          name: d,
          value: dataValue[dataName.indexOf(d)],
          datum: 985720443717,
          category: "Basic",
          source: "my self",
        };
        infoRight_content(d_a);
        infoRight_show_d();
        if (INFOSTATUS == 0) {
          infoRight_show();
        }

        showCrspd_app(d);
        dataAll_cl();

        CHOOSESTATUS = 2;
        changeCrspd();
      });
      listEnter.on("mouseleave", function (d) {
        d3.select(this).classed("datalist_hover", false);
      });
    }
    function showCrspd_app(d) {
      // 一个用名字换算的数字（只是Prototyp用）
      // 3套之一
      var data = d;
      var num0 = data.charCodeAt(0);
      var gen = Math.floor(num0 / 3);
      var num = num0 - gen * 3;
      // 个数
      var genS = Math.floor(num0 / 26);
      var numS = Math.floor(20 + ((num0 - genS * 26) * (211 - 20)) / 26);

      appRight_cl(appKacheln_crspd[num]);
      d3.select("#headbar_app")
        .select("p")
        .select("span")
        .select("#fz_vsb")
        .style("display", "inline");
      d3.select("#headbar_app")
        .select("p")
        .select("span")
        .select("#fz_vsb")
        .select("#fz_num")
        .text(numS);
    }
    function showCrspd_data(d) {
      // 一个用名字换算的数字（只是Prototyp用）
      // 3套之一
      var num = d;
      // 个数
      var numS = appKacheln_num[d];
      var data = [];
      dataName.forEach(function (e, index) {
        if (data_crspd[num].indexOf(index) == -1) data.push(e);
      });
      dataRight_cl(data);
      d3.select("#headbar_data")
        .select("p")
        .select("span")
        .select("#fz_vsb")
        .style("display", "inline");
      d3.select("#headbar_data")
        .select("p")
        .select("span")
        .select("#fz_vsb")
        .select("#fz_num")
        .text(numS);
    }
    function dataAll_cl() {
      var dataarray = dataName;
      dataRight_cl(dataarray);
      d3.select("#headbar_data")
        .select("p")
        .select("span")
        .select("#fz_vsb")
        .style("display", "none");
      d3.select("#headbar_data")
        .select("p")
        .select("span")
        .select("#fm")
        .text(1250);
    }
    function appAll_cl() {
      var data = appKacheln_all;
      appRight_cl(data);
      d3.select("#headbar_app")
        .select("p")
        .select("span")
        .select("#fz_vsb")
        .style("display", "none");
      d3.select("#headbar_app")
        .select("p")
        .select("span")
        .select("#fm")
        .text(211);
    }
    function removeChoose() {
      d3.select("#appGrid").selectAll("img").classed("appGrid_active", false);
      d3.select("#datalist").selectAll("p").classed("datalist_active", false);
      console.log("hi");
      CHOOSESTATUS = 0;
      changeCrspd();
      dataAll_cl();
      appAll_cl();
    }
    function changeCrspd() {
      d3.select("#crspd").attr(
        "src",
        "assets/img/icons/crspd" + CHOOSESTATUS + ".png"
      );
    }

    function modusSwitch(goal) {
      var go = goal;
      if (go == "classic") {
        d3.select("#ctn_ex").style("display", "none");
        d3.select("#ctn_cl").style("display", "block");
        dataAll_cl();
        appAll_cl();
      } else {
        d3.select("#ctn_cl").style("display", "none");
        d3.select("#ctn_ex").style("display", "block");
      }
    }

    function addTitel() {
      var g_titel = g_face.append("g").attr("pointer-events", "none");
      g_titel
        .append("text")
        .attr("id", "t_all")
        .attr("font-size", "14px")
        .attr("fill", "#D7D7D7")
        .attr("text-anchor", "middle")
        .attr("x", 160)
        .attr("y", 360)
        .attr("opacity", 0)
        .text("All data")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("opacity", 1);
      var gc = g_titel.append("g").attr("id", "t_cata").attr("opacity", 0);
      var pc = [
        [80, 175],
        [240, 120],
        [80, 345],
        [240, 355],
      ];
      var tc = ["Sensitive", "Performance", "Recordings", "Basic"];
      pc.forEach(function (a, index) {
        gc.append("text")
          .attr("font-size", "14px")
          .attr("fill", "#D7D7D7")
          .attr("text-anchor", "middle")
          .attr("x", a[0])
          .attr("y", a[1])
          .text(tc[index]);
      });
      var gs = g_titel.append("g").attr("id", "t_source").attr("opacity", 0);
      var ps = [
        [170, 410],
        [100, 230],
        [280, 230],
      ];
      var ts = ["My self", "Company", "3rd.Party"];
      ps.forEach(function (a, index) {
        gs.append("text")
          .attr("font-size", "14px")
          .attr("fill", "#D7D7D7")
          .attr("text-anchor", "middle")
          .attr("x", a[0])
          .attr("y", a[1])
          .text(ts[index]);
      });
    }
    function addText() {
      g_face
        .selectAll(".circle")
        .append("text")
        .attr("display", "none")
        .attr("fill", "#fff")
        .attr("text-anchor", "middle")
        .attr("font-size", function (d) {
          return d.r / 3 + "px";
        })
        .attr("x", 0)
        .attr("y", 0)
        .text(function (d) {
          var str1 = d.name;
          d.str2 = "";
          var l = d.name.length;
          if (l > 10) {
            index_u = [];
            index_n = [];
            for (var i = 1; i < l; i++) {
              var char = d.name.charCodeAt(i);
              if (char > 64 && char < 91) {
                index_u.push(i);
              } else if (char > 47 && char < 58) {
                index_n.push(i);
              }
            }

            if (index_u.length > 0 && index_u[0] < 11) {
              str1 = d.name.slice(0, index_u[0]);
              d.str2 = d.name.slice(index_u[0], l);
            } else if (index_n.length > 0 && index_n[0] < 11) {
              str1 = d.name.slice(0, index_n[0]);
              d.str2 = d.name.slice(index_n[0], l);
            } else {
              str1 = d.name.slice(0, 9) + "-";
              d.str2 = d.name.slice(9, l);
            }
          }
          return str1;
        })
        .append("tspan")
        .attr("text-anchor", "middle")
        .attr("x", 0)
        .attr("y", 1)
        .text(function (d) {
          return d.str2;
        });
    }

    function showButton() {
      var tx = 70 - (22 / (INNERRADIUS - 14)) * MITT_W;
      var ty = 50 - (22 / (INNERRADIUS - 14)) * OFFSET_APP_Y;

      var buttonData = [
        { id: "Digital Twin", status: 1, href: "assets/img/buttonP.png" },
        { id: "Categories", status: 0, href: "assets/img/buttonC.png" },
        { id: "Sources", status: 0, href: "assets/img/buttonS.png" },
      ];
      var buttons = button.selectAll(".button").data(buttonData, function (d) {
        return d.id;
      });
      var buttonsEnter = buttons
        .enter()
        .append("g")
        .attr("class", "button")
        .attr("transform", function (d, index) {
          return "translate(" + (70 + index * 90) + " ,50)";
        })
        .attr("opacity", function (d) {
          var op = d.status == 1 ? 1 : 0.5;
          return op;
        });
      buttonsEnter
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 22)
        .attr("fill", "#fff")
        .attr("opacity", 0);
      buttonsEnter
        .append("image")
        .attr("x", -16)
        .attr("y", -16)
        .attr("width", 32)
        .attr("height", 32)
        .attr("href", function (d) {
          return d.href;
        });
      buttonsEnter
        .append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("fill", function (d) {
          var op = d.status == 1 ? "#4A4A4A" : "#4D97AC";
          return op;
        })
        .text(function (d) {
          return d.id;
        });
      buttonsEnter.on("mouseenter", function (d) {
        var th = d3.select(this);
        if (d.status == 0) {
          th.attr("opacity", 1).on("mouseleave", function () {
            th.attr("opacity", 0.5);
          });
          th.on("click", function (d) {
            buttonsEnter.each(function (e) {
              var thi = d3.select(this);
              if (e.id == d.id) {
                e.status = 1;
                thi.select("text").attr("fill", "#4A4A4A");
              } else {
                e.status = 0;
                thi.attr("opacity", 0.5);
                thi.select("text").attr("fill", "#4D97AC");
              }
            });
            th.on("mouseleave", null);

            var ds = 0;
            switch (d.id) {
              case "Digital Twin":
                switchToFace();
                break;
              case "Categories":
                ds = 90;
                switchToCata();
                break;
              case "Sources":
                ds = 180;
                switchToSource();
                break;
            }
            button
              .select("#quan")
              .transition()
              .duration(TRANSITION_DURATION2)
              .attr("transform", "translate(" + (tx + ds) + "," + ty + ")");
          });
        }
      });

      var quan = button
        .append("g")
        .attr("id", "quan")
        .attr("transform", "translate(" + tx + "," + ty + ")");

      var quan_g = quan.append("g");
      quan_g
        .append("circle")
        .attr("fill", "none")
        .attr("cx", (22 / (INNERRADIUS - 14)) * MITT_W)
        .attr("cy", (22 / (INNERRADIUS - 14)) * OFFSET_APP_Y)
        .attr("r", 22)
        .attr("stroke", "#4A4A4A")
        .attr("stroke-width", 1);
      quan_g
        .append("circle")
        .attr("fill", "none")
        .attr("cx", (22 / (INNERRADIUS - 14)) * MITT_W)
        .attr("cy", (22 / (INNERRADIUS - 14)) * OFFSET_APP_Y)
        .attr("r", 24)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);
    }

    function switchToCata() {
      //自由排列 还是用d3的force比较好。。先试下icon的样子（用阵列）
      g_face
        .selectAll(".circle")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", function (d) {
          d.x0 = d.x_cata * d.r + correctOrigin_cata(d.cata, d.r_cata, d.r).dx;
          d.y0 = d.y_cata * d.r + correctOrigin_cata(d.cata, d.r_cata, d.r).dy;
          return "translate(" + d.x0 + "," + d.y0 + ")";
        });
      d3.select("#t_cata")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("opacity", 1);
      d3.select("#t_all").attr("opacity", 0);
      d3.select("#t_source").attr("opacity", 0);
    }
    function switchToSource() {
      g_face
        .selectAll(".circle")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", function (d) {
          d.x0 =
            d.x_source * d.r +
            correctOrigin_source(d.sourceRank, d.r_source, d.r).dx;
          d.y0 =
            d.y_source * d.r +
            correctOrigin_source(d.sourceRank, d.r_source, d.r).dy;
          return "translate(" + d.x0 + "," + d.y0 + ")";
        });
      d3.select("#t_source")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("opacity", 1);
      d3.select("#t_cata").attr("opacity", 0);
      d3.select("#t_all").attr("opacity", 0);
    }
    function switchToFace() {
      g_face
        .selectAll(".circle")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
          return "translate(" + d.x0 + "," + d.y0 + ")";
        });
      d3.select("#t_all")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("opacity", 1);
      d3.select("#t_cata").attr("opacity", 0);
      d3.select("#t_source").attr("opacity", 0);
    }

    function switchToAlphabet() {
      g_apps
        .selectAll(".line")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", function (d) {
          d.angle0 = d.angle_alph;
          return "rotate(" + d.angle_alph + ")";
        });
    }
    function switchToUsage() {
      g_apps
        .selectAll(".line")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", function (d) {
          d.angle0 = d.angle_usg;
          return "rotate(" + d.angle_usg + ")";
        });
    }
    function switchToChrono() {
      g_apps
        .selectAll(".line")
        .transition()
        .duration(TRANSITION_DURATION)
        .attr("transform", function (d) {
          d.angle0 = d.angle;
          return "rotate(" + d.angle + ")";
        });
    }
    function ordnerClick(d, th) {
      if (d.stage == "c") {
        th.attr("href", "assets/img/datausage.png")
          .attr("opacity", 1)
          .on("mouseleave", function () {
            d3.select(this)
              .attr("href", "assets/img/chronological.png")
              .attr("opacity", 0.5);
          });
        th.on("click", function () {
          d3.select(this).attr("opacity", 0.5).on("mouseleave", null);
          d.stage = "u";
          switchToUsage();
        });
      } else {
        th.attr("href", "assets/img/chronological.png")
          .attr("opacity", 1)
          .on("mouseleave", function () {
            d3.select(this)
              .attr("href", "assets/img/datausage.png")
              .attr("opacity", 0.5);
          });
        th.on("click", function () {
          d3.select(this).attr("opacity", 0.5).on("mouseleave", null);
          d.stage = "c";
          switchToChrono();
        });
      }
    }
    function showApps(apps, data_l, dataLink_map_t) {
      var ordner_data = [{ id: 1 }];
      var ordner = g_apps.selectAll("image").data(ordner_data, function (d) {
        return d.id;
      });
      ordner
        .enter()
        .append("image")
        .attr("id", "ordner")
        .attr("x", 0)
        .attr("y", -INNERRADIUS)
        .attr("width", 90)
        .attr("height", 30)
        .attr("opacity", 0.5)
        .attr("href", function (d) {
          d.stage = "c";
          return "assets/img/chronological.png";
        })
        .on("mouseenter", function (d) {
          ordnerClick(d, d3.select(this));
        });

      // var angle = 2*Math.PI/apps.length;
      var angle = 360 / apps.length;
      var nodes_apps = g_apps.selectAll(".line").data(apps, function (d) {
        return d.name;
      });

      var nodes_apps_enter = nodes_apps
        .enter()
        .append("g")
        .attr("class", "line")
        .attr("transform", function (d, index) {
          d.choose = 0;
          d.angle = angle * index;
          d.angle0 = d.angle;
          return "rotate(" + angle * index + ")";
        })
        .attr("display", "none");

      nodes_apps_enter
        .append("line")
        .attr("class", "linel")
        .attr("x1", 0)
        .attr("y1", -INNERRADIUS)
        .attr("x2", 0)
        .attr("y2", function (d) {
          d.lang =
            STROCKE_MIN +
            ((STROCKE_MAX - STROCKE_MIN) * d.data.length) / data_l;
          var y2 = -(INNERRADIUS + d.lang);
          return y2;
        })
        .attr("stroke-width", 4)
        .attr("stroke", function (d) {
          var c_r = 0;
          var c_g = 0;
          var c_b = 0;
          d.data.forEach(function (n) {
            c_r += Number("0x" + n.data.color.slice(1, 3));
            c_g += Number("0x" + n.data.color.slice(3, 5));
            c_b += Number("0x" + n.data.color.slice(5, 7));
          });
          c_r = Math.floor(c_r / d.data.length);
          c_g = Math.floor(c_g / d.data.length);
          c_b = Math.floor(c_b / d.data.length);

          d.color = "rgb(" + c_r + "," + c_g + "," + c_b + ")";
          return d.color;
        });
      nodes_apps_enter
        .append("path")
        .attr("d", function (d) {
          var a0 = -angle / 2 + 360;
          var a1 = angle / 2;

          var p0 = coopConverter_App(a0);
          var p1 = coopConverter_App(a1);
          var f = (100 + INNERRADIUS) / INNERRADIUS;

          var x0 = p0.x;
          var y0 = p0.y;
          var x1 = p1.x;
          var y1 = p1.y;
          var x2 = p1.x * f;
          var y2 = p1.y * f;
          var x3 = p0.x * f;
          var y3 = p0.y * f;

          return (
            "M" +
            x0 +
            " " +
            y0 +
            " L" +
            x1 +
            " " +
            y1 +
            " L" +
            x2 +
            " " +
            y2 +
            " L" +
            x3 +
            " " +
            y3 +
            " Z"
          );
        })
        .attr("opacity", 0);

      nodes_apps_enter
        .transition()
        .delay(function (d, index) {
          return index * 2;
        })
        .attr("display", "block");

      g_apps.selectAll(".line").on("mouseenter", function (d) {
        //不放这边不行

        var th = d3.select(this);
        // console.log(d.name);
        showInfo(d, th);
      });
      g_apps.selectAll(".line").on("mouseleave", function (d) {
        var th = d3.select(this);

        // hideLinks();
        hideInfo();
      });
      g_apps.selectAll(".line").on("click", function (d) {
        var th = d3.select(this);
        // console.log(d.name);
        infoRight_content(d);
        infoRight_show_a();
        if (INFOSTATUS == 0) {
          infoRight_show();
        }
        lockChoose(d, th);
      });
    }
    function transform_abstractor(trans) {
      var tf = trans == null ? "translate(0,0) scale(1)" : trans;
      var tl = tf.split(" ")[0];
      var sc = tf.split(" ")[1];
      var t_i_1 = tl.indexOf("(");
      var t_i_2 = tl.indexOf(",");
      var t_i_3 = tl.indexOf(")");
      var s_i_1 = sc.indexOf("(");
      var s_i_2 = sc.indexOf(")");

      var x = tl.slice(t_i_1 + 1, t_i_2);
      var y = tl.slice(t_i_2 + 1, t_i_3);
      var s = sc.slice(s_i_1 + 1, s_i_2);

      return {
        x: x,
        y: y,
        s: s,
      };
    }
    function coopConverter_Face(x0, y0) {
      var tr = transform_abstractor(g_face.attr("transform"));
      var dx = OFFSET_FACE_X;
      var dy = OFFSET_FACE_Y;
      var cx = MITT_W;
      var cy = OFFSET_APP_Y;

      var x = (x0 + dx) * Number(tr.s) + Number(tr.x) - cx;
      var y = (y0 + dy) * Number(tr.s) + Number(tr.y) - cy;

      return {
        x: x,
        y: y,
      };
    }
    function coopConverter_App(a_360) {
      var x;
      var y;
      var a = (a_360 * Math.PI) / 180;

      if (a >= 0 && a < Math.PI) {
        x = Math.sin(a) * INNERRADIUS;
      } else if (a >= Math.PI && a < Math.PI * 2) {
        x = -Math.sin(a - Math.PI) * INNERRADIUS;
      }
      if (
        (a >= 0 && a < Math.PI / 2) ||
        (a > (3 * Math.PI) / 2 && a < 2 * Math.PI)
      ) {
        y = -Math.cos(a) * INNERRADIUS;
      } else if (a == Math.PI / 2 || a == (3 * Math.PI) / 2) {
        y = 0;
      } else if (a > Math.PI / 2 && a < (3 * Math.PI) / 2) {
        y = -Math.cos(a) * INNERRADIUS;
      }

      return {
        x: x,
        y: y,
      };
    }
    function nolock() {
      d3.select("#chooser").remove();
      g_apps.selectAll(".linel").attr("opacity", 1);

      g_face.selectAll(".circlec").attr("opacity", 1);
    }
    function lockChoose(data, th) {
      var d = data;
      if (d.choose == 1) {
        nolock();
        d.choose = 0;
      } else {
        d3.select("#chooser").remove();
        g_apps.selectAll(".linel").attr("opacity", 1);

        g_face.selectAll(".circlec").attr("opacity", 1);
        // show the zeiger
        if (th.attr("class") == "line") {
          th.append("path")
            .attr("id", "chooser")
            .attr(
              "d",
              "M0 " +
                (-INNERRADIUS + 1) +
                " L-5 " +
                (-INNERRADIUS + 1 + 9) +
                " L5 " +
                (-INNERRADIUS + 1 + 9) +
                " Z"
            )
            .attr("fill", "#4A4A4A")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1);
          g_apps
            .selectAll(".linel")
            .filter(function (n) {
              return n.name !== d.name;
            })
            .attr("opacity", 0.15);
          var a = [];
          d.data.forEach(function (e) {
            a.push(e.name);
          });

          g_face
            .selectAll(".circlec")
            .filter(function (n) {
              return a.indexOf(n.name) == -1;
            })
            .attr("opacity", 0.2);
        } else {
          th.append("circle")
            .attr("id", "chooser")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", d.r)
            .attr("fill", "none")
            .attr("stroke", "#4A4A4A")
            .attr("stroke-width", 1)
            .attr("pointer-events", "none");
          g_face
            .selectAll(".circlec")
            .filter(function (n) {
              return n.name !== d.name;
            })
            .attr("opacity", 0.2);
          var a = [];
          console.log(d.apps);
          d.apps.forEach(function (e) {
            a.push(e.name);
          });

          g_apps
            .selectAll(".linel")
            .filter(function (n) {
              return a.indexOf(n.name) == -1;
            })
            .attr("opacity", 0.15);
        }
        d.choose = 1;
      }
      // SUODING = 1;
    }

    function hideLinks() {
      if (SUODING == 0) {
        g_apps.selectAll("line").attr("opacity", 1);

        g_face.selectAll("circle").attr("opacity", 1);
      }
    }

    function infoRight_show_a() {
      d3.select("#infoRight_a").style("display", "block");
      d3.select("#infoRight_d").style("display", "none");
      d3.select("#detailShow").on("click", function () {
        console.log("show");
        d3.select("#detailWin").style("display", "block");
        if (NOTISTATUS == 0) {
          d3.select("#clusterButton").style("display", "block");
        }
      });
      d3.select("#detailClose").on("click", function () {
        d3.select("#detailWin").style("display", "none");
      });
    }
    function infoRight_show_d() {
      d3.select("#infoRight_d").style("display", "block");
      d3.select("#infoRight_a").style("display", "none");
    }
    function infoRight_show() {
      d3.select("#infoRight")
        .style("display", "block")
        .transition()
        .duration(500)
        .style("transform", "translateX(-325px)");
      if (Modus == "classic") {
        d3.select("#appview")
          .transition()
          .duration(500)
          .style("width", appWidth - 320 + "px");
        d3.select("#widthAdjust")
          .transition()
          .duration(500)
          .style("width", adjustWidth - 320 + "px");
      }
      INFOSTATUS = 1;
    }
    function infoRight_hide() {
      d3.select("#infoRight")
        .transition()
        .duration(500)
        .style("transform", "translateX(0px)")
        .on("end", function () {
          d3.select(this).style("display", "none");
          d3.select("#infoRight_a").style("display", "none");
          d3.select("#infoRight_b").style("display", "none");
        });
      if (Modus == "classic") {
        d3.select("#appview")
          .transition()
          .duration(500)
          .style("width", appWidth + "px");
        d3.select("#widthAdjust")
          .transition()
          .duration(500)
          .style("width", adjustWidth + "px");
      }
      INFOSTATUS = 0;
    }
    function infoRight_content(data) {
      var d = data;
      var ir;
      // 一个用名字换算的数字（只是Prototyp用）
      var num0 = d.name.charCodeAt(0);
      var gen = Math.floor(num0 / 3);
      var num = num0 - gen * 3;

      var datum = new Date(d.datum);
      var year = datum.getFullYear();
      var month = datum.getMonth() + 1;
      var date = datum.getDate();

      if (d.value) {
        ir = d3.select("#infoRight_d");
        ir.select(".headRight").select("span").text(d.name);

        var sb = ir.select(".scrollBox");
        sb.select("#content").text(d.value);
        sb.select("#category").text(cateScale(d.category));
        sb.select("#discription").text(discription_array[num]);
        sb.select("#collection").html(
          "Collected from : " +
            d.source +
            "<br>" +
            "Updated on : " +
            year +
            "." +
            month +
            "." +
            date +
            "<br>" +
            "Collection Contract : <span style='color: #007A93;'>working contract</span>"
        );
        sb.select("#contact").text("Master Mustermann");
      } else {
        ir = d3.select("#infoRight_a");
        // <img src="assets/img/icons/shield.png" alt="safeMeasure" height="18" width="14"style="vertical-align: -3px; margin-left: 4px;" >
        if (d.ThrdCountry) {
          ir.select(".headRight")
            .append("img")
            .attr("src", "assets/img/icons/shield.png")
            .attr("height", 18)
            .attr("width", 14)
            .style("vertical-align", "-3px")
            .style("margin-left", "4px");
        }
        ir.select(".headRight").select("span").text(d.name);

        var sb = ir.select(".scrollBox");
        sb.select("#contact").text("Master Mustermann");
        sb.select("#discription").text(discription_array_a[num]);
        if (NOTISTATUS == 1) {
          sb.select("#titel_dis").style("background-color", "#FFDB9E");
        }
        sb.select("#purpose").html(purpose_text);
      }
    }

    //看来必须分开写
    function showInfo(data, th) {
      var d = data;
      var src;
      var num;
      var text_p;

      var infobox = d3
        .select("#container")
        .append("div")
        .attr("id", "infobox")
        .style("border-color", d.color)
        .style("pointer-events", "none");

      var datum = new Date(d.datum);
      var year = datum.getFullYear();
      var month = datum.getMonth() + 1;
      var date = datum.getDate();
      var x;
      var y;

      // show the zeiger
      if (th.attr("class") == "line") {
        g_apps
          .append("path")
          .attr("id", "zeiger")
          .attr("transform", "rotate(" + d.angle0 + ")")
          .attr(
            "d",
            "M0 " +
              (-INNERRADIUS + 2) +
              " L-3 " +
              (-INNERRADIUS + 2 + 6) +
              " L3 " +
              (-INNERRADIUS + 2 + 6) +
              " Z"
          )
          .attr("fill", "#4A4A4A")
          .attr("pointer-events", "none");
        src = "assets/img/icons/processing.png";
        num = d.data.length;
        infobox.append("img").attr("src", src).attr("class", "infoicon");
        infobox.append("h2").text(d.name);

        infobox
          .append("p")
          .style("margin-top", "10px")
          .append("span")
          .text(d.info.slice(0, d.info.length - 1));
        infobox
          .append("p")
          .style("margin-top", "10px")
          .text("data usage: ")
          .append("span")
          .text(num + " data");

        infobox
          .append("p")
          .style("margin-top", "10px")
          .style("text-align", "right")
          .append("span")
          .text(year + "." + month + "." + date + " - end of contract");

        x =
          d3.event.pageX < MITT_W ? d3.event.pageX - 236 : d3.event.pageX + 12;
        var h = Number(infobox.style("height").split("p")[0]) + 24;
        // console.log(h);
        y =
          d3.event.pageY < MITT_H
            ? d3.event.pageY - h - 12
            : d3.event.pageY + 12;
        x = x < 10 ? 10 : x;
        x = x > winWidth - 234 ? winWidth - 234 : x;
        y = y < 10 + 44 ? 54 : y;
        y = y > winHeight - h - 10 ? winHeight - h - 10 : y;
      } else {
        g_face
          .append("circle")
          .attr("id", "zeiger")
          .attr("cx", d.x0)
          .attr("cy", d.y0)
          .attr("r", d.r + 1)
          .attr("fill", "none")
          .attr("stroke", "#4A4A4A")
          .attr("stroke-width", 1)
          .attr("pointer-events", "none");
        src = "assets/img/icons/number.png";
        num = d.apps.length;
        infobox.append("img").attr("src", src).attr("class", "infoicon");
        infobox.append("h2").text(d.name);
        infobox
          .append("p")
          .style("margin-top", "10px")
          .text("source: ")
          .append("span")
          .text(d.source);
        infobox
          .append("p")
          .text("used in: ")
          .append("span")
          .text(num + " systems");

        infobox
          .append("p")
          .style("margin-top", "10px")
          .style("text-align", "right")
          .append("span")
          .text(year + "." + month + "." + date + " updated");

        x = d3.event.pageX + 12;
        var h = Number(infobox.style("height").split("p")[0]) + 24;
        y = d3.event.pageY - h - 12;
      }

      infobox.style("left", x + "px").style("top", y - 44 + "px");

      // setTimeout(function(){

      // }, 500);
    }
    function hideInfo() {
      d3.select("#zeiger").remove();
      d3.select("#infobox").remove();
    }

    // zoom for points
    function zoomed() {
      // 设定一个transform的grenz
      var tr = d3.event.transform;
      // console.log(tr);
      var cx = (tr.k - 1) * -MITT_W;
      var cy = (tr.k - 1) * (-MITT_H + 75);
      // console.log(MITT_W);//按照圆圈的中心
      // console.log(MITT_H-75);
      var grenz = (tr.k - 1) * INNERRADIUS; //这个是在zoomTransform基础上的变动量。。
      if (Math.abs(tr.x - cx) > grenz) {
        tr.x = tr.x - cx == Math.abs(tr.x - cx) ? cx + grenz : cx - grenz;
      }
      if (Math.abs(tr.y - cy) > grenz) {
        tr.y = tr.y - cy == Math.abs(tr.y - cy) ? cy + grenz : cy - grenz;
      }
      g_face_zoom.attr("transform", tr);

      var dk = 1 / tr.k;
      var dx = tr.x * -(22 / (INNERRADIUS - 14)) * dk;
      var dy = tr.y * -(22 / (INNERRADIUS - 14)) * dk;
      var quan = button
        .select("#quan")
        .select("g")
        .attr(
          "transform",
          "translate(" + dx + "," + dy + ") scale(" + dk + ")"
        );
      quan.selectAll("circle").attr("stroke-width", tr.k);

      if (tr.k > 6) {
        g_face.selectAll(".circle").select("text").attr("display", "block");
      } else {
        g_face.selectAll(".circle").select("text").attr("display", "none");
      }
      //console.log("zoom");
    }
    // zoom for lines (均分360度)
    function zoom_l(name) {
      var mouse_x = d3.event.pageX;
      var mouse_y = d3.event.pageY;
      g_apps.selectAll("line").filter(function (d) {
        return d.name !== name;
      });

      var grenz = (tr.k - 1) * INNERRADIUS; //这个是在zoomTransform基础上的变动量。。
      if (Math.abs(tr.x - cx) > grenz) {
        tr.x = tr.x - cx == Math.abs(tr.x - cx) ? cx + grenz : cx - grenz;
      }
      if (Math.abs(tr.y - cy) > grenz) {
        tr.y = tr.y - cy == Math.abs(tr.y - cy) ? cy + grenz : cy - grenz;
      }
      g_face.attr("transform", tr);
    }
    //click on the blank space
    window.addEventListener("click", function (event) {
      // console.log(event.target.className.indexOf("appGrid"));
      //再多就写个array
      if (Modus == "explorer") {
        if (
          (event.target.id !== "detailClose" &&
            event.target.id !== "detailShow" &&
            event.target.localName !== "image" &&
            event.target.localName !== "rect" &&
            event.target.localName !== "circle" &&
            event.target.localName !== "text" &&
            event.target.localName !== "path" &&
            event.target.localName !== "line") ||
          event.target.id == "lupe_area"
        ) {
          console.log("tada");
          nolock();
          infoRight_hide();
        }
      } else {
        if (
          event.target.id !== "detailClose" &&
          event.target.id !== "detailShow" &&
          event.target.localName !== "image" &&
          event.target.localName !== "p" &&
          event.target.className &&
          event.target.className.indexOf("appGrid") == -1
        ) {
          infoRight_hide();
        }
      }
      if (
        event.target.localName !== "img" &&
        event.target.localName !== "p" &&
        FILTERSTATUS == 0 &&
        NOTISTATUS == 0
      ) {
        removeChoose();
        d3.select("#notificationWin").style("display", "none");
      }
      if (event.target.id !== "filterWin2" && event.target.id !== "filterWin") {
        d3.select("#filterWin2").style("display", "none");
      }
      console.log(event.target.id);
      if (
        event.target.id !== "visiSlider_block" &&
        event.target.id !== "visiSlider" &&
        VISIWINSTATUS == 1 &&
        event.target.localName == "svg"
      ) {
        d3.select("#visibilityWin").style("display", "none");
        VISIWINSTATUS = 0;
      }
    });
  }, 0);
};
