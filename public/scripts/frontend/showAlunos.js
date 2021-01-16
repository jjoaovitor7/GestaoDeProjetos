function showAlunos(docSnapshots, i) {
  return `
    <li id=${docSnapshots[i].id} class=i${i} style="text-align: center; margin-bottom: 25px;">
    ${docSnapshots[i].data().nome} (${docSnapshots[i].data().email})
    <a style="cursor: pointer;" onclick=${updateProjectAndUser(i)}>✔️</a>
    </li>
    `;
}
