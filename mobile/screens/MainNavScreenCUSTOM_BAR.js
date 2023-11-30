import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Your screen components
import PhrasesScreen from './PhrasesScreen';
import FlashCardScreen from './FlashCardScreen';
// import SettingsScreen from './SettingsScreen';

const gloStyles = require('../gloStyles'); //Global Styles


const Tab = createBottomTabNavigator();

const MainNavScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#b3b3b3',
          tabBarStyle: {
            backgroundColor: '#47a81a',
            borderTopWidth: 0,
            paddingBottom: 5,
          },
        }}
        tabBar={({ state, navigation }) => (
          <View style={styles.menuBarContainer}>
            <View style={styles.menuBarStyle}>
              <TouchableOpacity onPress={() => navigation.navigate('Phrases')} style={{ flex: 1, alignItems: 'center' }} >
                <Icon name="language" size={30} color={state.index === 0 ? '#fff' : '#b3b3b3'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('FlashCards')} style={{ flex: 1, alignItems: 'center' }} >
                <Icon name="albums" size={30} color={state.index === 1 ? '#fff' : '#b3b3b3'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={[ gloStyles.gloShadow, { alignItems: 'center', backgroundColor:'#3867c7', borderRadius:100, position:'relative', top:-30,}]} >
                <Icon name="add" size={65} color={'#fff'} style={{ paddingLeft:5, }}/> 
              </TouchableOpacity>
              {/* The plus icon is off-centered for some reason. */}
              <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ flex: 1, alignItems: 'center' }}>
                <Icon name="settings-sharp" size={30} color={state.index === 3 ? '#fff' : '#b3b3b3'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      >
        <Tab.Screen name="Phrases" component={PhrasesScreen} />
        <Tab.Screen name="FlashCards" component={FlashCardScreen} />
        <Tab.Screen name="Settings" component={FlashCardScreen} />
      </Tab.Navigator>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        {/* Your Modal content */}
        <View style={styles.modalContainer}>
          <Text>This is a modal</Text>
          {/* Add your modal content here */}
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuBarContainer:{
    // flexDirection: 'row', 
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent',
    height:140,
  },
  menuBarStyle:{
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    backgroundColor:'#47a81a', 
    height:80, 
    width:300,
    alignItems:'center',
    // marginBottom:10,
    // width:'90%',
    borderRadius:10,
  }
});

export default MainNavScreen;
