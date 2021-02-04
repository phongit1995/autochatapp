import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login/login';
import Main from './main/main';
const Stack = createStackNavigator();
export default function():JSX.Element{
    return (
        <>
            <NavigationContainer >
                <Stack.Navigator initialRouteName="LOGIN" screenOptions={{headerShown:false}}>
                    <Stack.Screen name="LOGIN" component={Login}/>
                    <Stack.Screen name="HOME" component={Main}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}