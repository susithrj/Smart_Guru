import React from 'react';
import {
    View,
    ListView,
    ActivityIndicator,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ScrollView, AsyncStorage
} from 'react-native';
import CheckBoxGroup from '../elements/checkboxgroup'
import {CheckBox, Icon} from "react-native-elements";


export default class RandomQuiz extends React.Component {

    chapter_name = "";
    quizLevel = "";
    score = 0;

    static navigationOptions = {
        title: "Random Quiz",
    };
    //filtered_qs = [];
    user_answers = [];
    questions = [];
    radio_props = [];
    wrong_answers = [];
    qs_options = [];
    values1 = [];

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            value: -1,
            highest_row_id: 0,
            qsIndex: 0,
            answerStatus: "",
            selected: false,
            checked: [false, false, false, false, false],
            values: [],
            userID: ''

        }

    }


    componentDidMount() {

        const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/random`;

        (async () => {
            await this.setUserID();
        })();

        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                for (var i = 0; i < responseJson.length; i++) {
                    //adding questions to question array
                    this.questions.push({
                        qsId: responseJson[i].qs_id,
                        qsTopic: responseJson[i].qs_topic,
                        qsChapter: responseJson[i].qs_chapter,
                        question: responseJson[i].question,
                        options: [
                            responseJson[i].options.op1,
                            responseJson[i].options.op2,
                            responseJson[i].options.op3,
                            responseJson[i].options.op4,
                            responseJson[i].options.op5
                        ],
                        answer: responseJson[i].answers,
                        difficulty: responseJson[i].difficulty
                    });

                    console.log("questions length", this.questions.length);

                    this.user_answers.push({qsId: responseJson[i].qs_id, answer: ' '});
                    console.log("user answers length", this.user_answers.length);
                    //console.log("qs id", responseJson[i].qs_id);
                    //console.log("op1", responseJson[i].options.op1);
                    //console.log("op2", responseJson[i].options.op2);
                    //console.log("op3", responseJson[i].options.op3);
                    //console.log("op4", responseJson[i].options.op4);


                }
                this.setState({
                    isLoading: false,
                    //ques: questions,
                    //user_answers: user_answers,
                }, function () {

                    //user_answers = [];
                    //questions = [];


                    //console.log("state.ques[0].question", this.questions[0].question);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setUserID = async () => {

        const userID = await AsyncStorage.getItem('@userID');

        this.setState({
            userID: userID
        });
    };


    /*

    on_click = (value)=>{

        this.setState({
            value: value,
        });
        //console.log("qsId",qsId);
        //console.log("qsIndex",rowId);
        //console.log("option ",questions[rowId].options[value]);
        //var uAnswers = this.state.user_answers;
        this.user_answers.splice(this.state.qsIndex,0,{qsId: this.questions[this.state.qsIndex].qsId, answer: this.questions[this.state.qsIndex].options[value]});
        //this.setState({
        //user_answers:uAnswers,
        //});
        console.log("correct answer", this.questions[this.state.qsIndex].answer);
        console.log("user answer", this.questions[this.state.qsIndex].options[value]);
    };

     */

    arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    on_click2 = (values) => {

        console.log("values", values);


        this.values1 = values;
        //this.setState({values:values});
        var answers = [];
        for (var i = 0; i < values.length; i++) {
            answers.push(this.questions[this.state.qsIndex].options[values[i]])
        }
        this.user_answers[this.state.qsIndex] = {qsId: this.questions[this.state.qsIndex].qsId, answer: answers};
        //this.setState({
        //user_answers:uAnswers,
        //});
        console.log("correct answers", this.questions[this.state.qsIndex].answer);
        console.log("user answers", this.user_answers[this.state.qsIndex].answer);
    };

    send_to_server = () => {

        var json = {user_id: this.state.userID, chapter_scores: this.getChapterScores(),wrong_qs: this.wrong_answers, total_qs: this.questions.length, total_correct_qs:this.questions.length-this.wrong_answers.length};
        fetch(`http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/mixedquiz`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.toString());
            })
            .catch((err) => console.log(err));

        console.log("Json ", JSON.stringify(json))

    };

    check_answers = () => {

        //console.log("current index", this.state.qsIndex);
        if (this.arraysEqual(this.user_answers[this.state.qsIndex].answer, this.questions[this.state.qsIndex].answer)) {
            //if(this.user_answers[this.state.qsIndex].answer===this.questions[this.state.qsIndex].answer){
            this.score++;
            this.setState({answerStatus: "correct"});
            console.log("answer is correct")
        } else {
            this.wrong_answers.push({qsId: this.questions[this.state.qsIndex].qsId, qsChapter: this.questions[this.state.qsIndex].qsChapter, qsTopic: this.questions[this.state.qsIndex].qsTopic});
            this.setState({answerStatus: "wrong"});
            console.log("answer is wrong")
        }

        this.setState({
            qsIndex: this.state.qsIndex + 1,
            value: -1,
        });
    };

    fill_user_answer = (question, answers)=>{

        var starting_index = question.indexOf("_");     //getting starting index of underlined space

        if (starting_index!==-1){       //if '_' found in the question
            var qs_new = question.replace(/_/g, '');        //removing all '_' from the question
            var p1 = qs_new.slice(0, starting_index);
            var p2 = qs_new.slice(starting_index, qs_new.length);

            return (
                <View style={styles.qsDesc2}>
                    <Text>{p1}
                        <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>{answers.join(", ")}</Text>
                        {p2}</Text>
                </View>
            )
        }else {     //if '_' not found in the question
            return (
                <View style={styles.qsDesc2}>
                    <Text>{question}</Text>
                    <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>{answers.join(", ")}</Text>

                </View>
            )
        }


        //return p1 + answers.join(", ") + p2;


    };

    getTotalQuestions = (chapter)=>{
        var total =0;
        for (var i=0; i<this.questions.length;i++){
            if (this.questions[i].qsChapter===chapter){
                total++;
            }
        }
        return total;
    };

    getCorrectQuestionCount = (chapter) => {
        var wrong =0;
        for (var i=0; i<this.wrong_answers.length;i++){
            if (this.wrong_answers[i].qsChapter===chapter){
                wrong++;
            }
        }
        return this.getTotalQuestions(chapter)-wrong;
    };

    getChapterScores =()=>{
        var chapters = ["Introduction to Computers, Programs, and Java","Elementary Programming","Selections","Loops","Methods","Single-Dimensional Arrays","Objects and Classes", "Strings", "Thinking in Objects", "Inheritance and Polymorphism"]
        var chapter_scores = [];
        for (var i =0;i<chapters.length;i++){
            if (this.getTotalQuestions(chapters[i])!==0){
                chapter_scores.push({chapter:chapters[i], total_qs:this.getTotalQuestions(chapters[i]), correct_qs:this.getCorrectQuestionCount(chapters[i])})
            }
        }
        return chapter_scores;
    };


    display_question = () => {
        this.radio_props = [];
        this.qs_options = [];
        console.log("display_question");

        if (this.state.qsIndex < this.questions.length) {


            for (var i = 0; i <= 4; i++) {
                this.radio_props.push({
                    label: this.questions[this.state.qsIndex].options[i],
                    value: i,
                    isSelected: this.state.selected
                });
                this.qs_options.push(this.questions[this.state.qsIndex].options[i]);
            }
            return (


                <ScrollView>
                    <View style={styles.qsContainer}>


                        <Text style={styles.qsTopic}>{this.questions[this.state.qsIndex].qsTopic}</Text>
                        <View style={styles.hor}/>
                        <Text style={styles.qsNoLabel}>Question {this.state.qsIndex + 1}</Text>
                        <Text style={styles.qsDesc}>{this.questions[this.state.qsIndex].question}</Text>

                        <CheckBoxGroup
                            ref={component => this.checkGroup = component}
                            labels={this.qs_options}
                            uncheckAll={true}
                            onPress={(checked) => {
                                this.on_click2(checked);
                            }}
                        >

                        </CheckBoxGroup>

                        <TouchableOpacity
                            style={styles.SubmitButton}
                            onPress={() => {
                                this.check_answers();
                                this.display_question();
                                this.setState({
                                    checked: [false, false, false, false, false],
                                });
                                this.checkGroup.uncheckAll()
                            }


                            }
                        >
                            <Text style={styles.SubmitText}>{this.state.qsIndex < this.questions.length - 1 ? "Next" : "Submit"}</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

            );
        } else {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            let dataSource = ds.cloneWithRows(this.questions);
            this.send_to_server();
            return (
                <View style={styles.MainContainer}>
                    <ScrollView>
                        <View style={styles.qsContainer}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize:30, fontWeight:'bold'}}>Your Score</Text>
                                <View style={styles.hr}/>
                                <Text style={styles.scoreLabel}>{this.score}</Text>
                            </View>

                        </View>
                        <ListView

                            dataSource={dataSource}

                            renderSeparator={this.ListViewItemSeparator}

                            renderRow={(rowData, sectionID, rowID, higlightRow) => (

                                (


                                    <ScrollView>
                                        <View style={styles.qsContainer}>

                                            <Text style={styles.qsNoLabel}>Question {parseInt(rowID)+1}</Text>
                                            {this.fill_user_answer(rowData.question, this.user_answers[rowID].answer)}
                                            {this.arraysEqual(rowData.answer, this.user_answers[rowID].answer) ?
                                                <View style={{flex: 1, flexDirection: 'row', marginTop:10}}><Icon
                                                    name='check-circle'
                                                    type='font-awesome'
                                                    color='green'
                                                    size={28}/>
                                                    <Text style={{lineHeight: 22, fontWeight: 'bold'}}> Correct</Text>
                                                </View> :
                                                <View style={{flex: 1, flexDirection: 'row'}}>

                                                    <Icon
                                                        name='times-circle'
                                                        type='font-awesome'
                                                        color='#ff1c1c'
                                                        size={28}/><Text style={{lineHeight: 22, fontWeight: 'bold'}}> Wrong</Text></View>}


                                        </View>
                                    </ScrollView>

                                )
                            )
                            }

                        />
                    </ScrollView>


                </View>
            );
        }


    };

    display_score = () => {


    };

    /*
        get_filtered_qs = () => {
            //this.filtered_qs =[];
            for (var i = 0; i < this.questions.length; i++) {
                if (this.questions[i].difficulty === this.state.diff_level) {

                    this.filtered_qs.push(this.questions[i]);
                    this.user_answers.push({qsId: this.questions[i].qsId, answer: ' '});
                }
            }

            console.log("this.state.ques.length",this.questions.length);

            console.log("testing 1",this.filtered_qs.length);
            //return filtered_qs



        };


     */


    render() {


        //this.get_filtered_qs();

        console.log("questions.length ", this.questions.length);
        console.log("user_answers.length", this.user_answers.length);


        //const currentOptions = this.state.options


        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator style={{flex:1, justifyContent:'center'}}/>
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>

                {this.display_question()}

            </View>
        );


    }

}

const styles = StyleSheet.create({

    MainContainer: {

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#e7e9e4',
        //padding: 5,
    },

    qsNoLabel: {
        backgroundColor: '#ff0000',
        alignSelf: 'baseline',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        fontSize: 16,
        color: '#fff'
    },

    qsDesc: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 15
    },
    qsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 30,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 0,
        shadowOffset: {width: 12, height: 12,},
        margin: 10,
        elevation: 4,
        width: "100%",
    },
    SubmitButton: {
        backgroundColor: '#ff0000',
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
        borderRadius: 50,
        alignItems: 'center',

    },
    SubmitText: {
        fontSize: 18,
        color: '#fff'
    },
    qsTopic:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:5,
        color: '#8d8d8d'

    },
    scoreLabel:{
        fontSize:50,
        fontWeight:'bold',
        backgroundColor:'#3f3f3f',
        paddingHorizontal: 20,
        borderRadius:120,
        color: 'white',
        marginTop:20
    },
    hor:{
        height: 0.5,
        width: "100%",
        backgroundColor: "#777777",
        marginTop: 20,
        alignItems: 'stretch',
        marginBottom:30
    }

});