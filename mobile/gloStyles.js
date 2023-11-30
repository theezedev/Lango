'use strict';
import { StyleSheet, Platform } from 'react-native';

module.exports = StyleSheet.create({
  mainContainer:{
    flex:1 ,
  },
  screenContainer:{
    flex:1 ,
    paddingHorizontal:'2%',
  },
  formControl: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  bgPrimary:{
    backgroundColor:'#47a81a',
    color:'#fff',
  },
  btnPrimary:{
      backgroundColor:'#47a81a',
      color:'#fff',
      padding:10,
      justifyContent:'center',
      alignItems:'center',
      ...Platform.select({
          ios: {
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
              width: 0,
              height: -3,
            },
            borderRadius: '5%',
          },
          android: {
            borderRadius: 10,
            elevation: 10,
          },
        }),

  },
  txtWhite:{
      color:'#fff',
  },
  backgroundImage:{
      flex: 1,
      justifyContent: 'center',
  },
  gloShadow: {
      elevation: 15,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowOffset: {
        width: 0,
        height: 4,
      },
  },
  selectedButton:{
      backgroundColor:'#43464b',
  },

});
