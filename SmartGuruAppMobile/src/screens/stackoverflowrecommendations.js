import React from 'react';
import {
    View,
    StyleSheet,
    WebView,
    Text,
    ActivityIndicator,
    Linking, AsyncStorage, FlatList

} from 'react-native';


export default class StackOverFlowRecommendations extends React.Component {


    links = [];

    static navigationOptions = {
        title: 'Recommended',
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

            const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/stackoverflowlinks/${this.state.userID}`;

            return fetch(URL)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.links = responseJson;
                    console.log("links", responseJson.toString());
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

    displayLinks = () => {
        return this.links.map((link, index) => {

            return (
                <View key={index}>
                    <Text style={styles.linkStyle} onPress={() => Linking.openURL(link)}>{link}</Text>
                </View>

            )
        })
    };


    render() {


        return (
            <View style={styles.MainContainer}>
                {this.state.isLoading ? <ActivityIndicator style={{flex: 1,justifyContent: 'center'}}/> :
                    this.links==null?<Text style={{flex:1, justifyContent: 'center'}}>No Recommendations</Text>:this.displayLinks()}
            </View>
        );
    }

}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
    },
    linkStyle: {
        color: '#003568',
        marginTop: 20,
        paddingHorizontal: 20,
        fontSize:16,
        fontWeight: 'bold'
    }
});
