const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
};
const database = firebase.firestore(firebase.initializeApp(config));

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
          M.toast({
            html: "Projeto deletado!",
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
    } else {
      M.toast({
        html: "Projeto não existe!",
        displayLength: 6000,
      });
    }
  });
});
