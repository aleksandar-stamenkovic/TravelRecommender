function proveriLogIn() {
  console.log("onloadbody");
  a = JSON.parse(localStorage.getItem("loged-in"));

  if (a != null) {
    console.log(a.loged);
    console.log(a.ime);
    console.log(a.prezime);
    console.log(a.email);
    if (true == true) {
      console.log("iff");
      let btnReg = document.querySelector("#buttonRegisterSpan");
      btnReg.innerHTML = a.ime;
      btnReg = document.querySelector("#buttonRegister");
      btnReg.href = "#drink";

      let btnLog = document.querySelector("#btnPrijava");
      btnLog.hidden = true;
      btnLog = document.querySelector("#btnOdjava");
      btnLog.hidden = false;
    } else {
      console.log("elss");
      let btnReg = document.querySelector("#buttonRegisterSpan");
      btnReg.innerHTML = "Registruj se";
      btnReg = document.querySelector("#buttonRegister");
      btnReg.href = "#register";

      let btnLog = document.querySelector("#btnPrijava");
      btnLog.hidden = false;
      btnLog = document.querySelector("#btnOdjava");
      btnLog.hidden = true;
    }
  }
}

function registrujSe() {
  let nizRegister = document.querySelectorAll(".my-control-register");
  let ime = nizRegister[0].value;
  let prezime = nizRegister[1].value;
  let email = nizRegister[2].value;
  let password = nizRegister[3].value;

  console.log(ime);
  console.log(prezime);
  console.log(email);
  console.log(password);

  fetch("https://localhost:44340/korisnik", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ime: ime,
      prezime: prezime,
      email: email,
      password: password,
    }),
  }).then((p) => {
    if (p.ok) {
      localStorage.clear();
      localStorage.setItem(
        "loged-in",
        JSON.stringify({
          email: email,
          loged: true,
          ime: ime,
          prezime: prezime,
        })
      );

      console.log("USPESNO REGISTROVANJE");
      a = JSON.parse(localStorage.getItem("loged-in"));
      console.log(a.loged);
      console.log(a.email);
      console.log(a.ime);
      console.log(a.prezime);
      window.location.href = "index.html";
    } else {
      window.location.href = "#register";
    }
  });
}

function LogujSe() {
  let nizRegister = document.querySelectorAll(".my-control-login");
  let email = nizRegister[0].value;
  let password = nizRegister[1].value;
  console.log(email);
  console.log(password);

  fetch("https://localhost:44340/korisnik/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((p) =>
    p.json().then((data) => {
      if (data["uspesno"] == true) {
        console.log(data);
        localStorage.clear();

        console.log(data);
        localStorage.setItem(
          "loged-in",
          JSON.stringify({
            email: email,
            loged: true,
            ime: data["ime"],
            prezime: data["irezime"],
          })
        );
        a = JSON.parse(localStorage.getItem("loged-in"));
        console.log(a.email);
        console.log("USPESNO LOGOVANJE");

        window.location.href = "index.html";
      } else {
        window.location.href = "#login";
      }
    })
  );
}

function OdjaviSe() {
  console.log("odjava test");
  localStorage.clear();
  window.location.href = "index.html";
}
/*
if (true) {
  console.log(retData.);
  localStorage.clear();
  localStorage.setItem(
    "loged-in",
    JSON.stringify({
      email: email,
      loged: true,
      ime: retData["Ime"],
      prezime: retData["Prezime"],
    })
  );

  a = JSON.parse(localStorage.getItem("loged-in"));
  console.log(a.email);
  console.log("USPESNO");

  //window.location.href = "index.html";
} else {
  //window.location.href = "#login";
}


/*






function checkUser() {
  a = JSON.parse(localStorage.getItem("loged-in"));
  let email = a.email;

  fetch("https://localhost:44371/korisnik/" + email, {
    method: "GET",
  }).then((p) =>
    p.json().then((data) => {
      let nizPodataka = [
        data["id"],
        data["ime"],
        data["prezime"],
        data["email"],
        data["password"],
      ];

      let ime = nizPodataka[1];
      let prezime = nizPodataka[2];
      console.log(ime + " " + prezime);
      localStorage.setItem(
        "loged-in-info",
        JSON.stringify({ ime: ime, prezime: prezime })
      );
      b = JSON.parse(localStorage.getItem("loged-in-info"));
      console.log(b.ime);
      console.log(b.prezime);
      window.location.href = "shop.html";
    })
  );
}
*/

proveriLogIn();
