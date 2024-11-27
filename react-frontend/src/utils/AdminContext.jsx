import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { isAdminUser } from '../utils/adminUtils';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        const username = userDoc.data()?.username;
        setIsAdmin(isAdminUser(auth.currentUser, username));
      }
    };
    fetchAdminStatus();
  }, []);

  return (
    <AdminContext.Provider value={isAdmin}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);