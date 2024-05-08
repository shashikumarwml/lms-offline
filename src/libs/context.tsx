import React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import getUserDetailsService, { getSubjectsService } from '../services/user';
import {getAccessToken} from './utils';
import {UserContextTypes, defaultValue} from '../types/context';
import {ChildrenProps} from '../types/generic';
import NetInfo from '@react-native-community/netinfo';


export const UserContext = createContext<UserContextTypes>({});

export async function getDetails() {
  const accessToken = await getAccessToken();
  if (accessToken != null) {
    const {data: userData} = await getUserDetailsService(accessToken);
    if (userData != null) {
      return {userData, accessToken};
    }
    return {userData: {}, accessToken};
  }
  return {userData: {}, accessToken: ''};
}

export async function getSubjects() {
  const accessToken = await getAccessToken();
  if (accessToken != null) {
    const {data: subjectsData} = await getSubjectsService(accessToken);
    if (subjectsData != null) {
      return {subjectsData, accessToken};
    }
    return {subjectsData: {}, accessToken};
  }
  return {subjectsData: {}, accessToken: ''};
}


export default function ContextProvider({children}: ChildrenProps) {
  const [details, setDetails] = useState<UserContextTypes>(defaultValue);

  async function getUserDetails() {
    const {userData, accessToken} = await getDetails();
    setDetails({...details, accessToken, userDetails: userData});
  }

useEffect(() => {
    NetInfo.addEventListener(async state => {
       console.log('state: ', state.isConnected);
      if (state.isConnected) {
        getUserDetails();
      }
    })
  }, []);


  return (
    <UserContext.Provider value={{details, setDetails}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (Object.values(context).length === 0) {
    throw new Error('useStoreContext must be used within a ContextProvider');
  }
  return context;
}
