import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useTranslation } from 'react-i18next';
import { Swipeable } from 'react-native-gesture-handler';


const gloStyles = require('../gloStyles'); //Global Styles
import uuid from 'react-native-uuid';


const CategorySettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [appCategories, setAppCategories] = useState('');
  const [categoryToAdd, setCategoryToAdd] = useState('');

  let row = [];
  let prevOpenedRow;

  useEffect(() => {
    const fetchData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('appData');
            if (jsonValue !== null) {
              const data = JSON.parse(jsonValue);
              const cats = data?.appInfo.appCategories || [];
        
              setAppCategories(cats);

            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };
    
    fetchData();
  }, []);

  const openModal = (item) => {
    setCategoryID(item.categoryID);
    setCategoryToUpdate(item.category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setCategoryToUpdate('');
    setModalVisible(false);
  };

  const renderCategoryItem = ({ item, index }, onClick) => {
  
    const closeRow = (index) => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress, dragX, onClick) => {
    return (
        <TouchableOpacity
            onPress={() => deleteCategory(item.categoryID)}
            style={{
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            }}
        >
            <Text style={{ color: 'white' }}>DELETE</Text>
        </TouchableOpacity>
    );
    };

    return (
    <Swipeable
        renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, onClick)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        rightOpenValue={-100}
    >
      <View>
        <TouchableOpacity style={[styles.itemContainer, {width:'100%',}]} onPress={() => openModal(item)}>
            <Text style={{fontSize:20,}}>{item.category}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
    );
  };

  const addCategory = async () => {
    try {
      if (!categoryToAdd.trim()) {
        // Handle empty category name if needed
        return;
      }
  
      const newCategory = {
        categoryID: uuid.v4(),
        category: categoryToAdd.trim(),
      };
  
      const updatedCategories = [...appCategories, newCategory];
      setAppCategories(updatedCategories);
  
      // Save updated categories to AsyncStorage
      const jsonValue = await AsyncStorage.getItem('appData');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        data.appInfo.appCategories = updatedCategories;
        await AsyncStorage.setItem('appData', JSON.stringify(data));
      }
  
      setCategoryToAdd('');
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async () => {
    try {
      if (!categoryToUpdate.trim()) {
        // Handle empty category name if needed
        return;
      }
  
      const updatedCategories = appCategories.map((category) => {
        if (category.categoryID === categoryID) {
          return { ...category, category: categoryToUpdate.trim() };
        }
        return category;
      });
  
      setAppCategories(updatedCategories);
  
      const jsonValue = await AsyncStorage.getItem('appData');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        data.appInfo.appCategories = updatedCategories;
        await AsyncStorage.setItem('appData', JSON.stringify(data));
      }
  
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating category name:', error);
    }
  };

  const deleteCategory = async (categoryIDToDelete) => {
    try {
      const shouldDelete = await new Promise((resolve) => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this category?',
          [
            { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' },
            {
              text: 'Delete',
              onPress: () => resolve(true),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      });
  
      if (shouldDelete) {
        const updatedCategories = appCategories.filter(
          (category) => category.categoryID !== categoryIDToDelete
        );
  
        setAppCategories(updatedCategories);
  
        const jsonValue = await AsyncStorage.getItem('appData');
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue);
          data.appInfo.appCategories = updatedCategories;
          await AsyncStorage.setItem('appData', JSON.stringify(data));
        }
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TextInput
          style={[gloStyles.formControl, {flex:1, height:50}]}
          placeholder="Enter category name"
          onChangeText={(text) => setCategoryToAdd(text)}
          value={categoryToAdd}
        />
        <TouchableOpacity style={[gloStyles.btnPrimary, {flexDirection:'row', minWidth:90, margin:10,}]} onPress={addCategory}>
          <Icon name="add" size={20} color={'#fff'} />
          <Text style={{fontSize:15,color:'#fff',padding:5,}}>{t('Add')}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={appCategories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.categoryID}
        style={{ marginBottom: 20 }}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          
          <View style={{width:'80%', height:'60%', backgroundColor: 'white', padding: 20, borderRadius: 10,justifyContent:'space-between', }}>
            <View style={{flexDirection:'row-reverse', marginBottom:10,}}>
              <TouchableOpacity onPress={closeModal}>
                  <Icon name="close" size={30} color={'#47a81a'} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{marginBottom:5, fontWeight:'bold'}}>Update category name:</Text>
              <TextInput
                style={gloStyles.formControl}
                placeholder="Update category name"
                onChangeText={(text) => setCategoryToUpdate(text)}
                value={categoryToUpdate}
              />
            </View> 
            
            <TouchableOpacity style={gloStyles.btnPrimary} onPress={updateCategory}>
              <Text style={gloStyles.txtWhite}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
      // backgroundColor:'#47a81a'
  },
});

export default CategorySettingsScreen;
