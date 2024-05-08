import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
// import CookieManager from '@react-native-cookies/cookies';
import {getAccessToken} from '../libs/utils';
import {UserContext, getDetails, getSubjects} from '../libs/context';
import {styles} from '../styles/authStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native-paper';
import {connectToDatabase, createTables} from '../../db/db';
import NetInfo from '@react-native-community/netinfo';

function Loading() {
  const navigation = useNavigation();
  const {details, setDetails} = useContext(UserContext);
  const [isNetConnected, setIsNetConnected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createTable = async () => {
    const db = await connectToDatabase();
    if (!accessToken) {
      await createTables(db);
    }
  };

  const unsubscribe = NetInfo.addEventListener(async state => {
    let accessToken = '';
    accessToken = await getAccessToken();
    if (state.isConnected && accessToken) {
       (async function () {
        if (accessToken) {
          const {userData}: any = await getDetails();
          setDetails({
            ...details,
            accessToken,
            userDetails: userData,
          });
          navigation.replace('home');
        } else {
          navigation.replace('login');
        }
      })();
      navigation.navigate('home');
    } else if (!isNetConnected && !accessToken) {
      navigation.navigate('login');
    } else {
      navigation.replace('home');
    }
  });

  useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#0000ff" />
    </SafeAreaView>
  );
}

export default Loading;
