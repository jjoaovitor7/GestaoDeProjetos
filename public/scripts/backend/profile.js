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
      setProfileDetails(querySnapshot);
    });
});
