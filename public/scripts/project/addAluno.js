const config = {
  apiKey: env.APIKEY,
  authDomain: env.AUTHDOMAIN,
  projectId: env.PROJECTID,
  storageBucket: env.STORAGEBUCKET,
  messagingSenderId: env.MESSAGINGSENDERID,
  appId: env.APPID,
};

const database = firebase.firestore(firebase.initializeApp(config));

function addAluno() {
  database
    .collection("Usuarios")
    .where("type", "==", "Aluno")
    .where("activationStatus", "==", true)
    .get()
    .then(function (querySnapshot) {
      const docSnapshots = querySnapshot.docs;

      let container = document.querySelector(".container");
      let ul = document.createElement("ul");
      ul.style.marginLeft = "450px";

      for (let i = 0; i < querySnapshot.size; i++) {
        // prettier-ignore
        ul.innerHTML +=
      `
      <li id=${docSnapshots[i].id} class=i${i} style="text-align: center; margin-bottom: 25px;">
      ${docSnapshots[i].data().nome} (${docSnapshots[i].data().email})
      <a style="cursor: pointer;" onclick="database.collection('Projetos').doc('${window.sessionStorage.getItem('projeto')}').update({alunosId: firebase.firestore.FieldValue.arrayUnion(document.querySelector('.i${i}').id), alunosEmail: firebase.firestore.FieldValue.arrayUnion('${window.sessionStorage.getItem(`docSnapshotemail${i}`)}')}); database.collection('Usuarios').doc(document.querySelector('.i${i}').id).collection('Projetos').doc('${window.sessionStorage.getItem('projeto')}').set({nome: '${window.sessionStorage.getItem('projeto')}'});">✔️</a>
      </li>
      `;

        window.sessionStorage.setItem(
          "docSnapshotnome" + i,
          docSnapshots[i].data().nome
        );
        // prettier-ignore
        window.sessionStorage.setItem("docSnapshotemail" + i, docSnapshots[i].data().email);

        container.appendChild(ul);
      }
    });
}

addAluno();
