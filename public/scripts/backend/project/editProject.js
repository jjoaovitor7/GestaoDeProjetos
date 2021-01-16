const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }
});

const nomeProjeto = document.getElementById("nomeProjeto");
const nomeProjetoEdit = document.getElementById("nomeProjetoEdit");
const descProjetoEdit = document.getElementById("descProjetoEdit");

document.getElementById("btn-nome").addEventListener("click", function () {
  nomeProjetoEdit.removeAttribute("hidden");
  descProjetoEdit.setAttribute("hidden", true);
});

document.getElementById("btn-desc").addEventListener("click", function () {
  descProjetoEdit.removeAttribute("hidden");
  nomeProjetoEdit.setAttribute("hidden", true);
});

document.getElementById("btn-edit").addEventListener("click", function () {
  if (
    window.getComputedStyle(nomeProjetoEdit).visibility !== "hidden" &&
    nomeProjetoEdit.value != ""
  ) {
    const projectDoc = database.collection("Projetos").doc(nomeProjeto.value);

    projectDoc.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        projectDoc
          .update({
            nome: nomeProjetoEdit.value,
          })
          .then(() => {
            M.toast({
              html: "Projeto editado!",
              displayLength: 6000,
            });
          })
          .catch((error) => {
            M.toast({
              html: "Não conseguimos atualizar o projeto =/",
              displayLength: 6000,
            });
            console.error(error);
          });
      } else {
        M.toast({
          html: "Projeto não existe!",
          displayLength: 6000,
        });
      }
    });
  }

  if (
    window.getComputedStyle(descProjetoEdit).visibility !== "hidden" &&
    descProjetoEdit.value != ""
  ) {
    const projectDoc = database.collection("Projetos").doc(nomeProjeto.value);

    projectDoc
      .update({
        descricao: descProjetoEdit.value,
      })
      .then(() => {
        M.toast({
          html: "Projeto editado!",
          displayLength: 6000,
        });
      })
      .catch((error) => {
        M.toast({
          html: "Não conseguimos atualizar o projeto =/",
          displayLength: 6000,
        });
        console.error(error);
      });
  }
});
