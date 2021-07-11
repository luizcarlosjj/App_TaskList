import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function TaskList({ data , handleDelete}){
    return(
        <Animatable.View 
        style={styles.container}
        animation="bounceIn"
        useNativeDriver
        >
           
           <TouchableOpacity onPress={ () => handleDelete(data)}>
            <Ionicons name="md-checkmark-circle" size={30} color= '#000'/>
           </TouchableOpacity>

           <View>
               <Text style={styles.Task}> {data.task} </Text>
           </View>

        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        color:'white',
        margin: 8,
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius: 10,
        padding: 7,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width:1,
            height: 3
        }
    },
    Task:{
        color: '#000',
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 20
    }

});