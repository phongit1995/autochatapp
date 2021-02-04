/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import Main from './src/screens'
import Toast from 'react-native-toast-message';


const App = () => {
  return (
    <>
    <StatusBar barStyle={"dark-content"}    backgroundColor="transparent"></StatusBar>

    <Main></Main>
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};



export default App;
