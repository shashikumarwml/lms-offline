import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserContext} from '../../libs/context';
import {connectToDatabase, createTables} from '../../../db/db';
import {getSubjects, insertData} from '../../../db/subjects';
import RNFS, {readFile, writeFile} from 'react-native-fs';
import Loader from '../common/Loader';
import {ActivityIndicator} from 'react-native-paper';
import {Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Button} from 'react-native';
import {getChaptersService, getTopicsService} from '../../services/user';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function Home() {
  const navigation = useNavigation();
  const {
    details: {accessToken, subjects},
  }: any = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const newData = [];
      const db = await connectToDatabase();
      getChaptersService(accessToken).then(async ({data}) => {
        // Write data to file
        for (let item of data) {
          let topics = [];
          const newItem = {};
          for (let topic of item.topics) {
            const {data, errors} = await getTopicsService(
              accessToken,
              topic.id,
            );
            if (data) {
              data.results.map(content => {
                let newTopic = {};
                newTopic.name = topic.name;
                newTopic.contentPath = `${
                  RNFS.DocumentDirectoryPath
                }/${content.content.split('/').pop()}`;
                newTopic.topic_id = topic.id;
                newTopic.content_id = content.id;
                newTopic.type = content.type;
                topics.push(newTopic);
                onDownload(content.content);
              });
            } else {
              console.log(errors, 'err');
            }
          }
          newItem.code = item.code;
          newItem.display_name = item.name;
          newItem.id = item.id;
          newItem.name = item.name;
          newItem.topics = topics;
          newItem.contentPath = '';
          newData.push(newItem);
        }
        console.log('newItem: ', newData);
        writeFile(
          `${RNFS.DocumentDirectoryPath}/data.json`,
          JSON.stringify(newData),
          'utf8',
        )
          .then(() => {
            console.log('Data downloaded and saved locally.');
          })
          .catch(error => {
            console.error('Error saving data locally:', error);
          });
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // useEffect(() => {
  //   NetInfo.addEventListener(async state => {
  //     console.log('state: ', state.isConnected);
  //     if (state.isConnected) {
  //       loadData();
  //     }
  //   });
  // }, []);

  const [chapters, setChapters] = useState([]);

  const onDownload = async url => {
    const fileName = url.substring(url.lastIndexOf('/') + 1); // Extract the file name from the URL
    const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      const response = await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
      }).promise;
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  async function getData() {
    const db = await connectToDatabase();
    readFile(`${RNFS.DocumentDirectoryPath}/data.json`, 'utf8')
      .then(data => {
        const jsonData = JSON.parse(data);
        setChapters(jsonData);
      })
      .catch(error => {
        console.error('Error reading data from file:', error);
      });
  }

  async function getItems() {
    const db = await connectToDatabase();
    const subjectsData = await getSubjects(db);
  }

  return (
    <ScrollView>
      <Text>HOme</Text>
      <TouchableOpacity onPress={() => getItems()}>
        <Text>Subjets</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('subjectDetails')}>
        <Text>Subject Details</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => downloadItems()}>
        <Text>Download</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => getData()}>
        <Text>getData</Text>
      </TouchableOpacity>
      <>
        {chapters &&
          chapters.map(i => (
            <View>
              <Text>
                {i.name}-{i.topics.length}
              </Text>
              {i.topics.map(child => {
                console.log('child: ', child.contentPath);
                return (
                  <View>
                    <Text>
                      {child.contentPath}={child.type}
                    </Text>
                    {child.type === 'IMAGE' && (
                      <Image
                        source={{uri: `file://${child.contentPath}`}}
                        style={{width: 200, height: 100}}
                      />
                    )}
                    {child.type === 'VIDEO' && (
                      <View>
                        <Video
                          style={{
                            height: 400,
                            width: 400,
                          }}
                          source={{uri: `file://${child.contentPath}`}}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
      </>

      {loading && <ActivityIndicator />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    width: '100%',
  },
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
});
