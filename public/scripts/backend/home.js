const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }

  const userCollection = database.collection("Usuarios");
  const userDoc = userCollection.doc(firebaseUser.uid);

  userDoc.get().then(function (docSnapshot) {
    if (
      docSnapshot.data().type == "Coordenador" ||
      docSnapshot.data().type == "Pesquisador"
    ) {
      let elems = document.querySelectorAll(".fixed-action-btn");
      const options = new Object({
        direction: "left",
        hoverEnabled: false,
        toolbarEnabled: false,
      });
      M.FloatingActionButton.init(elems, options);
    }
  });

  userCollection
    .where("__name__", "==", firebaseUser.uid)
    .get()
    .then((querySnapshot) => {
      if (
        querySnapshot.docs[0].data().type == "Coordenador" ||
        querySnapshot.docs[0].data().type == "Pesquisador"
      ) {
        database
          .collection("Projetos")
          .where("pesquisador", "==", firebaseUser.email)
          .get()
          .then(function (querySnapshot) {
            const docSnapshots = querySnapshot.docs;
            for (let i = 0; i < querySnapshot.size; i++) {
              createPageContent(docSnapshots, i, false);
            }
          });
      } else {
        userDoc
          .collection("Projetos")
          .get()
          .then(function (querySnapshot) {
            const docSnapshots = querySnapshot.docs;
            for (let i = 0; i < querySnapshot.size; i++) {
              if (querySnapshot.docs[i] == undefined) {
                return 0;
              }
              createPageContent(docSnapshots, i, true);
            }
          });
      }
    });
});
