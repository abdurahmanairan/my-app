import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getApiresponse() {
  fetch('http://citymultibot.kbncran.ru')
  .then(
    response => response.json()
  )
  .then(
    response => {
      Alert.alert(JSON.stringify(response));
    }
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Sign in</Text>
      <View style={styles.centerContent}>
        <TextInput style={styles.input}/>
        <TextInput style={styles.input}/>
        <TouchableOpacity style={styles.button} onPress={getApiresponse}>
          <Text style={styles.buttonText}>Sign in</Text>
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
    fontSize: 48,
    fontFamily: 'Arial',
    marginTop: 20,  // Add some spacing from top
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
});