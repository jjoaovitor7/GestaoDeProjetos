const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }

  database
    .collection("Usuarios")
    .doc(firebaseUser.uid)
    .get()
    .then((querySnapshot) => {
      full = querySnapshot.data().nome;
      first = full.split(" ")[0][0];
      second = full.split(" ")[1][0];
      document.querySelector(
        ".profile-avatar"
      ).textContent = `${first}${second}`;
      document.querySelector(".profile-name").textContent = full;
      document.querySelector(
        ".profile-email"
      ).textContent = querySnapshot.data().email;
    });
});
