const database = firebase.firestore(getFirebaseApp());

firebase.auth().onAuthStateChanged((firebaseUser) => {
  if (firebaseUser == null) {
    return (location.href = "http://127.0.0.1:5500/");
  }
});

function updateProjectAndUser(i) {
  return `"database.collection('Projetos').doc('${window.sessionStorage.getItem(
    "projeto"
  )}').update({alunosId: firebase.firestore.FieldValue.arrayUnion(document.querySelector('.i${i}').id), alunosEmail: firebase.firestore.FieldValue.arrayUnion('${window.sessionStorage.getItem(
    `docSnapshotemail${i}`
  )}')}); database.collection('Usuarios').doc(document.querySelector('.i${i}').id).collection('Projetos').doc('${window.sessionStorage.getItem(
    "projeto"
  )}').set({nome: '${window.sessionStorage.getItem("projeto")}'});"`;
}

function setItemDocSnapshot(i, name, docSnapshot) {
  window.sessionStorage.setItem(name.concat(i), docSnapshot);
}

function addAluno() {
  const userCollection = database.collection("Usuarios");

  userCollection
    .where("type", "==", "Aluno")
    .where("activationStatus", "==", true)
    .get()
    .then(function (querySnapshot) {
      const docSnapshots = querySnapshot.docs;

      let container = document.querySelector(".container");
      let ul = document.createElement("ul");
      ul.style.marginLeft = "450px";

      for (let i = 0; i < querySnapshot.size; i++) {
        ul.innerHTML += showAlunos(docSnapshots, i);

        //prettier-ignore
        setItemDocSnapshot(i, "docSnapshotnome",  docSnapshots[i].data().nome );
        setItemDocSnapshot(i, "docSnapshotemail", docSnapshots[i].data().email);

        container.appendChild(ul);
      }
    });
}

addAluno();
