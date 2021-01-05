const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
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
              let card = document.createElement("div");
              card.classList = "card";

              let cardContent = document.createElement("div");
              cardContent.classList = "card-content";

              let cardTitle = document.createElement("span");
              cardTitle.classList = `card-title i${i}`;
              cardTitle.textContent = docSnapshots[i].data().nome;
              cardContent.appendChild(cardTitle);

              let descProjeto = document.createElement("p");
              descProjeto.classList = `card-desc j${i}`;
              descProjeto.textContent = docSnapshots[i].data().descricao;
              cardContent.appendChild(descProjeto);

              let cardAction = document.createElement("div");
              cardAction.classList = "card-action";
              aCardAction = document.createElement("a");

              let queryString = new URLSearchParams(window.location.search);

              aCardAction.classList = "btn btn-primary";
              aCardAction.textContent = "Veja o projeto";
              cardAction.appendChild(aCardAction);

              card.appendChild(cardContent);
              card.appendChild(cardAction);

              container.appendChild(card);

              function onClickACardAction() {
                return `
          container.style.display = "flex";
          container.style.flexDirection = "column";

          window.localStorage.setItem(
            "projeto",
            document.querySelector(".card-title.i${i}").textContent
          );

          container.innerHTML =
            "<header><h1>" +
            document.querySelector('.card-title.i${i}').textContent +
            "</h1></header><br />" +
            '<p style="text-align: center;">' +
            document.querySelector('.card-desc.j${i}').textContent +
            "</p>";

          container.innerHTML +=
            '<p class="alunos" style="margin-top: 25px;">Alunos:</p>';

          container.innerHTML +=
            '<div class="fixed-action-btn"> <a class="btn-floating btn-large teal" style="font-size: 25px"> + </a> <ul><li><a class="btn-floating teal" style="font-size: 25px;display: flex;justify-content: center;align-items: center;" title="Adicionar aluno" href="./project/add_aluno.html">➕</a></li></ul></div>';

            ${queryString.append(
              "projeto",
              document.querySelector(".card-title.i" + i).textContent
            )}

          database
          .collection('Projetos/${queryString.get("projeto")}/Alunos')
          .get()
          .then((querySnapshot) => {
            for (let i = 0; i < querySnapshot.size; i++) {
              document.querySelector(".alunos").innerHTML +=
                "<br />" + querySnapshot.docs[i].data().nomeAluno;
            }
          });

          let elems = document.querySelectorAll(".fixed-action-btn");
          const options = new Object({
            direction: "left",
            hoverEnabled: false,
            toolbarEnabled: false,
          });

          M.FloatingActionButton.init(elems, options);
          `;
              }

              aCardAction.setAttribute("onClick", onClickACardAction());
            }
          });
      } else {
        database
          .collectionGroup("Alunos")
          .where("emailAluno", "==", firebaseUser.email)
          .get()
          .then(function (querySnapshot) {
            for (let i = 0; i < querySnapshot.size; i++) {
              database.collection("Usuarios").doc(firebaseUser.uid).collection("Projetos").get().then((querySnapshot) => {
                
                if(querySnapshot.docs[i] == undefined) {
                  return 0;
                }
                let card = document.createElement("div");
                card.classList = "card";
  
                let cardContent = document.createElement("div");
                cardContent.classList = "card-content";
  
                let cardTitle = document.createElement("span");
                cardTitle.classList = `card-title i${i}`;
                cardTitle.textContent = querySnapshot.docs[i].data().nome;
                cardContent.appendChild(cardTitle);
  
                // let descProjeto = document.createElement("p");
                // descProjeto.classList = `card-desc j${i}`;
                // descProjeto.textContent = docSnapshots[i].data().descricao;
                // cardContent.appendChild(descProjeto);
  
                let cardAction = document.createElement("div");
                cardAction.classList = "card-action";
                aCardAction = document.createElement("a");
  
                let queryString = new URLSearchParams(window.location.search);
  
                aCardAction.classList = "btn btn-primary";
                aCardAction.textContent = "Veja o projeto";
                cardAction.appendChild(aCardAction);
  
                card.appendChild(cardContent);
                card.appendChild(cardAction);
  
                container.appendChild(card);
  
                function onClickACardAction() {
                  return `
                  container.style.display = "flex";
                  container.style.flexDirection = "column";
  
                  window.localStorage.setItem(
                    "projeto",
                    document.querySelector(".card-title.i${i}").textContent
                  );

                  // window.localStorage.setItem(
                  //   "descProjeto",
                  //   document.querySelector(".card-desc.j${i}").textContent
                  // );
  
                  container.innerHTML =
                    "<header><h1>" +
                    document.querySelector('.card-title.i${i}').textContent +
                    "</h1></header><br />";
                    // '<p style="text-align: center;">' +
                    // document.querySelector('.card-desc.j${i}').textContent +
                    // "</p>";
  
                  container.innerHTML +=
                    '<p class="alunos" style="margin-top: 25px;">Alunos:</p>';
  
                    ${queryString.append(
                      "projeto",
                      document.querySelector(".card-title.i" + i).textContent
                    )}
  
                  database
                  .collection('Projetos/${queryString.get("projeto")}/Alunos')
                  .get()
                  .then((querySnapshot) => {
                    for (let i = 0; i < querySnapshot.size; i++) {
                      document.querySelector(".alunos").innerHTML +=
                        "<br />" + querySnapshot.docs[i].data().nomeAluno;
                    }
                  });
                  `;
                }
  
                aCardAction.setAttribute("onClick", onClickACardAction());
              })
    
            }
          });
      }
    });
});
