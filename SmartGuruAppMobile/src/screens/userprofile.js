import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    WebView,
    Text,
    Image,
    Button,
    ActivityIndicator, TouchableOpacity,
    AsyncStorage,

} from 'react-native';
import {PieChart} from 'react-native-svg-charts'
import {Icon} from "react-native-elements";

export default class UserProfile extends React.Component {

    keys = [];
    values = [];
    colors = [];

    static navigationOptions = ({navigation})=>{
        return {
            headerTitle: 'Profile',
            headerRight: (
                <TouchableOpacity
                    onPress={()=>{
                        (async () => {
                            try {
                                await AsyncStorage.clear()
                            } catch(e) {
                                // clear error
                            }
                        })();

                        const {navigate} = navigation;
                        navigate("Login");
                    }}>
                    <View style={{flexDirection: 'row', marginRight:20}}>
                        <Icon
                            name='log-out'
                            type='feather'
                            color='#000'
                            size={25}/>
                        <Text style={{fontWeight: 'bold', marginLeft:10, fontSize:16}}>Logout</Text>
                    </View>

                </TouchableOpacity>
            ),
        };

    };

    constructor(props) {
        super(props);
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            labelWidth: 0,
            isLoading:true,
            username:'',
            userID:'',
        }
    }

    componentDidMount() {

        (async () => {
            await this.retrieveData();
            await this.fetchData();
        })();


        //console.log("user id ",this.state.userID);

    }

    retrieveData = async()=>{
        const uName = await AsyncStorage.getItem('@username');
        console.log("user profile",uName);
        const uID = await AsyncStorage.getItem('@userID');
        console.log("user ID ",uID);

        //value = JSON.parse(value);
        //if (uName !== null) {
        this.setState({
            username:uName,
            userID:uID
        });
    };
    setUsername = (uName) =>{
      this.setState({username:uName})
    };
    onCreate(){
        (async () => {

            await this.fetchData();
        })();
    }



    fetchData = ()=>{
        const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/performance/${this.state.userID}`;
        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

                for (var i = 0; i < responseJson.scores.length; i++) {
                    //adding questions to question array
                    this.keys.push(responseJson.scores[i].chapter);
                    this.values.push(responseJson.scores[i].chapterScore);

                    console.log("chapter",responseJson.scores[i].chapter);
                    console.log("score",responseJson.scores[i].chapterScore)

                }

                this.setState({
                    isLoading:false,
                    selectedSlice: {label: this.keys[0],value: this.values[0]},
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    showIndications = (array) => {
        return array.map((key, index) => {
            return (
                <View style={styles.indicationRow} key={index}>
                    <Icon
                        name='square'
                        type='font-awesome'
                        color={this.colors[index]}
                        size={20}/>
                    <Text style={{marginLeft: 5, marginRight: 5, width:120, fontSize: 12}}>{key}</Text>
                </View>
            )
        })
    };

    render() {
        const {labelWidth, selectedSlice} = this.state;
        const {label, value} = selectedSlice;
        const {navigate} = this.props.navigation;





        //this.keys = ['Introduction', 'Loops', 'Selections', 'Methods', 'Arrays'];
        //this.values = [80, 10, 40, 50, 30];
        this.colors = ['#4466c6', '#e93850', '#f8a105', '#8cc63f', '#169d93', '#671e46', '#8fc1ed', '#5a403a', '#d34380', '#5f5535'];

        const data = this.keys.map((key, index) => {
            return {
                key,
                value: this.values[index],
                svg: {fill: this.colors[index]},
                arc: {padAngle: label === key ? 0.1 : 0},

                onPress: () => {
                    this.setState({ selectedSlice: { label: key, value: this.values[index] } })
                },


            }
        });

        const deviceWidth = Dimensions.get('window').width;

        return (


            <View style={styles.MainContainer}>
                <View style={styles.DetailContainer}>
                    <Image
                        style={styles.ProfileImage}
                        source={{uri: 'https://banner2.kisspng.com/20180523/tha/kisspng-businessperson-computer-icons-avatar-clip-art-lattice-5b0508dc6a3a10.0013931115270566044351.jpg'}}
                    />
                    <View style={{marginLeft: 30, justifyContent: 'center', alignItems:'center'}}>
                        <Text style={styles.ProfileName}>{this.state.username}</Text>
                        <TouchableOpacity
                            style={styles.buttonOutline}
                            onPress={() => {navigate("EditProfile",{userID:this.state.userID, onNavigateBack: this.setUsername});}}>
                            <Text>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>



                </View>
                <View style={styles.CardView}>
                    <Text style={styles.title}>Skills</Text>

                    <View style={styles.HorizontalLine}/>
                    {this.state.isLoading?<ActivityIndicator style={{marginTop:20}}/>:<View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{height: 250, width:250, alignItems: 'center'}}>
                            <PieChart
                                style={{height: 250, width:250}}
                                outerRadius={'80%'}
                                innerRadius={'45%'}
                                data={data}
                            />
                            {this.keys.length===0?
                                <Text style={{position: 'absolute', top: '45%', fontSize:16, color:'#7d7d7d', justifyContent: 'center', alignItems: 'center', alignSelf:'center'}}>No data to show</Text>:
                                <Text style={{position: 'absolute', top: '45%', fontSize:20, bottom: 0, justifyContent: 'center', alignItems: 'center', alignSelf:'center', fontWeight:'bold'}}>
                                    {`${value}`}%
                                </Text>}

                        </View>


                        <View style={{marginLeft: 10, marginRight: 10, marginTop:25}}>
                            {this.showIndications(this.keys)}
                        </View>
                    </View>}

                </View>
            </View>


        );
    }

}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        alignItems: 'center'
        //padding: 5,
    },
    ProfileImage: {
        width: 120,
        height: 120,
        marginTop: 10,
        borderRadius: 100,

    },
    ProfileName: {
        fontSize: 18,
        marginTop: 5,
        fontWeight:'bold'

    },
    DetailContainer: {
        alignItems: 'center',
        backgroundColor: '#d5d5d5',
        paddingHorizontal: 10,
        paddingVertical: 30,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    CardView: {
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 30,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 0,
        shadowOffset: {width: 12, height: 12,},
        margin: 10,
        elevation: 4
    },
    HorizontalLine: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#c9c9c9",
        marginTop: 5,
        alignItems: 'stretch'
    },
    container: {
        flex: 1,
    },
    chart: {
        //flex: 1
    },
    indicationRow: {
        flexDirection: 'row'
    },
    title: {
        fontSize :20,
        fontWeight: 'bold'
    },
    buttonOutline:{
        borderRadius:20,
        borderWidth:1,
        borderColor:'#a5a5a5',
        paddingVertical: 7,
        paddingHorizontal: 15,
        //alignSelf:'baseline',
        marginTop:7
    }
});
