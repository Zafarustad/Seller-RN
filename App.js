import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/Routes/Routes';
import store from './src/Redux/Reducers/store';
import FlashMessage from 'react-native-flash-message';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor="#08121C" />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
        <FlashMessage position="top" />
      </Provider>
    );
  }
}

export default App;
