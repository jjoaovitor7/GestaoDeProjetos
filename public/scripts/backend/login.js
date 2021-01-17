const database = firebase.firestore(getFirebaseApp());

function login() {
  const email = document.getElementById("email");
  const password = document.getElementById("senha");

  if (email.value == "" || password.value == "") {
    return 0;
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((data) => {
        database
          .collection("Usuarios")
          .doc(data.user.uid)
          .get()
          .then((querySnapshot) => {
            switch (querySnapshot.data().activationStatus) {
              case null:
                showToastPendentUser();
                break;
              case false:
                showToastRejectedUser();
                break;
              default:
                location.href = "http://127.0.0.1:5500/pages/home.html";
            }
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.code == "auth/wrong-password") {
          showToastWrongPassword();
        }

        if (error.code == "auth/too-many-requests") {
          showToastTooManyRequests();
        }
      });
  }
}

document.querySelector(".container-arrow").addEventListener("click", login);
