import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';


const gloStyles = require('../gloStyles'); //Global Styles


const SideMenu = ({ navigation }) => {
  const navigateToScreen = (screenName) => () => {
    navigation.navigate(screenName);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={[styles.containerSideNav, gloStyles.bgPrimary,]} scrollEnabled={false}>
      <View style={{ flex: 2, backgroundColor: 'transparent', marginTop:'10%', marginBottom: '10%', }}>
        <TouchableOpacity style={styles.sideNavBtn} onPress={navigateToScreen('MainNavScreen')}>
          <Image style={styles.sideNavImg} source={require('../assets/icon.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between', flexDirection:'column',width:'100%', }}>
        <View>
          {/* <TouchableOpacity style={styles.sideNavBtn} onPress={navigateToScreen('MainNavScreen')}>
            <Text style={styles.sideNavBtnText}>Home</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.sideNavBtn} onPress={navigateToScreen('AboutScreen')}>
            <Text style={styles.sideNavBtnText}>Quiz (Coming soon!)</Text>
          </TouchableOpacity> */}
        </View>
        <View style={{marginBottom:'10%', justifyContent:'center', flexDirection:'row', width:'100%',}}>
          <TouchableOpacity style={styles.sideNavBtn} onPress={navigateToScreen('SettingsStackScreen')}>
          <Icon name="settings-outline" size={24} color="white" style={{ marginRight: 16 }} />
            <Text style={styles.sideNavBtnText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{ flex: 1, flexDirection: 'column-reverse', backgroundColor: 'transparent', paddingBottom:10, }}>
        <TouchableOpacity style={styles.sideNavBtn} onPress={handleLogout}>
          <Text style={[styles.sideNavBtnText,{color:'#a19d94'}]}>Sign out</Text>
        </TouchableOpacity>
      </View> */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  containerSideNav: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: '#1c4568',
  },
  sideNavBtn: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection:'row',
  },
  sideNavBtnText: {
    fontSize: 20,
    marginBottom: 0,
    color: '#fff',
    fontWeight: 'bold',
  },
  sideNavImg: {
    height: 150,
    width: 150,
    marginBottom: 5,
  },
});

export default SideMenu;