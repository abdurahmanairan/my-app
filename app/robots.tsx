import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function robots() {
    const [robotData, setRobotData] = useState([]);
    const { id } = useLocalSearchParams();

    async function getRobotData() {
        let user_id = await AsyncStorage.getItem('user_id');
        let access_token = await AsyncStorage.getItem('access_token');

        let res = await fetch('http://citymultibot.kbncran.ru/api/robots/' + id + '?id=' + user_id,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
        )
        if (res.status === 200) {
            res.json().then(response => {
                setRobotData(response.robots);
            })
        }
    }

    useEffect(() => {
        getRobotData();
    }, [])

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                {robotData.map((robot, index) => (
                    <TouchableOpacity key={index}>
                        <Text>
                            {robot.id}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
