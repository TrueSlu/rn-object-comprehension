import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const base64Img = require('base64-img');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }

    this.sendAPIRequest = () => {

    }

    this.handleAnnotations = () => {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
