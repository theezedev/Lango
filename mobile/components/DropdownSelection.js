import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDownSelection({ selectedValue, label, options, labelVisible, onChange, containerStyle, dropDirection }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);
  const [items, setItems] = useState(options);

  return (
    <View style={styles.fieldContainer}>
      {labelVisible && (
        <Text style={styles.label}>{label}:</Text>
      )}
      <DropDownPicker
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={(text) => onChange(text)}
        theme="LIGHT"
        multiple={false}
        mode="BADGE"
        listMode="SCROLLVIEW"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
        style={[{minHeight: 40, borderWidth: 1, borderColor: '#ccc',}]}
        containerStyle={containerStyle}
        dropDownDirection={dropDirection}
        zIndex={1000}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 8, // Adjust this value as needed
  },
});
