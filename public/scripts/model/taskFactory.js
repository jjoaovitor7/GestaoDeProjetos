function taskFactory(name, desc, project) {
  return {
    nome: name.value,
    descricao: desc.value,
    projetoAssociado: project,
  };
}
