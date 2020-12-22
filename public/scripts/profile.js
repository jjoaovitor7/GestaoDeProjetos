const config = {
};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

firebase.auth().onAuthStateChanged((firebaseUser) => {
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
