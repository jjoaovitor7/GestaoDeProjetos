const database = firebase.firestore(getFirebaseApp());

function projectFactory(firebaseUser, nomeProjeto, descProjeto) {
  return {
    pesquisador: firebaseUser.email,
    nome: nomeProjeto.value,
    descricao: descProjeto.value,
  };
}

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }
});

function addProject() {
  const nomeProjeto = document.getElementById("nomeProjeto");
  const descProjeto = document.getElementById("descProjeto");

  // se os campos de nome e/ou descrição forem vazio.
  if (nomeProjeto.value == "" || descProjeto.value == "") {
    showToastNameAndDescEmpty();
  }

  //se os campos de nome e/ou descrição não forem vazio.
  else {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      const projectDoc = database.collection("Projetos").doc(nomeProjeto.value);

      projectDoc.get().then((docSnapshot) => {
        // se já existir um projeto
        if (docSnapshot.exists) {
          showToastProjectExists();
        } else {
          projectDoc
            .set(projectFactory(firebaseUser, nomeProjeto, descProjeto))
            .then(() => {
              showToastCreatedProject();
            })
            .catch((error) => {
              showToastError();
              console.error(error);
            });
        }
      });
    });
  }
}

document.getElementById("btn-create").addEventListener("click", addProject);
