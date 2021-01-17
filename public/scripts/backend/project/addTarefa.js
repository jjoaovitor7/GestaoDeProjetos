const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }
});

function addTarefa() {
  const nomeTarefa = document.getElementById("nomeTarefa");
  const descTarefa = document.getElementById("descTarefa");

  // se os campos de nome e/ou descrição forem vazio.
  if (nomeTarefa.value == "" || descTarefa.value == "") {
    M.toast({
      html: "Os campos de nome e/ou descrição não podem ser vazio.",
      displayLength: 6000,
    });
  }

  //se os campos de nome e/ou descrição não forem vazio.
  else {
    const tarefasCollection = database.collection("Tarefas");

    tarefasCollection
      .add({
        nome: nomeTarefa.value,
        descricao: descTarefa.value,
        projetoAssociado: window.sessionStorage.getItem("projeto"),
      })
      .then(() => {
        showToastCreatedTask();
      })
      .catch((error) => {
        showToastError();
        console.error(error);
      });
  }
}

document.getElementById("btn-addtarefa").addEventListener("click", addTarefa);
