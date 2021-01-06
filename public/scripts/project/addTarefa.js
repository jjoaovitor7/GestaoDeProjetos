const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
};

const database = firebase.firestore(firebase.initializeApp(config));

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
    database
      .collection("Tarefas")
      .add({
        nome: nomeTarefa.value,
        descricao: descTarefa.value,
        projetoAssociado: window.sessionStorage.getItem("projeto"),
      })
      .then(() => {
        M.toast({
          html: "Tarefa cadastrada!",
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
}

document.getElementById("btn-addtarefa").addEventListener("click", addTarefa);
