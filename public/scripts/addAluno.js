const config = {
};

const app = firebase.initializeApp(config);
const database = firebase.firestore(app);

database
  .collection("Usuarios")
  .where("type", "==", "Aluno")
  .where("activationStatus", "==", true)
  .get()
  .then(function (querySnapshot) {
    const docSnapshots = querySnapshot.docs;

    let container = document.querySelector(".container");
    let ul = document.createElement("ul");
    for (let i = 0; i < querySnapshot.size; i++) {
      let li = document.createElement("li");
      li.textContent = `${docSnapshots[i].data().nome} (${
        docSnapshots[i].data().email
      })`;
      li.setAttribute("id", docSnapshots[i].id);
      localStorage.setItem("docSnapshot" + i, docSnapshots[i].data().nome);
      li.classList = `i${i}`;
      li.style.textAlign = "center";
      li.style.marginLeft = "450px";
      li.style.marginBottom = "25px";
      ul.appendChild(li);
      let a = document.createElement("a");
      a.textContent = "✔️";
      a.style.marginLeft = "10px";
      a.style.cursor = "pointer";
      li.appendChild(a);
      container.appendChild(ul);
      a.setAttribute(
        "onClick",
        `database.collection('Projetos').doc(localStorage.getItem('projeto')).collection("Alunos").doc(document.querySelector('.i${i}').id).set({ nomeAluno: localStorage.getItem('docSnapshot${i}'), status: true })`
      );
    }
  });
