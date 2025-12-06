
//  this file will just get me the token and setUser

import { useNavigation } from "react-router-dom";
import { createContext , useContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    user: null, // looged in user info
    token: null,
    loading: true // while the data loades
});
