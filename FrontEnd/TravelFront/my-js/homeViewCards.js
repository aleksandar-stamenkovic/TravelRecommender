function generisiKarticu(host, slikaSrc, naziv, ocena, opis) {
  let opis1 = opis.substring(0, 84) + "...";
  let opis2 = opis.substring(84);
  var element = $(
    '<div class="tm-list-item"  onclick="pretraziKarticu(this)">' +
      '<img src="' +
      slikaSrc +
      '" alt="Image" class="tm-list-item-img">' +
      '<div class="tm-black-bg tm-list-item-text">' +
      '<h3 class="tm-list-item-name">' +
      naziv +
      '<span class="tm-list-item-price"><i class="fas fa-star"></i> ' +
      ocena +
      "</span></h3>" +
      '<p class="tm-list-item-description">' +
      opis1 +
      "</p>" +
      '<p id="toShow" hidden class="tm-special-item-text">' +
      opis2 +
      "</p>" +
      '<label class="show-more-btn" onclick="prikaziVise(this)">... show more</label>' +
      "</div>" +
      "</div>"
  );
  $(host).append(element);
  console.log("generator proso");
}

function pretraziKarticu(host) {
  let searchFor = host
    .querySelector(".tm-list-item-name")
    .innerHTML.split("<")[0];
  console.log(searchFor);

  document.querySelector(".search-place-input").value = searchFor;
  document.querySelector(".search-place-btn").click();
  document.querySelector("#pretrazi-btn").click();
}

function preuzmiPreporuku() {
  fetch("https://localhost:44340/mesto/preporuka", {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let opis = element["opis"];
        let ocena = element["ocena"];
        let slikaSrc = element["slika"];

        console.log(naziv, opis, ocena, slikaSrc);
        generisiKarticu("#bestRated", slikaSrc, ocena, naziv, opis);
      });
    })
  );
}

function preuzmiAktuelno() {
  fetch("https://localhost:44340/mesto/aktuelno", {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let opis = element["opis"];
        let ocena = element["ocena"];
        let slikaSrc = element["slika"];

        console.log(naziv, opis, ocena, slikaSrc);
        generisiKarticu("#actual", slikaSrc, ocena, naziv, opis);
      });
    })
  );
}

function preuzmiNajboljeOcenjeno() {
  fetch("https://localhost:44340/mesto/najbolje", {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let opis = element["opis"];
        let ocena = element["ocena"];
        let slikaSrc = element["slika"];

        console.log(naziv, opis, ocena, slikaSrc);
        generisiKarticu("#popular", slikaSrc, ocena, naziv, opis);
      });
    })
  );
}

generisiKarticu(
  "#bestRated",
  "img/hot-americano.png",
  "Kopaonik planina",
  "5.0",
  "Najlepsa planina lepo organizovana sa veoma lepim skijalistima" +
    "Najlepsa planina lepo organizovana sa veoma lepim skijalistima " +
    "Najlepsa planina lepo organizovana sa veoma lepim skijalistima"
);

generisiKarticu(
  "#actual",
  "img/hot-americano.png",
  "Kopaonik planina",
  "5.0",
  "Najlepsa planina lepo organizovana sa veoma lepim skijalistima"
);

generisiKarticu(
  "#popular",
  "img/hot-americano.png",
  "Kopaonik planina",
  "5.0",
  "Najlepsa planina lepo organizovana sa veoma lepim skijalistima"
);
