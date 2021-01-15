function test() {
  console.log("adasdasdasadsasddasasddsa");

  return false;
}

let nizMesta = [];
let rate = 1;
let nizSlika = [];

function setRating(value) {
  console.log("pre:" + rate);
  rate = value;
  console.log("posle:" + rate);
}

function dodajMesto() {
  let naziv = document.querySelector(".my-control-route-name").value;
  let opis = document.querySelector(".my-control-route-descr").value;
  let ocena = rate;

  console.log("dodaj mesto uso" + naziv, opis, ocena);
  if (naziv == "" && opis == "") {
    return false;
  }

  var fullPath = document.getElementById("file").value;
  var filename;
  if (fullPath) {
    var startIndex =
      fullPath.indexOf("\\") >= 0
        ? fullPath.lastIndexOf("\\")
        : fullPath.lastIndexOf("/");
    filename = fullPath.substring(startIndex);
    if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
      filename = filename.substring(1);
    }
  }

  console.log(filename);
  let tmpObject = {
    naziv: naziv,
    opis: opis,
    ocena: ocena,
    imeSlike: filename,
  };

  $(".dodaj-forma-dinamik").remove();
  generisiKarticuMesto(naziv, opis, ocena, filename);
  nizMesta.push(tmpObject);

  generisiKarticuDodajMesto();
}

function generisiKarticuDodajMesto() {
  var element = $(
    '<div class="dodaj-forma-dinamik">' +
      '<div class="tm-black-bg tm-contact-text-container">' +
      '<form onsubmit="return false">' +
      '<div class="tm-form-group">' +
      '<input type="text" name="name" class="tm-form-control my-control-route-name" placeholder="Naziv mesta" required="" />' +
      "</div>" +
      '<div class="tm-form-group">' +
      '<input type="text" name="description" class="tm-form-control my-control-route-descr" placeholder="Opis . . ." required="" />' +
      "</div>" +
      '<div class="tm-form-group">' +
      '<div class="rating">' +
      '<input type="radio" name="test" id="one" checked onclick="setRating(1)"/>' +
      '<label for="one"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="two" onclick="setRating(2)"/>' +
      '<label for="two"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="three" onclick="setRating(3)"/>' +
      '<label for="three"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="four" onclick="setRating(4)"/>' +
      '<label for="four"><i class="fa fa-star"></i></label>' +
      '<input type="radio" name="test" id="five" onclick="setRating(5)"/>' +
      '<label for="five"><i class="fa fa-star"></i></label>' +
      "</div>" +
      "<br>" +
      "</div>" +
      "<div>" +
      '<div class="input-group mb-3">' +
      '<input type="file" id="file" class="upload-slike form-control" name="file" multiple />' +
      "</div>" +
      '<button type="submit"  class="tm-btn-primary tm-align-right" onclick="dodajMesto()">' +
      "Dodaj" +
      "</button>" +
      "</div>" +
      "</form>" +
      "</div>" +
      '<div class="tm-black-bg tm-contact-text-container " >' +
      '<h5 class="tm-list-item-name">Završi putovanje i unesi rutu koja se sastoju iz navedenih mesta.' +
      '<span class="tm-list-item-price">' +
      '<button type="button" class="tm-btn-primary tm-align-right" onclick="zavrsiRutu()">' +
      "Završi" +
      "</button>" +
      "</span>" +
      "</h5>" +
      "</div>" +
      "</div>"
  );
  $("#addplace").append(element);
  console.log("generator proso");
}

generisiKarticuDodajMesto();

function generisiKarticuMesto(naziv, opis, ocena, nazivSlike = "nema slike") {
  var element = $(
    '<div class="tm-list-item">' +
      '<div class="tm-black-bg tm-list-item-text tm-contact-text-container">' +
      '<h3 class="tm-list-item-name">' +
      naziv +
      '<span class="tm-list-item-price"><i class="fas fa-star"></i> ' +
      ocena +
      "</span></h3>" +
      '<p class="tm-list-item-description">' +
      opis +
      "</p>" +
      '<h5 class="tm-list-item-description">Slika: ' +
      nazivSlike +
      "</h5>" +
      "</div>" +
      "</div>"
  );
  $("#addplace").append(element);
  console.log("generator proso");
}

/*
            <div class="tm-list-item">
              <div class="tm-black-bg tm-list-item-text tm-contact-text-container">
                <h3 class="tm-list-item-name">Kopaonik<span class="tm-list-item-price"><i class="fas fa-star"></i> 4</span></h3>
                <p class="tm-list-item-description">Najlepša planina u srbiji veoma popularna zimi kao skijalište, i kao mesto za odmor i skijanje.</p>
              </div>
            </div>


            <div class="tm-black-bg tm-contact-text-container ">
              <form onsubmit="return false">
                <div class="tm-form-group">
                  <input type="text" name="name" class="tm-form-control my-control-route-name" placeholder="Naziv mesta" required="" />
                </div>
                <div class="tm-form-group">
                  <input type="text" name="description" class="tm-form-control my-control-route-descr" placeholder="Opis . . ." required="" />
                </div>
                <div class="tm-form-group">
                  <div class="rating">
                    <input type="radio" name="test" id="one" checked onclick="setRating(1)"/>
                    <label for="one"><i class="fa fa-star"></i></label>
                    <input type="radio" name="test" id="two" onclick="setRating(2)"/>
                    <label for="two"><i class="fa fa-star"></i></label>
                    <input type="radio" name="test" id="three" onclick="setRating(3)"/>
                    <label for="three"><i class="fa fa-star"></i></label>
                    <input type="radio" name="test" id="four" onclick="setRating(4)"/>
                    <label for="four"><i class="fa fa-star"></i></label>
                    <input type="radio" name="test" id="five" onclick="setRating(5)"/>
                    <label for="five"><i class="fa fa-star"></i></label>
                  </div>
                  <br>
                </div>             
                <div>
                  <div class="input-group mb-3">
                    <input type="file" id="file" class="upload-slike form-control" name="file" multiple />
                 </div>
                  <button type="submit"  class="tm-btn-primary tm-align-right" onclick="dodajMesto()">
                    Dodaj
                  </button> 
                </div>
              </form>
              
            </div>
              <div class="tm-black-bg tm-contact-text-container " >

                <h5 class="tm-list-item-name">Završi putovanje i unesi rutu koja se sastoju iz navedenih mesta.
                  <span class="tm-list-item-price">
                    <button type="button" class="tm-btn-primary tm-align-right" onclick="zavrsiRutu()">
                      Završi
                    </button>
                  </span>
                </h5>
                
            </div>
            */
