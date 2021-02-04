import React, { useEffect } from 'react';
import { View ,Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {getDataUserServer} from '../../api/handler';
export default function Main(){
    const navigation =useNavigation();
    useEffect(()=>{
        const getUserData=async()=>{
            let cookie = await AsyncStorage.getItem('@cookie');
            console.log(cookie);
            if(!cookie){
               return navigation.navigate("LOGIN");
            }
            getDataUserServer(cookie).then((result)=>{
                console.log(result.headers);
               return result.text()
            }).then((text)=>{
                console.log(text);
            })
        }
        getUserData();
    },[])
    return(
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    }
})