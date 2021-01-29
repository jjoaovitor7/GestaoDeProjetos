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
        ifNotCoordenador();
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
    createPageContent(querySnapshot, docSnapshots);
  });
