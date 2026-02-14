import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const [userFirstName, setName] = useState('');

    useEffect(() => {
        const getUserFirstName = async () => {
            let first_name = await AsyncStorage.getItem('first_name');
            setName(first_name);
        }

        getUserFirstName();
    })


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>
                Здравствуйте, {userFirstName}!
            </Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Редактировать профиль</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signoutbutton} onPress={async () => {
                    await AsyncStorage.removeItem('access_token');
                    await AsyncStorage.removeItem('user_id');
                    router.replace('/');
                }
            }>
                <Text style={styles.signoutbuttonText}>Выйти</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: '100%',
    height: '8%',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    marginLeft: '6%'
  },
   signoutbuttonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 600
  },
  signoutbutton: {
    width: '90%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(70, 70, 70, 0.47)',
    borderRadius: 8,
    marginTop: '4%',
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'Arial',
    margin: 20
  }
})