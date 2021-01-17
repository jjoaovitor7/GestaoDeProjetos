const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }

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

const userCollection = database.collection("Usuarios");

function setFunctionOnClickButtonAprovar(docSnapshots, i) {
  return `database.collection('Usuarios').doc(\"${docSnapshots[i].id}\").update({"activationStatus": true}); setTimeout(() => window.location.reload(), 2500);`;
}

function setFunctionOnClickButtonReprovar(docSnapshots, i) {
  return `database.collection('Usuarios').doc(\"${docSnapshots[i].id}\").update({"activationStatus": false}); setTimeout(() => window.location.reload(), 2500);`;
}

userCollection
  .where("activationStatus", "==", null)
  .get()
  .then(function (querySnapshot) {
    const docSnapshots = querySnapshot.docs;

    let div = document.createElement("div");
    div.classList = "container-pesquisadores";

    for (let i = 0; i < querySnapshot.size; i++) {
      let p = document.createElement("p");
      let buttonAprovar = document.createElement("button");
      buttonAprovar.textContent = "Aprovar";
      buttonAprovar.setAttribute(
        "onClick",
        setFunctionOnClickButtonAprovar(docSnapshots, i)
      );

      let buttonReprovar = document.createElement("button");
      buttonReprovar.textContent = "Reprovar";
      buttonReprovar.setAttribute(
        "onClick",
        setFunctionOnClickButtonReprovar(docSnapshots, i)
      );

      div.appendChild(p);
      div.appendChild(buttonAprovar);
      div.appendChild(buttonReprovar);
      p.textContent = `Pesquisador: ${docSnapshots[i].data().nome} (${
        docSnapshots[i].data().email
      })`;
      document.body.appendChild(div);
    }
  });
