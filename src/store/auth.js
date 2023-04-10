import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password)
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async register({}, {email, password, name}) {
      createUserWithEmailAndPassword(auth, email, password, name)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    },
    async logout() {
      await signOut(getAuth()).then(() => {
        
      })
      .catch((error) => {
        console.log(error)
      });
      
    }
  }
}