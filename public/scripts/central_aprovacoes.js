const config = {

};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

database
  .collection("Usuarios")
  .where("activationStatus", "==", false)
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
        `database.collection('Usuarios').doc(\"${docSnapshots[0].id}\").update({"activationStatus": true})`
      );
      let buttonReprovar = document.createElement("button");
      buttonReprovar.textContent = "Reprovar";
      buttonReprovar.setAttribute(
        "onClick",
        `database.collection('Usuarios').doc(\"${docSnapshots[0].id}\").update({"activationStatus": false})`
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
