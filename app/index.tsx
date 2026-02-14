import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  useEffect(() => {
    const checkSession = async () => {
      if (await AsyncStorage.getItem('access_token') !== null) {
        router.replace('/home');
      }
    }
    checkSession();
  })

  function getApiresponse() {
    fetch('http://citymultibot.kbncran.ru/api/v1/users/auth', 
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginForm)
      },
    )
    .then(
      response => response.json()
    )
    .then(response => {
        if (response.msg !== "OK") {
          Alert.alert("Invalid email/password")
          return
        } else {
          AsyncStorage.setItem("access_token", response.access_token);
          AsyncStorage.setItem("user_id", response.access_token);
          AsyncStorage.setItem("first_name", response.first_name);
          router.replace('/home');
        }
      })
  }

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Добро пожаловать!</Text>
      <View style={styles.centerContent}>
        <TextInput 
          style={styles.input} 
          keyboardType='email-address' 
          value={loginForm.email}
          onChangeText={(text) => setLoginForm({...loginForm, email: text})}
        />
        <TextInput 
          style={styles.input} 
          secureTextEntry={true}
          value={loginForm.password}
          onChangeText={(text) => setLoginForm({...loginForm, password: text})}
        />
        <TouchableOpacity style={styles.button} onPress={getApiresponse}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Helvetica',
    marginTop: '15%',
    /* marginLeft: '8%' */
  },
  centerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: '30%'
  },
  input: {
    margin: '2%',
    width: '85%',
    height: '10%',
    borderWidth: 0.5,
    borderColor: '#fff',
    color: 'white',
    borderRadius: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#09bcf3',
    margin: '2%',
    width: '85%',
    height: '10%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: 'white'
  },
});