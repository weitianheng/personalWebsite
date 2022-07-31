let searchParams = new URL(document.location).searchParams;
var language_g = searchParams.get("language") ?? "en";
$(`#lang_pcker > .${language_g}`).addClass("active");

$("#lang_picker").click(() => {
  $("#lang_pcker > span").toggleClass("active");
  let paramsStr = new URLSearchParams(searchParams)
    .set("language", language_g === "en" ? "de" : "en")
    .toString();
  let newURL = document.location.href.split["?"][0] + paramsStr;
  window.open(newURL);
});
