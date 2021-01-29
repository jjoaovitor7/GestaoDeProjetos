function createPageContent(docSnapshots, i, isAluno) {
  function createElementWithClassList(element, classList) {
    const _element = document.createElement(element);
    _element.classList = classList;
    return _element;
  }

  const container = document.querySelector(".container");

  const card = createElementWithClassList("div", "card");
  const cardContent = createElementWithClassList("div", "card-content");
  const cardTitle = createElementWithClassList("span", `card-title i${i}`);
  cardTitle.textContent = docSnapshots[i].data().nome;
  cardContent.appendChild(cardTitle);

  if (!isAluno) {
    const descProjeto = createElementWithClassList("p", `card-desc j${i}`);
    descProjeto.textContent = docSnapshots[i].data().descricao;
    cardContent.appendChild(descProjeto);
  }

  const cardAction = createElementWithClassList("div", "card-action");
  aCardAction = createElementWithClassList("a", "btn btn-primary");

  aCardAction.textContent = "Veja o projeto";
  cardAction.appendChild(aCardAction);

  card.appendChild(cardContent);
  card.appendChild(cardAction);

  container.appendChild(card);

  let queryString = new URLSearchParams(window.location.search);

  function setItemSessionStorage(i) {
    return `
        window.sessionStorage.setItem(
          "projeto",
          document.querySelector(".card-title.i${i}").textContent
        );
      `;
  }

  function setCardTitleAndCardDesc(i, isAluno) {
    if (isAluno) {
      return `
        document.querySelector(".container").innerHTML =
        "<header><h1>" +
        document.querySelector('.card-title.i${i}').textContent +
        "</h1></header><br />";
      `;
    } else {
      return `
        document.querySelector(".container").innerHTML =
        "<header><h1>" +
        document.querySelector('.card-title.i${i}').textContent +
        "</h1></header><br />" +

        '<p style="text-align: center;">' +
        document.querySelector('.card-desc.j${i}').textContent +
        "</p>";
      `;
    }
  }

  function setContainerStyle() {
    return `
      document.querySelector(".container").style.display = "flex";
      document.querySelector(".container").style.flexDirection = "column";
    `;
  }

  function showAlunosAndTarefas() {
    return `
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

  if (isAluno) {
    function onClickACardAction() {
      return `
        ${setContainerStyle()}
        ${setItemSessionStorage(i, true)}
        ${setCardTitleAndCardDesc(i, true)}
        ${showAlunosAndTarefas()}
        `;
    }
  } else {
    function onClickACardAction() {
      return `
          ${setContainerStyle()}
          ${setItemSessionStorage(i, false)}
          ${setCardTitleAndCardDesc(i, false)}
          document.querySelector(".container").innerHTML += '<div class="fixed-action-btn"> <a class="btn-floating btn-large teal" style="font-size: 25px"> + </a> <ul><li><a class="btn-floating teal" style="font-size: 25px;display: flex;justify-content: center;align-items: center;" title="Adicionar aluno" href="./project/addAluno.html">➕</a></li> <li><a class="btn-floating teal" style="font-size: 25px;display: flex;justify-content: center;align-items: center;" title="Adicionar tarefa" href="./project/addTarefa.html">➕</a></li> </ul></div>';
          ${showAlunosAndTarefas()}
          let elems = document.querySelectorAll(".fixed-action-btn");
          const options = new Object({
            direction: "left",
            hoverEnabled: false,
            toolbarEnabled: false,
          });
  
          M.FloatingActionButton.init(elems, options);
        `;
    }
  }

  aCardAction.setAttribute("onClick", onClickACardAction());
}
