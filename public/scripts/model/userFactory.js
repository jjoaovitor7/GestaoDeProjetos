function userFactory() {
  return {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    url_lattes: document.getElementById("lattesURL").value,
    type: document.querySelector('input[name="type"]:checked').value,
    activationStatus: null,
  };
}
