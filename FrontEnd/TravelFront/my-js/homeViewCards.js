function generisiKarticu(host, slikaSrc, naziv, ocena, opis) {
  var element = $(
    '<div class="tm-list-item">' +
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
      opis +
      "</p>" +
      "</div>" +
      "</div>"
  );
  $(host).append(element);
  console.log("generator proso");
}

generisiKarticu(
  "#bestRated",
  "img/hot-americano.png",
  "Kopaonik",
  "5.0",
  "Najlepsa planina lepo organizovana sa veoma lepim skijalistima"
);
