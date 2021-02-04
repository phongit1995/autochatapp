import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoginServer } from './../../api/handler';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';
const {width} = Dimensions.get("window");
export default function Login(){
    const [username,setUsername] = useState<string>('timemdam7');
    const [password,setPassword]=useState<string>('phongvip');
    const [loading,setLoading] =useState<boolean>(false);
    const navigation =useNavigation();
    useEffect(()=>{
        const checkLogin=async()=>{
            let cookie:string = await AsyncStorage.getItem('@cookie');
            if(cookie){
                navigation.navigate("HOME");
            }
        }
        checkLogin();
    },[])
    const _OnLogin=()=>{
        setLoading(true);
        LoginServer(username,password).then( async result=>{
            setLoading(false);
            Toast.show({
                type:"success",
                text1:"Đăng Nhập Thành Công",
                visibilityTime: 4000,
                autoHide: true,
            })
            await AsyncStorage.setItem('@cookie', result.data.cookie);
            navigation.navigate("HOME");
        }).catch(error=>{
            Toast.show({
                type:"error",
                text1:"Tên Tài Khoản Hoặc Mật Khẩu Không Đúng",
                visibilityTime: 4000,
                autoHide: true,
            })
            setLoading(false);
        })
    }
    return (
        <View style={styles.container}>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <TextInput 
                     style={styles.InputText}
                     placeholder="Nhập Tên Tài Khoản"
                    onChangeText={(e)=>setUsername(e)}
                    
                /> 
                <TextInput 
                     style={styles.InputText}
                     placeholder="Nhập Mật Khẩu"
                    onChangeText={(e)=>setPassword(e)}
                    
                />
                <TouchableOpacity onPress={_OnLogin} style={styles.loginButton}>
                    <Text>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
            <Spinner
                visible={loading}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    InputText:{
        height:40,
        borderColor: 'gray', 
        borderWidth: 1 ,
        width:width*(3/4),
        borderRadius:10,
        paddingHorizontal:10,
        marginBottom:20
    },
    loginButton:{
        padding:10
    }
})