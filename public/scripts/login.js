const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
};
const database = firebase.firestore(firebase.initializeApp(config));

function login() {
  if (
    document.getElementById("email").value == "" ||
    document.getElementById("senha").value == ""
  ) {
    // pass
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        document.getElementById("email").value,
        document.getElementById("senha").value
      )
      .then((data) => {
        database
          .collection("Usuarios")
          .doc(data.user.uid)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.data().activationStatus == null) {
              M.toast({
                html: "Login pendente de aprovação do Coordenador",
                displayLength: 6000,
              });
            } else if (querySnapshot.data().activationStatus == false) {
              M.toast({
                html: "Login rejeitado pelo Coordenador",
                displayLength: 6000,
              });
            } else {
              location.href = "http://127.0.0.1:5500/pages/home.html";
            }
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.code == "auth/wrong-password") {
          M.toast({
            html: "Senha inválida!",
            displayLength: 6000,
          });
        }

        if (error.code == "auth/too-many-requests") {
          M.toast({
            html:
              "Um momento amigo, você errou várias vezes a senha.<br />Precisará esperar um pouco.",
            displayLength: 6000,
          });
        }
      });
  }
}

document.querySelector(".container-arrow").addEventListener("click", login);
