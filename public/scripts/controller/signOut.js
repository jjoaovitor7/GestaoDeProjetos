function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      showToastLogout();
    })
    .catch(function (error) {
      showToastError();
      console.log(error);
    });
}
