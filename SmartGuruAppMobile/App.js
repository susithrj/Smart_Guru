import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Image, TextInput, Alert} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Video from './src/screens/video';
import Lessons from './src/screens/lessons';
import LessonBasedQuiz from "./src/screens/lessonbasedquiz";
import UserProfile from "./src/screens/userprofile";
import Login from "./src/screens/login";
import Register from "./src/screens/signup";
import LeaderBoard from "./src/screens/LeaderBoard";
import StackLinks from "./src/screens/stackoverflowrecommendations";
import RecommendedQuiz from "./src/screens/recommendedquiz"
import AdminScreen from "./src/screens/adminscreen"
import DisplayUsers from "./src/screens/displayusers"
import RandomQuiz from "./src/screens/randomquiz"
import URLCategorySelector from "./src/screens/URLCategorySelector"
import EditProfile from "./src/screens/EditProfile"
import QuizSelector from "./src/screens/quizselector"
import {Icon} from "react-native-elements";



const QuizzesStack = createStackNavigator({
    QuizSelector: {
        screen: QuizSelector
    },
    Lessons: {
        screen: Lessons
    },
    LessonBasedQuiz: {
        screen: LessonBasedQuiz
    },
    RecommendedQuiz: {
        screen: RecommendedQuiz
    },
    RandomQuiz: {
        screen: RandomQuiz
    }

});

const RecommendedLinkStack = createStackNavigator({

    URLCategorySelector: {
        screen: URLCategorySelector
    },
    RecommendedVideo:{
        screen: Video
    },
    StackLinks: {
        screen:StackLinks
    }
});

const ProfileStack = createStackNavigator({
    UserProfile: {
        screen: UserProfile
    },
    EditProfile: {
        screen:EditProfile
    },
});
const LeaderBoardStack = createStackNavigator({
    LeaderBoard: {
        screen: LeaderBoard
    }
});
const AdminStack = createStackNavigator({
    AdminScreen: {
        screen: AdminScreen,
        navigationOptions: () => ({
            //header: null,
            headerLeft: null
        }),
    },
    DisplayUsers: {
        screen: DisplayUsers,
        navigationOptions: () => ({
            //header: null,
            //headerLeft: null
        }),
    }
});
const BottomStack = createMaterialBottomTabNavigator(
    {
        Quizzes: {
            screen: QuizzesStack,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name='book-open'
                        type='feather'
                        color={tintColor}
                        size={25}/>
                ),
                title: 'Quizzes'
            }
        },
        RecommendedURLs: {
            screen: RecommendedLinkStack,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name='youtube'
                        type='feather'
                        color={tintColor}
                        size={25}/>
                )
            }
        },
        LeaderBoard: {
            screen: LeaderBoardStack,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name='bar-chart-2'
                        type='feather'
                        color={tintColor}
                        size={24}/>
                )
            }
        },
        UserProfile: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name='user-o'
                        type='font-awesome'
                        color={tintColor}
                        size={25}/>
                )
            }
        },

    },
    {
        initialRouteName: "Quizzes",
        activeColor: '#f61e44',
        inactiveColor: '#626061',
        barStyle: {backgroundColor: "#ffffff"},
        labeled: false
    }
);

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: () => ({
            header: null,
            //headerLeft: null
        }),
    },
    AdminScreen:{
        screen:AdminStack,
        navigationOptions: () => ({
            header: null,
            //headerLeft: null
        }),
    },
    Register: {
        screen: Register,
        navigationOptions: () => ({
            header: null,
            //headerLeft: null
        }),
    },
    HomeScreen: {
        screen: BottomStack,
        navigationOptions: () => ({
            header: null,
            //headerLeft: null
        }),
    }
}, {initialRouteName: 'Login'});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }

});