import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image, FlatList, Dimensions, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MTIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Divider, } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

const subjectContent = [{
  id: 1,
  title: 'Introduction to Biology',
  topics: [{
    id: 3,
    name: 'Defination and branches',
    data: [{
      id: 7,
      content: 'content1',
      icon: 'play-circle-outline'
    },
    {
      id: 8,
      content: 'content2',
      icon: 'playlist-music'
    },
    ],
    subTopics: [{
      id: 15,
      subName: 'SubTopics1',
      subData: [{
        id: 17,
        subDataName: 'SubDataName1'
      },
    {
      id: 18,
      subDataName: 'SubDataName2'
    }]
    },
    {
      id: 16,
      subName: 'SubTopic2',
      subData: [{
        id: 19,
        subDataName: 'SubDataName3'
      },
    {
      id: 20,
      subDataName: 'SubDataName4'
    }]
    }
  ]
    
  },
  {
    id: 4,
    name: 'Importance Of Biology',
    data: [{
      id: 9,
      content: 'About Kidneys',
      icon: 'file-pdf-box'
    },
    {
      id: 10,
      content: 'About Skin',
      icon: 'file-document-multiple-outline'
    }],
    subTopics: [{
      id: 22,
      subName: 'SubTopics1',
      subData: [{
        id: 24,
        subDataName: 'SubDataName1'
      },
    {
      id: 25,
      subDataName: 'SubDataName2'
    }]
    },
    {
      id: 23,
      subName: 'SubTopic2',
      subData: [{
        id: 26,
        subDataName: 'SubDataName3'
      },
    {
      id: 27,
      subDataName: 'SubDataName4'
    }]
    }
  ]
    
  },
  ]
},
{
  id: 2,
  title: 'Cell Structure and Function',
  topics: [{
    id: 5,
    name: 'Cell Functionality',
    data: [{
      id: 11,
      content: 'data1',
      icon: 'image'
    },
    {
      id: 12,
      content: 'data2',
      icon: 'file-document-multiple-outline'
    }]
  },
  {
    id: 6,
    name: 'Definations',
    data: [{
      id: 13,
      content: 'data3',
      icon: 'play-circle-outline'
    },
    {
      id: 14,
      content: 'data4',
      icon: 'playlist-music'
    }]
  }]
}]

const tabData = [{
  id: 1,
  name: 'Overview',
  value: 'overview'
},
{
  id: 2,
  name: 'Q&A',
  value: 'questionsAndAnswers'
},
{
  id: 3,
  name: 'Notes',
  value: 'notes'
}
]

