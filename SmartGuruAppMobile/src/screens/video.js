import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  WebView,
  Linking,
  TouchableOpacity,
  FlatList,
  ActivityIndicator, AsyncStorage, Text
} from 'react-native';

class YouTube extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      source:'',
    }
  }

  render() {

    //let url = {uri: "https://www.youtube.com/embed/"+this.state.id};

    return (
        <View>
          <View style={styles.video}>
          <WebView
              source={{uri: this.props.url}}
              style={{borderRadius:100}}
          />
        </View>
          <TouchableOpacity
              style={[styles.video,{position: 'absolute', top:0}]}
              onPress={() => Linking.openURL(this.props.url)}>
          </TouchableOpacity>

        </View>

    );
  }
}

export default class RecommendedVideo extends React.Component {

  urls = [];

  static navigationOptions = {
    title: "Recommended"
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userID: ''
    }
  }

  componentDidMount() {

    (async () => {
      await this.setUserID();

      const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/youtubelinks/${this.state.userID}`;

      return fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {
            this.urls = responseJson;
            //console.log("links", responseJson.toString());
            this.setState({
              isLoading: false,
            }, function () {

            });
          })
          .catch((error) => {
            console.error(error);
          });
    })();


  }

  setUserID = async () => {

    const userID = await AsyncStorage.getItem('@userID');

    this.setState({
      userID: userID
    });
  };

  render() {

    return (

          <View style={styles.container}>

            {this.state.isLoading?<ActivityIndicator style={{flex:1, justifyContent: 'center'}}/>:
                this.urls==null?<Text style={{flex:1, justifyContent: 'center'}}>No Recommendations</Text>:<FlatList
                data={this.urls}
                renderItem={({ item }) => (
                    <View style={{alignItems: 'center'}}>
                      <YouTube url={item}/>
                    </View>
                )}

                keyExtractor={(item, index) => index.toString()}
            />}

          </View>




    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex :1,
    backgroundColor: '#fff',

  },
  video:{
    width:Dimensions.get('window').width,
    aspectRatio:16/9,
    padding:10,
    shadowColor: '#000000',
    shadowRadius: 10,
    shadowOpacity:1,
    shadowOffset: { width: 12, height: 12, },
    elevation:4


  }
});