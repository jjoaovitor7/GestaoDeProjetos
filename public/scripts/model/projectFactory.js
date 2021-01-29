function projectFactory(firebaseUser, nomeProjeto, descProjeto) {
  return {
    pesquisador: firebaseUser.email,
    nome: nomeProjeto.value,
    descricao: descProjeto.value,
  };
}
