import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
// import CookieManager from '@react-native-cookies/cookies';
import {getAccessToken} from '../libs/utils';
import {UserContext, getDetails, getSubjects} from '../libs/context';
import {styles} from '../styles/authStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native-paper';
import {connectToDatabase, createTables} from '../../db/db';

function Loading() {
  const navigation = useNavigation();
  const {details, setDetails} = useContext(UserContext);
  const createTable = async () => {
    const db = await connectToDatabase();
    if (!accessToken) {
      await createTables(db);
    }
  };


  useEffect(() => {
    let accessToken = '';
    if (!accessToken) {
      createTable();
    }
    (async function () {
      accessToken = await getAccessToken();
      if (accessToken) {
        const {userData}: any = await getDetails();
        const {subjectsData}: any = await getSubjects();
        setDetails({
          ...details,
          accessToken,
          userDetails: userData,
          subjects: subjectsData.results,
        });
        navigation.replace('home');
      } else {
        navigation.replace('login');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="small" color="#0000ff" />
    </SafeAreaView>
  );
}

export default Loading;
