  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import {getAuth} from "firebase/auth";
  import {getFirestore} from "firebase/firestore";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBw9sxx7VR2pTrZxK_XXh6l1FgHJAh_kfE",
    authDomain: "narayana-jewellery.firebaseapp.com",
    projectId: "narayana-jewellery",
    storageBucket: "narayana-jewellery.firebasestorage.app",
    messagingSenderId: "614392339547",
    appId: "1:614392339547:web:743b066b5632ea9c8ab37e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  export const auth=getAuth(app);
  export const db=getFirestore(app);



  export { app };

