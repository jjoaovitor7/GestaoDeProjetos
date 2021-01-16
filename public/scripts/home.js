const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }

  const container = document.querySelector(".container");
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
                  document.querySelector(".container").style.display = "flex";
                  document.querySelector(".container").style.flexDirection = "column";

                  window.sessionStorage.setItem("projeto", document.querySelector(".card-title.i${i}").textContent);

                  document.querySelector(".container").innerHTML =
                    "<header><h1>" +
                    document.querySelector('.card-title.i${i}').textContent +
                    "</h1></header><br />" +
                    '<p style="text-align: center;">' +
                    document.querySelector('.card-desc.j${i}').textContent +
                    "</p>";

                  document.querySelector(".container").innerHTML += '<p class="alunos" style="margin-top: 25px;">Alunos:</p>';
                  document.querySelector(".container").innerHTML += '<p class="tarefas" style="margin-top: 25px;">Tarefas:</p>';
                  document.querySelector(".container").innerHTML += '<div class="fixed-action-btn"> <a class="btn-floating btn-large teal" style="font-size: 25px"> + </a> <ul><li><a class="btn-floating teal" style="font-size: 25px;display: flex;justify-content: center;align-items: center;" title="Adicionar aluno" href="./project/addAluno.html">➕</a></li> <li><a class="btn-floating teal" style="font-size: 25px;display: flex;justify-content: center;align-items: center;" title="Adicionar tarefa" href="./project/addTarefa.html">➕</a></li> </ul></div>';

                  ${queryString.append(
                    "projeto",
                    document.querySelector(".card-title.i" + i).textContent
                  )}

                  database
                  .collection('Projetos')
                  .doc('${queryString.get("projeto")}')
                  .get()
                  .then((docSnapshot) => {

                    if(docSnapshot.data().alunosId == undefined) {
                      return 0;
                    }

                    for (let i = 0; i < docSnapshot.data().alunosId.length; i++) {
                      database
                      .collection('Usuarios')
                      .doc(docSnapshot.data().alunosId[i])
                      .get()
                      .then((docSnapshot) => {
                        document.querySelector(".alunos").innerHTML += "<br />👤" + docSnapshot.data().nome;
                      });
                    }
                  });

                  database
                  .collection('Tarefas').where("projetoAssociado", "==", '${queryString.get(
                    "projeto"
                  )}')
                  .get()
                  .then((querySnapshot) => {
                    for (let i = 0; i < querySnapshot.size; i++) {
                      document.querySelector(".tarefas").innerHTML +=
                        "<div class='card horizontal' style='margin: 5px 0 15px 0'><div class='card-content'><div class='card-title'><p style='word-wrap: anywhere;'>" + querySnapshot.docs[i].data().nome + "</p></div><p style='word-wrap: anywhere;'>" + querySnapshot.docs[i].data().descricao + "</p></div></div>";
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
        userDoc
          .collection("Projetos")
          .get()
          .then(function (querySnapshot) {
            for (let i = 0; i < querySnapshot.size; i++) {
              if (querySnapshot.docs[i] == undefined) {
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
                    document.querySelector(".container").style.display = "flex";
                    document.querySelector(".container").style.flexDirection = "column";
  
                    window.sessionStorage.setItem(
                      "projeto",
                      document.querySelector(".card-title.i${i}").textContent
                    );

                    // window.sessionStorage.setItem(
                    //   "descProjeto",
                    //   document.querySelector(".card-desc.j${i}").textContent
                    // );
  
                    document.querySelector(".container").innerHTML =
                      "<header><h1>" +
                      document.querySelector('.card-title.i${i}').textContent +
                      "</h1></header><br />";
                     // '<p style="text-align: center;">' +
                     // document.querySelector('.card-desc.j${i}').textContent +
                     // "</p>";

                    document.querySelector(".container").innerHTML += '<p class="alunos" style="margin-top: 25px;">Alunos:</p>';
                    document.querySelector(".container").innerHTML += '<p class="tarefas" style="margin-top: 25px;">Tarefas:</p>';

                    ${queryString.append(
                      "projeto",
                      document.querySelector(".card-title.i" + i).textContent
                    )}

                    database
                    .collection('Projetos')
                    .doc('${queryString.get("projeto")}')
                    .get()
                    .then((docSnapshot) => {

                      if(docSnapshot.data().alunosId == undefined) {
                        return 0;
                      }

                      for (let i = 0; i < docSnapshot.data().alunosId.length; i++) {
                        database
                        .collection('Usuarios')
                        .doc(docSnapshot.data().alunosId[i])
                        .get()
                        .then((docSnapshot) => {
                          document.querySelector(".alunos").innerHTML += "<br />👤" + docSnapshot.data().nome;
                        });
                      }
                    });

                    database
                    .collection('Tarefas').where("projetoAssociado", "==", '${queryString.get(
                      "projeto"
                    )}')
                    .get()
                    .then((querySnapshot) => {
                     for (let i = 0; i < querySnapshot.size; i++) {
                      document.querySelector(".tarefas").innerHTML +=
                       "<div class='card horizontal' style='margin: 5px 0 15px 0'><div class='card-content'><div class='card-title'><p style='word-wrap: anywhere;'>" + querySnapshot.docs[i].data().nome + "</p></div><p style='word-wrap: anywhere;'>" + querySnapshot.docs[i].data().descricao + "</p></div></div>";
                      }
                    });
                    `;
              }
              aCardAction.setAttribute("onClick", onClickACardAction());
            }
          });
      }
    });
});
