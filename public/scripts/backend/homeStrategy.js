function context(strategy) {
  return strategy;
}

function CoordenadorAndPesquisadorStrategy(firebaseUser) {
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
}

function AlunoStrategy(userDoc) {
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
