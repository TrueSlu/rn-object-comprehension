import React from 'react';
import { Text, View, TouchableOpacity, Button, ActivityIndicator, Alert } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

//import vision from "react-native-cloud-vision-api";
//vision.init({ auth: 'YOUR_API_KEY'});

export default class App extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
      };

      this.takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync();

          this.setState({ loading: true });
          FileSystem.readAsStringAsync(photo.uri, { encoding: FileSystem.EncodingTypes.Base64 })
            .then((base64string) => {
              return fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBLgu6rQG5Iy-uxhz7yWfZ_XjorfhPZn1s', {
                method: 'POST',
                body: JSON.stringify({
                  "requests": [
                    {
                      "image": {
                        "content": base64string,
                      },
                      "features": [
                        {
                          "type": "LABEL_DETECTION",
                          "maxResults": 3,
                        }
                      ]
                    }
                  ]
                })
              })
              .then((response) => response.json())
              .then((responseJSON) => {
                console.log(responseJSON);
                var confidence, confidence2, confidence3;
                try { 
                  confidence = responseJSON.responses[0].labelAnnotations[0].score * 100;
                  confidence2 = responseJSON.responses[0].labelAnnotations[1].score * 100;
                  confidence3 = responseJSON.responses[0].labelAnnotations[2].score * 100;
                } catch {
                  console.log("Not enough responses");
                }

                var results = responseJSON.responses[0].labelAnnotations;
                console.log(results);
                this.setState({ loading: false });
                if (results.length === 0) {
                  Alert.alert(
                    "Error",
                    "No results found.",
                    [
                      {text: "OK", onPress: () => console.log("Cancel pressed"), style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
                } else if (results.length === 1) {
                  Alert.alert(
                    "Results: ",
                    results[0].description.charAt(0).toUpperCase() + results[0].description.slice(1) + ': ' + confidence.toString() +  "%\n",
                    [
                      {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
                } else if (results.length === 2) {
                  Alert.alert(
                    "Results: ",
                    results[0].description.charAt(0).toUpperCase() + results[0].description.slice(1) + ": " + confidence.toString() + "%\n" + 
                    results[1].description.charAt(0).toUpperCase() + results[1].description.slice(1) + ": " + confidence2.toString() + "%\n",
                    [
                      {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
                } else {
                  Alert.alert(
                    "Results: ",
                    results[0].description.charAt(0).toUpperCase() + results[0].description.slice(1) + ": " + confidence.toString() + "%\n" + 
                    results[1].description.charAt(0).toUpperCase() + results[1].description.slice(1) + ": " + confidence2.toString() + "%\n" +
                    results[2].description.charAt(0).toUpperCase() + results[2].description.slice(1) + ": " + confidence3.toString() + "%",
                    [
                      {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
                }
              })
            .catch((err) => {
              console.log(err);
            })
        });
      }
    }
}
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {

      if (this.state.loading) {
        return (
          <View style={{ justifyContent: 'center', flex: 1, alignItem: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" style={{ justifyContent: 'center', alignSelf: 'center',  }}/>
          </View>
        )
      }
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
              </TouchableOpacity>
            </View>
            <View style = {{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 50
                }}>
                <Button
                   title="Scan Item" 
                   onPress={this.takePicture}/>
                </View>
          </Camera>
        </View>
      );
    }
  }
} 