export default function SubjectDetails() {

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([])
  const [value, setValue] = useState('overview');


  console.log(value, 'value')

  const renderSubTopics = (data: any, isSelected) => {
    return data.map((item, index) => {
      return (
        <View key={index} style={{ flexDirection: "row", alignItems: 'center' }} >
          <Icon name={item.icon} size={30} style={{ color: '#25CCF7' }} />
          <Text style={{ marginVertical: 10, letterSpacing: 1, fontWeight: '500', color: '#616C6F', width: '90%', marginLeft: isSelected ? 25 : '', fontSize: 20 }} numberOfLines={1}>{item.content}</Text>
        </View>
      )
    })
  }

  const onSelectTopics = (item: any) => {

    const filteredChapters = [...selectedTopics];
    if (filteredChapters.indexOf(item.id) === -1) {
      filteredChapters.push(item.id);
    } else {
      filteredChapters.splice(filteredChapters.indexOf(item.id), 1);
    }
    setSelectedTopics(filteredChapters);

  };

  const renderTopics = (item: any,) => {

    return item.map((eachItem: any, index: any) => {

      return (
        <View key={index} style={{ marginLeft: 15 }}>
          <TouchableOpacity onPress={() => onSelectTopics(eachItem)}
            style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={subjectContent.topics === eachItem.name ? { marginVertical: 10, color: '#104f70', fontWeight: '700', fontSize: 15 } : { marginVertical: 10, color: '#2F363F', fontSize: 20, fontWeight: '500', letterSpacing: 1 }}>{eachItem.name}</Text>
            <MTIcon name={selectedTopics.includes(eachItem.id) ? "minus-box" : "plus-box"} color='#104f70' size={25} />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 5 }}>
            {selectedTopics.includes(eachItem.id) && renderSubTopics(eachItem.data, true,)}
          </View>
        </View>
      )
    })
  }

  const onSelectChapters = (item: any) => {

    const filteredChapters = [...selectedChapters];
    if (filteredChapters.indexOf(item.id) === -1) {
      filteredChapters.push(item.id);
    } else {
      filteredChapters.splice(filteredChapters.indexOf(item.id), 1);
    }
    setSelectedChapters(filteredChapters);

  };

  const renderChapters = ({ item, index }: any) => {

    return (
      <View key={index}>
        <TouchableOpacity onPress={() => (onSelectChapters(item), setSelectedTopics([]))}
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={subjectContent === item.name ? { marginVertical: 10, color: '#104f70', fontWeight: '700', fontSize: 30 } : { marginVertical: 10, color: '#104f70', fontSize: 20, fontWeight: '500', letterSpacing: 1 }}>{item.title}</Text>
          <MTIcon name={selectedChapters.includes(item.id) ? "minus-box" : "plus-box"} color='#104f70' size={25} />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 5 }}>
          {selectedChapters.includes(item.id) && renderTopics(item.topics, item)}
        </View>
      </View>

    )
  }

  function renderOverviewData() {
    return (
      <View >
        <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 25, letterSpacing: 1, width: 150 }}>Chapter</Text>
          <Text style={{ color: 'black', fontWeight: '700', fontSize: 25, letterSpacing: 1 }}>:</Text>
          <Text style={{ color: 'black', fontWeight: '500', fontSize: 20, letterSpacing: 1 }}>Introduction to Biology</Text>
        </View>
        <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 25, letterSpacing: 1, width: 150 }}>Topic</Text>
          <Text style={{ color: 'black', fontWeight: '700', fontSize: 25, letterSpacing: 1 }}>:</Text>
          <Text style={{ color: 'black', fontWeight: '500', fontSize: 20, letterSpacing: 1 }}>Importance of Biology</Text>
        </View>
      </View>

    )
  }

  function renderQuestionsData() {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 25, letterSpacing: 1, }}>Questions Data</Text>
      </View>
    )
  }

  function renderNotes() {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 25, letterSpacing: 1, }}>Notes Data</Text>
      </View>
    )
  }


  return (
    <View style={{ position: 'relative', backgroundColor: 'white', height: '100%' }}>
     <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('home')}>
          <Icon name='arrow-left-thin' size={40} ></Icon>
          <Text style={{ fontWeight: '700', fontSize: 25, letterSpacing: 1, }}>Back</Text>
        </TouchableOpacity>

        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30, letterSpacing: 1 }}>Biology</Text>

        <TouchableOpacity ><Icon name="dots-vertical" size={40}></Icon></TouchableOpacity>

      </View>
      <Divider />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '100%' }}>
        {modalVisible &&
          <View style={styles.modalView}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, letterSpacing: 1, marginVertical: 20 }}>Subject Content</Text>
            <FlatList
              renderItem={renderChapters}
              data={subjectContent}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        }
        <View style={{ width: modalVisible ? '60%' : '100%', paddingHorizontal: 20, marginVertical: 10 }}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          </View> */}
          <View style={{gap: 40}}>
            <View style={{ flexDirection: 'row', columnGap: 10, alignItems: 'center',}}>
              <Text style={{ color: 'black', fontWeight: '700', fontSize: 25, letterSpacing: 1 }}>Intoduction to Biology</Text>
            </View>
            <View style={{ height: 400, width: '100%', }}>
              <Image
                source={{ uri: 'https://st3.depositphotos.com/3591429/13204/i/450/depositphotos_132044380-stock-photo-graphic-text-and-learning-concept.jpg' }}
                style={{ flex: 1, resizeMode: 'cover', height: '100%', width: '100%' }}
              />
            </View>
            <View style={{paddingVertical:30}}>
              <View style={{ flexDirection: 'row', gap: 100 }}>
                {
                  tabData.map((data, index) => {
                    const valuedData = data;
                    return (
                      <View key={index}  >
                        <TouchableOpacity onPress={() => setValue(data.value)}>
                          <Text style={valuedData.value === value ? { color: 'black', fontWeight: '700', fontSize: 25, letterSpacing: 1, } : { color: 'black', fontWeight: '400', fontSize: 25, letterSpacing: 1, }}>{data.name}</Text>
                          <View style={valuedData.value === value ? { borderBottomWidth: 2 } : {}} />
                        </TouchableOpacity>

                      </View>

                    )
                  })
                }
              </View>
              <Divider />
              <View style={{ padding: 8 }}>
                {
                  value === 'overview' && renderOverviewData()

                }
                {
                  value === 'questionsAndAnswers' && renderQuestionsData()
                }
                {
                  value === 'notes' && renderNotes()
                }
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', top: '50%', left: modalVisible ? 320 : '0%' }}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
          {modalVisible ? <Icon name="chevron-left" color='#104f70' size={40} /> : <Icon name="chevron-right" color='#104f70' size={40} />}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  modalView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '40%',
    padding: 10,
    height: '100%',
  },

});