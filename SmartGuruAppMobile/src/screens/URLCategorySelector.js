import React from 'react';
import {View, StyleSheet, Dimensions, WebView, Text, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';


export default class URLCategorySelector extends React.Component {

    static navigationOptions = {
        title: 'Recommended For You',
    };

    showAlert = (msg)=>{
        Alert.alert("Info",msg)
    };
    render() {
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => navigate("RecommendedVideo")}>
                    <Text style={styles.ButtonText}>Youtube Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => navigate("StackLinks")}>
                    <Text style={styles.ButtonText}>Stack Overflow Answers</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    Button: {
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingVertical: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
        borderRadius: 50,
        alignItems: 'center',
        marginHorizontal: 20
    },
    ButtonText: {
        fontSize:16,
        color: '#fff',
        fontWeight: 'bold'
    }
});
