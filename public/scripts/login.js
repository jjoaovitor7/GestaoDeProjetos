const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

function cadastrar() {
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
            if (querySnapshot.data().activationStatus == true) {
              alert("Login pendente de aprovação do Coordenador");
            } else {
              location.href = "http://127.0.0.1:5500/pages/home.html";
            }
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.code == "auth/email-already-in-use") {
          alert("Esse e-mail já está cadastrado no sistema.");
        }
      });
  }
}

document.querySelector(".container-arrow").addEventListener("click", cadastrar);
