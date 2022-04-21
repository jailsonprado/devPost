/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  async function signUp(email, password, name) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            name: name,
            createdAt: new Date(),
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
            };

            setUser(data);
          });
      })
      .catch(error => console.log(error));
  }

  async function signIn(email, password) {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const userProfile = await firestore()
          .collection('users').doc(uid).get();
          let data = {
            uid: uid,
            name: userProfile.data().name,
            email: value.user.email,
          }
          setUser(data)

        // console.log(userProfile.data().name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AuthContext.Provider value={{signed: !!user, signUp, signIn}}>
      {children}
    </AuthContext.Provider>
  );
}
