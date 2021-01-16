function getFirebaseApp() {
  const config = {
    apiKey: env.APIKEY,
    authDomain: env.AUTHDOMAIN,
    projectId: env.PROJECTID,
    storageBucket: env.STORAGEBUCKET,
    messagingSenderId: env.MESSAGINGSENDERID,
    appId: env.APPID,
  };

  if (!firebase.apps.length) {
    return firebase.initializeApp(config);
  } else {
    return firebase.app();
  }
}
