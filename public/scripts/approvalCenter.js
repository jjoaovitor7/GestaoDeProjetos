const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
};

const database = firebase.firestore(firebase.initializeApp(config));

firebase.auth().onAuthStateChanged((firebaseUser) => {
  database
    .collection("Usuarios")
    .doc(firebaseUser.uid)
    .get()
    .then((querySnapshot) => {
      if (!(querySnapshot.data().type == "Coordenador")) {
        document.querySelector("body").innerHTML =
          "<p style='margin-left: 5px; margin-top: 5px; font-size: 28px;'>Você não é coordenador.</p>";
      }
    });
});

database
  .collection("Usuarios")
  .where("activationStatus", "==", null)
  .get()
  .then(function (querySnapshot) {
    let body = document.querySelector("body");
    let div = document.createElement("div");
    div.classList = "container-pesquisadores";
    const docSnapshots = querySnapshot.docs;

    for (let i = 0; i < querySnapshot.size; i++) {
      let p = document.createElement("p");
      let buttonAprovar = document.createElement("button");
      buttonAprovar.textContent = "Aprovar";
      buttonAprovar.setAttribute(
        "onClick",
        `database.collection('Usuarios').doc(\"${docSnapshots[0].id}\").update({"activationStatus": true}); setTimeout(() => window.location.reload(), 2500);`
      );
      let buttonReprovar = document.createElement("button");
      buttonReprovar.textContent = "Reprovar";
      buttonReprovar.setAttribute(
        "onClick",
        `database.collection('Usuarios').doc(\"${docSnapshots[0].id}\").update({"activationStatus": false}); setTimeout(() => window.location.reload(), 2500);`
      );
      div.appendChild(p);
      div.appendChild(buttonAprovar);
      div.appendChild(buttonReprovar);
      p.textContent = `Pesquisador: ${docSnapshots[i].data().nome} (${
        docSnapshots[i].data().email
      })`;
      body.appendChild(div);
    }
  });
