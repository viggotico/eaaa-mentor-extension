'use client'

import { useEffect, useState } from "react";
import { ApiFrontend } from "@/services/api/ApiFrontend";

export const useSession = () => {
  const [loggedIn, setLoggedIn] = useState(!!ApiFrontend.currentUser);
  const [currentUser, setCurrentUser] = useState(ApiFrontend.currentUser);
  useEffect(() => {
    console.log('current user changed...', !!ApiFrontend.currentUser);
    setLoggedIn(!!ApiFrontend.currentUser);
    setCurrentUser(ApiFrontend.currentUser);
  }, [ApiFrontend.currentUser]);

  return { loggedIn, currentUser, setLoggedIn, setCurrentUser };
}