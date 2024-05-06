import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from '../../styles/authStyle';

export default function CustomInput({errorText, label, ...props}: any) {
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 10,
        position: 'relative',
        rowGap: 2,
      }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.textinput,
          {
            borderColor: errorText ? '#f13a59' : '#f2f2f2',
            borderWidth: errorText ? 1.2 : 1,
          },
        ]}
        selectionColor={'#600EE6'}
        {...props}
      />

      {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
    </View>
  );
}
