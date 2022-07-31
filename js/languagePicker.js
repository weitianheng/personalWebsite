let searchParams = new URL(document.location).searchParams;
var language_g = searchParams.get("language") ?? "en";
$(`#lang_picker > .${language_g}`).addClass("active");

$("#lang_picker").click(() => {
  $("#lang_picker > span").toggleClass("active");
  let params = new URLSearchParams(searchParams);
  params.set("language", language_g === "en" ? "de" : "en");
  let paramsStr = params.toString();
  let newURL = document.location.href.split("?")[0] + paramsStr;
  window.open(newURL);
});
