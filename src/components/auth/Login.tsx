/* eslint-disable react-native/no-inline-styles */
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, { useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {HelperText} from 'react-native-paper';
import loginService from '../../services/login';
import {styles} from '../../styles/authStyle';
import CustomInput from '../common/CustomInput';
import Loader from '../common/Loader';
import setAccessToken from '../../libs/utils';

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState([]);
  const navigation = useNavigation();

  async function onSubmit() {
    setLoading(true);
    const {data, errors}: any = await loginService({username, password});
    if (data) {
      setAccessToken(data.key);
      navigation.navigate('loading');
    } else {
      setLoginErrors(errors);
      console.log('errors: ', errors);
    }
    setLoading(false);
  }

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <View style={styles.loginContainer}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={{gap: 10, width: '100%'}}>
        <Text style={styles.headerText}>LMS</Text>
        <CustomInput
          label="Username"
          returnKeyType="next"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setLoginErrors({});
          }}
          error={!!loginErrors && loginErrors.username}
          errorText={loginErrors && loginErrors.username}
          autoCapitalize="none"
          autoCompleteType="username"
          textContentType="UsernameAddress"
          keyboardType="username-address"
        />
        <CustomInput
          label="Password"
          returnKeyType="next"
          value={password}
          onChangeText={text => {
            setPassword(text);
            setLoginErrors({});
          }}
          error={!!loginErrors.password && loginErrors.password}
          errorText={loginErrors.password && loginErrors.password}
          autoCapitalize="none"
          autoCompleteType="password"
          textContentType="password"
          // keyboardType="password"
          type="password"
          secureTextEntry={!showPassword}
        />
        <View onPress={() => navigation.navigate('Details')}>
          <Text style={styles.forgotTextStyle}>Forgot Password</Text>
        </View>
      </View>
      {loginErrors.nonFieldErrors && (
        <HelperText
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: 'red',
          }}>
          {loginErrors.nonFieldErrors}
        </HelperText>
      )}
      <TouchableOpacity
        onPress={() => onSubmit()}
        style={{
          width: '100%',
          padding: 10,
          borderWidth: 0.5,
          borderRadius: 5,
          borderColor: '#3b8ba5',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#3b8ba5',
            textAlign: 'center',
            fontWeight: '400',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
