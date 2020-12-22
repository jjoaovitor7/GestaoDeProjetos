const config = {
};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

let container = document.querySelector(".container");

firebase.auth().onAuthStateChanged((firebaseUser) => {
  database
    .collection("Usuarios")
    .doc(firebaseUser.uid)
    .get()
    .then(function (docSnapshot) {
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

  database
    .collection("Usuarios")
    .doc(firebaseUser.uid)
    .collection("Projetos")
    .get()
    .then(function (querySnapshot) {
      const docSnapshots = querySnapshot.docs;

      for (let i = 0; i < querySnapshot.size; i++) {
        let card = document.createElement("div");
        card.classList = "card";

        let cardContent = document.createElement("div");
        cardContent.classList = "card-content";

        let cardTitle = document.createElement("span");
        cardTitle.classList = "card-title";
        cardTitle.textContent = docSnapshots[i].data().nome;
        cardContent.appendChild(cardTitle);

        let descProjeto = document.createElement("p");
        descProjeto.textContent = docSnapshots[i].data().descricao;
        cardContent.appendChild(descProjeto);

        let cardAction = document.createElement("div");
        cardAction.classList = "card-action";
        aCardAction = document.createElement("a");
        aCardAction.setAttribute("href", "#");
        aCardAction.classList = "btn btn-primary";
        aCardAction.textContent = "Veja o projeto";
        cardAction.appendChild(aCardAction);

        card.appendChild(cardContent);
        card.appendChild(cardAction);

        container.appendChild(card);
      }
    });
});
