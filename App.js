import React, { useState, useCallback, useEffect} from 'react';
import {View , Text, StyleSheet, SafeAreaView , StatusBar, TouchableOpacity, FlatList, Modal, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons' 
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimateBtn = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App(){
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  // Buscando todas tarefas ao iniciar o app
  useEffect(() => {

    async function loadtask(){
      const taskStorage = await AsyncStorage.getItem('@task');

      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }

    }

    loadtask();


  }, []);

  //Salvando caso tenha alguma gterfa alterada
  useEffect(() =>{
    async function saveTask(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTask(); 

  }, [task]);


  function handleAdd(){
      if (input === '') return;

      const data= {
          key: input,
          task: input
      };

      setTask([...task, data]);
      setOpen(false);
      setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.Key !== data.key);
    setTask(find);
  })

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content"></StatusBar> 
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      {/*Lista de itens : */}
      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.Key) }
      renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete} /> }
      />
      
    <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>

            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setOpen(false)}>
                    <Ionicons name ="md-arrow-back" size={40} color="white" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Nova Tarefa</Text>
            </View>
            
            <Animatable.View style={styles.modalbody}
            animation="fadeInUp">
                <TextInput
                multiline={true}
                placeholderTextColor='gray'
                autoCorrect={false}
                placeholder="O que precisa fazer hoje?" 
                style={styles.input} 
                value={input}
                onChangeText={ (texto) => setInput(texto)}
                />

                <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
                    <Text style={styles.handleText}>Cadastrar</Text>
                </TouchableOpacity>

            </Animatable.View>

        </SafeAreaView>
    </Modal>


      {/*Botão de adicionar :*/ }
      <AnimateBtn 
      style={styles.icon}
      useNativeDriver
      Animatable="bounceInUp"
      duration={1500}
      onPress={ ( ) => setOpen(true)}
      >

        <Ionicons name='ios-add' size={35} color="white"></Ionicons>
      </AnimateBtn>

    </SafeAreaView>
      
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#171d31',
    
  },
  title:{
    marginTop: 18,
    paddingBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 26,
    
  },
  icon:{
    position: 'absolute',
    width: 50,
    height: 55,
    backgroundColor: '#0094FF',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:'center',
    right: 25,
    bottom: 50,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3
    }
  },
  modal:{
      flex: 1,
      backgroundColor:"#171d31",
  },
  modalHeader:{
      marginLeft: 10,
      marginTop: 15,
      flexDirection: 'row',
      alignItems: 'center',
  },
  modalTitle:{
      marginLeft: 15,
      fontSize: 25,
      color:'white',
  },
  modalbody:{
    marginTop: 20
  },
  input:{
    fontSize: 20,
    backgroundColor:"white",
    height: 85,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    color:'black'
  },  
  handleAdd:{
    backgroundColor:"white",
    borderRadius: 10,
    fontSize: 25,
    marginTop: 30,
    padding: 9,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  handleText:{
    fontSize: 23,

  },
});