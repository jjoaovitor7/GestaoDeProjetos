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

function addProject() {
  if (
    document.getElementById("nomeProjeto").value == "" ||
    document.getElementById("descProjeto").value == ""
  ) {
    // pass
  } else {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      database
        .collection("Projetos")
        .doc(document.getElementById("nomeProjeto").value)
        .set({
          pesquisador: firebaseUser.email,
          nome: document.getElementById("nomeProjeto").value,
          descricao: document.getElementById("descProjeto").value,
        })
        .then(() => {
          M.toast({
            html: "Projeto cadastrado!",
            displayLength: 6000,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}

document.getElementById("btn-create").addEventListener("click", addProject);
