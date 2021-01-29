const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }
});

document.getElementById("btn-delete").addEventListener("click", function () {
  const nomeProjeto = document.getElementById("nomeProjeto").value;
  const projectDoc = database.collection("Projetos").doc(nomeProjeto);

  projectDoc.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      projectDoc
        .delete()
        .then(() => {
          showToastDeletedProject();
        })
        .catch((error) => {
          showToastError();
          console.error(error);
        });
    } else {
      showToastProjectDontExists();
    }
  });
});
