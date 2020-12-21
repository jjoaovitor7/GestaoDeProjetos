const config = {
};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

function addProject() {
  if (
    document.getElementById("nomeProjeto").value == "" ||
    document.getElementById("descProjeto").value == ""
  ) {
    // pass
  } else {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      database
        .collection("Usuarios")
        .doc(firebaseUser.uid)
        .collection("Projetos")
        .doc(document.getElementById("nomeProjeto").value)
        .set({
          nome: document.getElementById("nomeProjeto").value,
          descricao: document.getElementById("descProjeto").value,
        });
    });
  }
}

document.getElementById("btn-create").addEventListener("click", addProject);
