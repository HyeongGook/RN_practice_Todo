import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { theme } from './colors';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false); //travel 이면 working 값이 false
  const work = () => setWorking(true); //work 이면 working 값이 true
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if(text === "") {
      return
    }
    setText("");
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.1} onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.gray}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.1} onPress={travel}>
          <Text style={{...styles.btnText, color: working ? theme.gray : "white"}}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          value={text}
          returnKeyType='done'
          placeholder={working ? "Add a To Do" : "Where do you want to go?"} 
          style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
   
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  btnText: {
    //color: "white",
    fontSize: 45,
    fontWeight: "500",
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 17
    
  }
});
