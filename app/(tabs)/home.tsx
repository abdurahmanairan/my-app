import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainScreen(){
    const [parkData, setData] = useState([]);

    async function getParkList() {
        let user_id = await AsyncStorage.getItem("user_id");
        let access_token = await AsyncStorage.getItem("access_token");
        let res = await fetch('http://citymultibot.kbncran.ru/api/parkings?id=' + user_id + '&app=user',
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
        )
        if (res.status === 200) {
          await res.json()
          .then(response => {
              setData(response.parkings);
            }
          )
        } else {
          await AsyncStorage.removeItem('access_token');
          await router.replace('/');
        }
    }

    useEffect(() => {
      getParkList();
    }, [])

    function getRobotData(parking) {
      router.push({
        pathname: '/robots',
        params: {id: parking.id}
      })
    }

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {parkData.map((item, index) => (
                <TouchableOpacity key={index} style={styles.parkcontainer} onPress={() => getRobotData(item)}>
                    <Text style={styles.text}>
                        {item.name}
                    </Text>
                    <Text style={styles.addresstext}>
                       г. {item.city}, {item.street} {item.building}
                    </Text>
                    <View style={styles.horizontal}>
                        <Text style={styles.parkareas}>
                            Всего мест: {item.park_area_count}
                        </Text>
                        <Text style={styles.addresstext}>
                            Свободно: {item.free_park_areas}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%'
  },
  parkcontainer: {
    /* alignItems: 'center', */
    borderRadius: 10,
    height: 100,
    width: width * 0.95,
    margin: 4,
    justifyContent: 'center',
    backgroundColor: 'rgba(48, 177, 166, 0.53)',
    padding: '3%'
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Helvetica',
    marginLeft: '2%'
  },
  addresstext: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Helvetica',
    marginLeft: '2%'
  },
  parkareas: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Helvetica',
    marginLeft: '2%',
    marginRight: 'auto'
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    margin: '2%',
    width: '80%',
    height: '8%',
    borderWidth: 1,
    borderColor: '#fff',
    color: 'white',
    borderRadius: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#09bcf3',
    margin: '5%',
    width: '30%',
    height: '8%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: 'white'
  },
  horizontal: {
    flexDirection: 'row',
    marginTop: '2%',
    justifyContent: 'center'
  }
})