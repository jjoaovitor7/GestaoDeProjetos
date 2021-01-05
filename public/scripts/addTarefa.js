const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

function addTarefa() {
  if (
    document.getElementById("nomeTarefa").value == "" ||
    document.getElementById("descTarefa").value == ""
  ) {
    // pass
  } else {
    database
      .collection("Tarefas")
      .add({
        nome: document.getElementById("nomeTarefa").value,
        descricao: document.getElementById("descTarefa").value,
        projetoAssociado: localStorage.getItem("projeto"),
      })
      .then(() => {
        M.toast({
          html: "Tarefa cadastrada!",
          displayLength: 6000,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

document.getElementById("btn-addtarefa").addEventListener("click", addTarefa);
