const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
};
const database = firebase.firestore(firebase.initializeApp(config));

function cadastrar() {
  if (
    document.getElementById("email").value == "" ||
    document.getElementById("senha").value == "" ||
    document.getElementById("senhaConfirm").value == "" ||
    document.getElementById("lattesURL").value == "" ||
    document.querySelector('input[name="type"]:checked').value == null
  ) {
    // pass
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        document.getElementById("email").value,
        document.getElementById("senha").value
      )
      .then((data) => {
        database
          .collection("Usuarios")
          .doc(data.user.uid)
          .set({
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            url_lattes: document.getElementById("lattesURL").value,
            type: document.querySelector('input[name="type"]:checked').value,
            activationStatus: null,
          });

        M.toast({ html: "Usuário cadastrado!", displayLength: 6000 });
      })
      .catch((error) => {
        console.error(error);
        if (error.code == "auth/email-already-in-use") {
          M.toast({
            html: "Esse e-mail já está cadastrado no sistema.",
            displayLength: 6000,
          });
        }
      });
  }
}

document.querySelector(".container-arrow").addEventListener("click", cadastrar);
