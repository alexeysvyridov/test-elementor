import db from '../firebase.config';
import { getFirestore, collection, query, getDocs, doc, addDoc, updateDoc } from 'firebase/firestore';

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
    const createId = Math.random().toString(16).slice(2).toString()
    try {
      await db.collection("users").doc(createId).set(user)
      // await addDoc(collection(db, "users"), user)
    } catch (error) {
      console.log(error);
    }
  }
  export const updateUser = async (user: User): Promise<void> => {
    try {
      const resp = await db.collection('users').where('email', '==', user.email ).get();
        let userUpdate = {};
        resp.forEach((doc) => {
          const userFromdb = doc.data();
          if (doc.data()?.email === user.email) {
            userUpdate = userFromdb
          }
        })

        const docUser = doc(db, "users", "qnhtMNUNbbUe6BqdDNdi");
        console.log(resp);
        await updateDoc(docUser, {...userUpdate, ...user})

    } catch (error) {
      console.log(error)
    }
  } 