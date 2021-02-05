import React, { useEffect, useState } from 'react';
import { View ,Text, StyleSheet, PointPropType, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {getDataUserServer,getListUserOnline} from '../../api/handler';
import cheerio from 'react-native-cheerio';
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const {height}=Dimensions.get("window");
export default function Main(){
    const navigation =useNavigation();
    const [username,setUserName]= useState<string>('');
    const [loading,setLoading] =useState<boolean>(false);
    const [listUser,setListUser]= useState<string[]>([]);
    useEffect(()=>{
        const getUserData=async()=>{
            let cookie = await AsyncStorage.getItem('@cookie');
            if(!cookie){
               return navigation.navigate("LOGIN");
            }
            setLoading(true);
            getDataUserServer(cookie)
            .then((result)=>{
               return result.text()
            }).then((text)=>{
                setLoading(false);
                let regex = new RegExp(/(?=nick:").*(?=\,)/g);
                let data = regex.exec(text);
                let name = data[0].replace(/nick:"/g,"").replace(/"/g,"");
                setUserName(name);
            }).catch(error=> {
                setLoading(false);
            })
        }
        //_GetUserOnline();
        getUserData();
    },[])
    const _LogOut = async()=>{
        await AsyncStorage.removeItem('@cookie');
        return navigation.navigate("LOGIN");
    }
    const _GetUserOnline = async()=>{
        let cookie = await AsyncStorage.getItem('@cookie');
        setLoading(true);
        getListUserOnline(cookie).then((result)=>{
            setListUser(result);
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        });
    }
    return(
        <View style={styles.container}>
            <View style={{flexDirection:"row" ,justifyContent:"space-between",marginBottom:20}}>
                <Text>User : {username}</Text>
                <TouchableOpacity onPress={_LogOut}>
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row" ,marginBottom:20}}>
                <Text>Total User :{listUser.length} </Text>
                <View  style={{marginLeft:20,justifyContent:"center",alignItems:"center",flex:1}}>
                    <TouchableOpacity onPress={_GetUserOnline}>
                        <Text>Refresh</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{maxHeight:height/3}}>
                {
                    listUser.map((item,index)=>{
                        return<Text key={index}>
                            {item}
                        </Text>
                    })
                }
            </ScrollView>
            <Spinner
                visible={loading}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10
    }
})