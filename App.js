import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, TouchableHighlightComponent } from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false); //travel 이면 working 값이 false
  const work = () => setWorking(true); //work 이면 working 값이 true
  const onChangeText = (payload) => setText(payload);
  
  const STORAGE_KEY = "@toDos";

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    s !== null ? setToDos(JSON.parse(s)) : null;
  };

  useEffect(() => {
    loadToDos();
  }, []);

  const addToDo = async () => {
    if(text === "") {
      return
    }
    const newToDos = {...toDos, [Date.now()]: {text, working}};
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Really?", [
      {text: "Cancel"}, 
      {text: "Sure", style: "destructive", 
        onPress : async () => {
        const newToDos = {...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        await saveToDos(newToDos);
      }}
    ]);
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
        <ScrollView>
          {Object.keys(toDos).map((key) => (
            toDos[key].working === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="close-a" size={13} color={theme.gray} />
              </TouchableOpacity>
            </View> 
            ) : null
          ))}
        </ScrollView>
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
    marginVertical: 20,
    marginHorizontal: 15,
    fontSize: 17 
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius:  15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  toDoText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  }
});
