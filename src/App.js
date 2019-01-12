import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const base64Img = require('base64-img');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.sendAPIRequest = (imageURI) => {
      const image64 = base64Img.base64Sync(imageURI);

      client
        .labelDetection('./resources/wakeupcat.jpg')
        .then(results => {
          const labels = results[0].labelAnnotations;
 
          console.log('Labels:');
          labels.forEach(label => console.log(label.description));

          //handle displaying labels.
      })
      .catch(err => {
        console.error('ERROR:', err);
        //handle error here
      });
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
