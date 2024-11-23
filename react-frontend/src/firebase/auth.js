import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
  } from 'firebase/auth';
  import { app } from './config';
  
  const auth = getAuth(app);
  
  export const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.code };
    }
  };
  
  export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.code };
    }
  };
  
  export const logOut = async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error.code };
    }
  };
  
  export { auth };