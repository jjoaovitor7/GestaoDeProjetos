const database = firebase.firestore(getFirebaseApp());

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
    M.toast({
      html: "Os campos de nome e/ou descrição não podem ser vazio.",
      displayLength: 6000,
    });
  }

  //se os campos de nome e/ou descrição não forem vazio.
  else {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      const projectDoc = database.collection("Projetos").doc(nomeProjeto.value);

      projectDoc.get().then((docSnapshot) => {
        // se já existir um projeto
        if (docSnapshot.exists) {
          M.toast({
            html: "Já existe um projeto com esse nome!",
            displayLength: 6000,
          });
        } else {
          projectDoc
            .set({
              pesquisador: firebaseUser.email, nome: nomeProjeto.value, descricao: descProjeto.value,
            })
            .then(() => {
              M.toast({
                html: "Projeto cadastrado!",
                displayLength: 6000,
              });
            })
            .catch((error) => {
              M.toast({
                html: "Erro!",
                displayLength: 6000,
              });
              console.error(error);
            });
        }
      });
    });
  }
}

document.getElementById("btn-create").addEventListener("click", addProject);
