window.onload = function () {
  var dialog = [];
  var dialogColor = [];

  const workPicSize = 200;

  // draw the logo
  const logoR = 18;
  const logo_svgPointsStr =
    "36," +
    ((-2 * logoR) / Math.sqrt(3) + 42) +
    " " +
    (logoR + 36) +
    "," +
    (-logoR / Math.sqrt(3) + 42) +
    " " +
    (logoR + 36) +
    "," +
    (logoR / Math.sqrt(3) + 42) +
    " 36," +
    ((2 * logoR) / Math.sqrt(3) + 42) +
    " " +
    (-logoR + 36) +
    "," +
    (logoR / Math.sqrt(3) + 42) +
    " " +
    (-logoR + 36) +
    "," +
    (-logoR / Math.sqrt(3) + 42);
  document.getElementById("logo").setAttribute("points", logo_svgPointsStr);

  // add the works into gallery
  const gallery = document.getElementsByClassName("gallery")[0];
  const temp = document.getElementsByTagName("template")[0];

  async function addWork(d, i) {
    const innerHTML =
      '<svg id="shadow' +
      i +
      '" class="shadows" width="' +
      workPicSize * 2 +
      '" height="' +
      (workPicSize * 4) / Math.sqrt(3) +
      '" style="pointer-events: none; opacity:0;overflow: visible;" data="' +
      workPicSize +
      '">' +
      '<g  transform="translate(' +
      workPicSize +
      "," +
      (workPicSize * 2) / Math.sqrt(3) +
      ')">' +
      '<polygon fill="#444" points="0,' +
      (-2 * workPicSize) / Math.sqrt(3) +
      " " +
      workPicSize +
      "," +
      -workPicSize / Math.sqrt(3) +
      " " +
      workPicSize +
      "," +
      workPicSize / Math.sqrt(3) +
      " 0," +
      (2 * workPicSize) / Math.sqrt(3) +
      " " +
      -workPicSize +
      "," +
      workPicSize / Math.sqrt(3) +
      " " +
      -workPicSize +
      "," +
      -workPicSize / Math.sqrt(3) +
      '" />' +
      "</g>" +
      "</svg>" +
      '<svg id="pic' +
      i +
      '" class="pictures" width="' +
      workPicSize * 2 +
      '" height="' +
      (workPicSize * 4) / Math.sqrt(3) +
      '" style="pointer-events: none; opacity:0;overflow: visible;" data_name="' +
      d["name"] +
      '" data="' +
      workPicSize +
      '">' +
      "<defs>" +
      '<pattern id="background' +
      (i + 1) +
      '" width="1" height="1" patternUnits="objectBoundingBox">' +
      '<image id="img' +
      (i + 1) +
      '" xlink:href="img/' +
      d["name"] +
      '.png" width="' +
      workPicSize * 2 +
      '" height="' +
      (workPicSize * 4) / Math.sqrt(3) +
      '"/>' +
      "</pattern>" +
      "</defs>" +
      '<g id="hex' +
      i +
      '" class="hex" transform="translate(' +
      workPicSize +
      "," +
      (workPicSize * 2) / Math.sqrt(3) +
      ')" style="pointer-events: auto;" >' +
      '<polygon stroke="#e4e4e4" fill="url(#background' +
      (i + 1) +
      ')" points="0,' +
      (-2 * workPicSize) / Math.sqrt(3) +
      " " +
      workPicSize +
      "," +
      -workPicSize / Math.sqrt(3) +
      " " +
      workPicSize +
      "," +
      workPicSize / Math.sqrt(3) +
      " 0," +
      (2 * workPicSize) / Math.sqrt(3) +
      " " +
      -workPicSize +
      "," +
      workPicSize / Math.sqrt(3) +
      " " +
      -workPicSize +
      "," +
      -workPicSize / Math.sqrt(3) +
      '" />' +
      "</g>" +
      "</svg>";

    gallery.innerHTML = gallery.innerHTML + innerHTML;

    //set value for dialog and dialogcolor
    dialog.push("<span>" + d["name"] + "</span> - " + d["beschreiben"]);
    dialogColor.push(d["color"]);
  }

  fetch("./listOfWorks.json")
    .then((response) => response.json())
    .then((data) => {
      Promise.all(
        data.map(async (d, i) => {
          await addWork(d, i);
        })
      ).then(() => {
        if (LA != undefined) {
          clearInterval(LA);
        } else {
          dontstart = 1;
        }
        $("#loading").css("display", "none");
        go();
      });
    });
};
