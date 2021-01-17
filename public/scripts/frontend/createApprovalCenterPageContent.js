function createPageContent(querySnapshot, docSnapshots) {
  let div = document.createElement("div");
  div.classList = "container-pesquisadores";

  for (let i = 0; i < querySnapshot.size; i++) {
    let p = document.createElement("p");
    let buttonAprovar = document.createElement("button");
    buttonAprovar.textContent = "Aprovar";
    buttonAprovar.setAttribute(
      "onClick",
      setFunctionOnClickButtonAprovar(docSnapshots, i)
    );

    let buttonReprovar = document.createElement("button");
    buttonReprovar.textContent = "Reprovar";
    buttonReprovar.setAttribute(
      "onClick",
      setFunctionOnClickButtonReprovar(docSnapshots, i)
    );

    div.appendChild(p);
    div.appendChild(buttonAprovar);
    div.appendChild(buttonReprovar);
    p.textContent = `Pesquisador: ${docSnapshots[i].data().nome} (${
      docSnapshots[i].data().email
    })`;
    document.body.appendChild(div);
  }
}

function ifNotCoordenador() {
  document.querySelector("body").innerHTML =
    "<p style='margin-left: 5px; margin-top: 5px; font-size: 28px;'>Você não é coordenador.</p>";
}
