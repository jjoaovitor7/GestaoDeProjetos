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

document.getElementById("btn-delete").addEventListener("click", function () {
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    database
      .collection("Projetos")
      .doc(document.getElementById("nomeProjeto").value)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          database
            .collection("Projetos")
            .doc(document.getElementById("nomeProjeto").value)
            .delete()
            .then(() => {
              M.toast({
                html: "Projeto deletado!",
                displayLength: 6000,
              });
            })
            .catch((error) => {
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
});
