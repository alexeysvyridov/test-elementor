import db from '../firebase.config';
import { getFirestore, collection, doc, addDoc, updateDoc, setDoc } from 'firebase/firestore';

export const getUserIp = async ():Promise<string | undefined> => {
    try {
      const data = await fetch('https://geolocation-db.com/json/');
      const response = await data.json();
      return response.IPv4;
    } catch (error) {
      console.log(error);
    }
  };

  export const findUserByEmail = async (email: string): Promise<any> => {
    try { 
      const resp = await db.collection('users').where('email', '==', email ).get();
        let user;
        resp.forEach((doc) => {
          const userFromdb = doc.data();
          if (doc.data()?.email === email) {
            user = userFromdb
          }
        })
      return user
    } catch (error) {
      console.log(error)
    }
  } 
  export const createUser = async (user:User): Promise<void> => {
    try {
      await setDoc(doc(db, "users", user.id || ''), user);
    } catch (error) {
      console.log(error);
    }
  }

export const updateUser = async (user: User): Promise<void> => {
    try {
      const docUser = doc(db, "users", user?.id || '');
        await updateDoc(docUser, {...user})

    } catch (error) {
      console.log(error)
    }
  } 