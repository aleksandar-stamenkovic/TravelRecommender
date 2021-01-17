var map;

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
  $("#searchResult").empty();
  let searchInput = document.querySelector(".search-place-input").value;
  console.log(searchInput);
  fetch("https://localhost:44340/mesto/" + searchInput, {
    method: "GET"
  }).then((p) =>
    p.json().then((data) => {
      data.forEach((element) => {
        let naziv = element["naziv"];
        let opis = element["opis"];
        let ocena = element["ocena"];
        let slikaSrc = element["slika"];

        console.log(naziv, opis, ocena, slikaSrc);
        generisiKarticuSearchResult(slikaSrc, ocena, naziv, opis);
        setujMarker(naziv);
      });
    })
  );
}

/*
    $.getscript("./my-js/addTravelRoute.js",function(){
        aktivirajSpiner()
        });
*/

function inicijalizujMapu() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhYWNhYXMiLCJhIjoiY2trMTN4eXg2MDZucTJ2b2JhdXU4Nm40cyJ9.DwCaq-aCSPz1_pCOFeMJ7A';
    map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [21.8957605, 43.320904],
    zoom: 10
    });
    map.addControl(new mapboxgl.NavigationControl());
    /*var marker = new mapboxgl.Marker()
      .setLngLat([21.8957605, 43.320904])
      .addTo(map);*/
}

inicijalizujMapu();

function setujMarker(grad) {
  var mapboxClient = mapboxSdk({
		accessToken: 'pk.eyJ1IjoiYWNhYWNhYXMiLCJhIjoiY2trMTN4eXg2MDZucTJ2b2JhdXU4Nm40cyJ9.DwCaq-aCSPz1_pCOFeMJ7A'
	});
	mapboxClient.geocoding
		.forwardGeocode({
			query: grad,
			autocomplete: false,
			limit: 1
		})
		.send()
		.then(function (response) {
			if (response && response.body && response.body.features && response.body.features.length) {
				var feature = response.body.features[0];

				/*var map = new mapboxgl.Map({
					container: 'map',
					style: 'mapbox://styles/mapbox/streets-v11',
					center: feature.center,
					zoom: 10
        });*/
        
        new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        
			}
		});
}

setujMarker("Novi Sad");
setujMarker("Zrenjanin");