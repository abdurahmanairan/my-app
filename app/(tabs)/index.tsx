import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text }>Hi, this is my first app in React Native</Text>
      <TextInput style={styles.input} placeholder='Hello'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Verdana'
  },
  input: {
    marginTop: '3%',
    width: '80%',
    height: '5%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8
  }
});