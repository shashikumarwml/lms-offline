import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {UserContext} from '../../libs/context';
import {connectToDatabase, createTables} from '../../../db/db';
import {getSubjects, insertData} from '../../../db/subjects';
import RNFS from 'react-native-fs';
import Loader from '../common/Loader';
import {ActivityIndicator} from 'react-native-paper';
import {Button} from 'react-native';

var files = [
  {
    name: 'test1',
    filename: 'test1.w4a',
    filepath: RNFS.DocumentDirectoryPath + '/test1.w4a',
    filetype: 'audio/x-m4a',
  },
  {
    name: 'test2',
    filename: 'test2.w4a',
    filepath: RNFS.DocumentDirectoryPath + '/test2.w4a',
    filetype: 'audio/x-m4a',
  },
];

export default function Home() {
  const {
    details: {accessToken, subjects},
  }: any = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await insertData(db, subjects);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [data, setData] = useState([]);

  const onDownload = async url => {
    const fileName = url.substring(url.lastIndexOf('/') + 1); // Extract the file name from the URL
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    console.log('Downloading file from:', url);
    console.log('Saving file to:', filePath);

    try {
      const response = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
      }).promise;

      console.log('Download response:', response);
      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  function downloadItems() {
    mediaData.map(i => onDownload(i.content));
  }

  async function getData() {
    setLoading(true);
    const filePath =
      RNFS.DocumentDirectoryPath +
      '/React_video_player__Custom_video_player_in_react_js.mp3';

    console.log('filePath: ', filePath);
    await RNFS.readFile(filePath, 'base64')
      .then(data => {
        // Process the file content
        console.log('File content:', data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error reading file:', err);
      });
  }

  async function getItems() {
    const db = await connectToDatabase();
    const subjectsData = await getSubjects(db);
  }

  return (
    <View>
      <Text>HOme</Text>
      <TouchableOpacity onPress={() => getItems()}>
        <Text>Subjets</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => downloadItems()}>
        <Text>Download</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => getData()}>
        <Text>getData</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator  />}
    </View>
  );
}
