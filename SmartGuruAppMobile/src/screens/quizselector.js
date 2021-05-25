import React from 'react';
import {View, StyleSheet, Dimensions, WebView, Text, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';


export default class QuizSelector extends React.Component {

    static navigationOptions = {
        title: 'Quizzes',
    };

    showAlert = (msg)=>{
        Alert.alert("Info",msg)
    };
    render() {
        const {navigate} = this.props.navigation;
        return(
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate("Lessons")}
                >
                    <ImageBackground source={{uri:'https://www.washingtonpost.com/graphics/entertainment/2016-best-books/img/best-books-2016-promo.jpg'}} style={{width: '100%', height: '100%', borderRadius:10}}>
                        <View style={{flex:1}}/>
                        <View style={{backgroundColor: '#000', opacity:0.6, height:70, justifyContent:'space-between'}}>

                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'space-between', position:'absolute', bottom:15, marginHorizontal: 20}}>
                            <Icon
                                name='book'
                                type='feather'
                                color='white'
                                size={28}/>
                            <Text style={styles.buttonText}>Lesson Based Quiz</Text>
                            <View style={{flex:1}}/>

                                <Icon
                                    name='arrow-right-circle'
                                    type='feather'
                                    color='white'
                                    size={28}/>


                        </View>


                    </ImageBackground>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate("RandomQuiz")}
                >
                    <ImageBackground
                        source={{uri:'https://marketplace.canva.com/MADGx2K7GWc/4/thumbnail_large/canva-pile-of-white-dices-on-white-surface-MADGx2K7GWc.jpg'}} style={{width: '100%', height: '100%', borderRadius:10}}>
                        <View style={{flex:1}}/>
                        <View style={{backgroundColor: '#000', opacity:0.6, height:70, justifyContent:'space-between'}}>

                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'space-between', position:'absolute', bottom:15, marginHorizontal: 20}}>
                            <Icon
                                name='package'
                                type='feather'
                                color='white'
                                size={28}/>
                            <Text style={styles.buttonText}>Random Quiz</Text>
                            <View style={{flex:1}}/>

                            <Icon
                                name='arrow-right-circle'
                                type='feather'
                                color='white'
                                size={28}/>


                        </View>


                    </ImageBackground>

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigate("RecommendedQuiz")}
                >
                    <ImageBackground source={{uri:'https://neilpatel.com/wp-content/uploads/2017/08/personalize.jpg'}} style={{width: '100%', height: '100%', borderRadius:10}}>
                        <View style={{flex:1}}/>
                        <View style={{backgroundColor: '#000', opacity:0.6, height:70, justifyContent:'space-between'}}>

                        </View>
                        <View style={{flexDirection: 'row',justifyContent:'space-between', position:'absolute', bottom:15, marginHorizontal: 20}}>
                            <Icon
                                name='thumbs-up'
                                type='feather'
                                color='white'
                                size={28}/>
                            <Text style={styles.buttonText}>Recommended Quiz</Text>
                            <View style={{flex:1}}/>

                            <Icon
                                name='arrow-right-circle'
                                type='feather'
                                color='white'
                                size={28}/>


                        </View>


                    </ImageBackground>

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
    button:{
        borderRadius: 10,
        alignItems: 'center',
        height: '32%',
        marginTop: 7,
        marginHorizontal: 10
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 7
    }
});
