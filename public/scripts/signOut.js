function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      M.toast({
        html: "Deslogado!",
        displayLength: 6000,
      });
    })
    .catch(function (error) {
      M.toast({
        html: "Erro!",
        displayLength: 6000,
      });
      console.log(error);
    });
}
