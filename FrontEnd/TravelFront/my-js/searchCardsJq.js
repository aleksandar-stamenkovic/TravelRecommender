function generisiKarticuSearchResult(slikaSrc, ocena, naziv, opis) {
  var element = $(
    '<div class="tm-black-bg tm-special-item">' +
      '<img src="' +
      slikaSrc +
      '" alt="Image">' +
      '<div class="tm-special-item-description">' +
      '<div><h3><span class="tm-list-item-price search-rating"><i class="fas fa-star"></i> ' +
      ocena +
      "</span></h3></div>" +
      '<h2 class="tm-text-primary tm-special-item-title">' +
      naziv +
      "</h2>" +
      '<p class="tm-special-item-text">' +
      opis +
      "</p>" +
      "</div>" +
      "</div>"
  );
  $("#searchResult").append(element);
  console.log("generator proso");
}

function pretraziMesta() {
  $("#searchResult").remove();
  let searchInput = document.querySelector(".search-place-input").value;
  console.log(searchInput);
  fetch("https://localhost:44340/mesta/" + searchInput, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let opis = element["opis"];
        let ocena = element["ocena"];
        let slikaSrc = eleent["slika"];

        console.log(naziv, opis, ocena, slika);
        generisiKarticuSearchResult(slikaSrc, ocena, naziv, opis);
      });
    })
  );
}

generisiKarticuSearchResult(
  "img/special-01.jpg",
  3.5,
  "Special Item",
  "Here is a short text description for the first special item. You are not allowed to redistribute this template ZIP file."
);

generisiKarticuSearchResult(
  "img/special-01.jpg",
  3.5,
  "Special Item",
  "Here is a short text description for the first special item. You are not allowed to redistribute this template ZIP file."
);
generisiKarticuSearchResult(
  "img/special-01.jpg",
  3.5,
  "Special Item",
  "Here is a short text description for the first special item. You are not allowed to redistribute this template ZIP file."
);

/*
    $.getscript("./my-js/addTravelRoute.js",function(){
        aktivirajSpiner()
        });
*/
