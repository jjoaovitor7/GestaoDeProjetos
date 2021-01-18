const database = firebase.firestore(getFirebaseApp());

function userFactory() {
  return {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    url_lattes: document.getElementById("lattesURL").value,
    type: document.querySelector('input[name="type"]:checked').value,
    activationStatus: null,
  };
}

function createUser(email, password) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((data) => {
      const docUser = database.collection("Usuarios").doc(data.user.uid);
      docUser.set(userFactory());
      showToastCreatedUser();
    })
    .catch((error) => {
      console.error(error);
      if (error.code == "auth/email-already-in-use") {
        showToastEmailInUse();
      }

      if (error.code == "auth/invalid-email") {
        showToastInvalidEmail();
      }
    });
}

function register() {
  const email = document.getElementById("email");
  const password = document.getElementById("senha");
  const passwordConfirm = document.getElementById("senhaConfirm");
  const lattesURL = document.getElementById("lattesURL");
  const checkbox = document.querySelector('input[name="type"]:checked');

  if (
    email.value == "" ||
    password.value == "" ||
    passwordConfirm.value == "" ||
    lattesURL.value == "" ||
    checkbox.value == null
  ) {
    showToastDontInputEmpty();
  } else {
    createUser(email, password);
  }
}

document.querySelector(".container-arrow").addEventListener("click", register);
