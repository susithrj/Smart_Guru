import React from 'react';
import {View, StyleSheet, Dimensions, WebView, Text, Button, TouchableOpacity, FlatList, Image} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Quiz from "./lessonbasedquiz";


export default class Lessons extends React.Component {

    static navigationOptions = {
        //header: null ,
        title: "Lessons"
    };
    dataSource = ["Introduction to Computers, Programs, and Java","Elementary Programming","Selections","Loops","Methods","Single-Dimensional Arrays","Objects and Classes", "Strings", "Thinking in Objects", "Inheritance and Polymorphism"];

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <FlatList
                    data={this.dataSource}
                    renderItem={({ item }) => (
                        <View style={styles.CardView}>
                            <Text style={{fontSize: 17, padding: 20, color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>{item}</Text>
                            <View style={{flex:1}}/>
                            <View style={{justifyContent:'space-between'}}>
                            <TouchableOpacity
                                style={styles.easyButton}
                                onPress={() => navigate("LessonBasedQuiz", {chapter: item, level: "easy"})}
                            >
                                <Text style={styles.buttonText}>Easy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.interButton}
                                onPress={() => navigate("LessonBasedQuiz", {chapter: item, level: "intermediate"})}>
                                <Text style={styles.buttonText}>Intermediate</Text>
                            </TouchableOpacity>
                        </View>

                        </View>
                    )}
                    //Setting the number of column
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                />


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
    video: {
        width: Dimensions.get('window').width,
        aspectRatio: 16 / 9,
        padding: 10,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {width: 12, height: 12,},
        elevation: 4


    },
    CardView: {
        width: "45%",
        backgroundColor: '#404040',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 0,
        shadowOffset: {width: 12, height: 12,},
        margin: 10,
        elevation: 4,

    },
    interButton:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor:'#990025',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    easyButton:{
        //borderTopRightRadius: 10,
        //borderTopLeftRadius: 10,
        backgroundColor:'#c10030',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1
    },
    buttonText: {
        fontSize: 16,
        color: '#fff'
    }
});
