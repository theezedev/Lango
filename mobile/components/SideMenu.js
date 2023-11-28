import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';


const gloStyles = require('../gloStyles'); //Global Styles


const SideMenu = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const navigateToScreen = (screenName) => () => {
    navigation.navigate(screenName);
  };

  return (
    <DrawerContentScrollView contentContainerStyle={[styles.containerSideNav, gloStyles.bgPrimary,]} scrollEnabled={false}>
      <View style={{ flex: 0, backgroundColor: 'transparent', marginTop:'10%', marginBottom: '10%', }}>
        <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:100, padding:10,}} onPress={navigateToScreen('MainNavScreen')}>
          <Image style={styles.sideNavImg} source={require('../assets/icon-trans.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between', flexDirection:'column',width:'100%' }}>
        <View>
          <TouchableOpacity style={styles.sideNavBtn} onPress={navigateToScreen('MainNavScreen')}>
            <Text style={styles.sideNavBtnText}>Lango</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sideNavBtn} >
          <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={navigateToScreen('SettingsStackScreen')}>
            <Icon name="settings-outline" size={24} color="#fff" style={{ marginRight: 13 }} />
            <Text style={styles.sideNavBtnText}>{t('Settings')}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderRightColor: '#47a81a',
  },
  sideNavBtn: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection:'row',
    padding:10,
    // backgroundColor:'#fff',
    // borderRadius:100,
    // borderWidth:3,
    // borderColor:'#12416b',
    justifyContent:'center',
  },
  sideNavBtnText: {
    fontSize: 24,
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