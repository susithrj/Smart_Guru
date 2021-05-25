import React from 'react';
import {
    View,
    StyleSheet,
    WebView,
    Text,

} from 'react-native';


export default class Test extends React.Component {


    static navigationOptions = {
        title: 'Forum',
    };


    render() {


        return (
            <View style={styles.MainContainer}>
                <Text>Forum Page</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
