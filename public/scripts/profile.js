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
