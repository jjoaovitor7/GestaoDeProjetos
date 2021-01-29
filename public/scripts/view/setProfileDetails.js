function setProfileDetails(querySnapshot) {
  const full = querySnapshot.data().nome;
  const first = full.split(" ")[0][0];
  let second;

  if (full.split(" ")[1] == undefined) {
    second = " ";
  } else {
    second = full.split(" ")[1][0];
  }

  // prettier-ignore
  document.querySelector(".profile-avatar").textContent = `${first}${second}`;
  document.querySelector(".profile-name").textContent = full;
  // prettier-ignore
  document.querySelector(".profile-email").textContent = querySnapshot.data().email;
}
