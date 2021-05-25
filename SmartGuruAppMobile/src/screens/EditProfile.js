import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView, TextInput, ActivityIndicator, TouchableHighlight, AsyncStorage, TouchableOpacity, Alert
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {Icon} from "react-native-elements";
//import Snackbar from 'react-native-snackbar';

export default class EditProfile extends React.Component {

    userID = '';
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'Edit',
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        const {navigate} = navigation;
                        navigate("UserProfile");

                    }}>
                    <View style={{flexDirection: 'row', marginLeft: 7}}>
                        <Icon
                            name='arrow-left'
                            type='feather'
                            color='#000'
                            size={25}/>
                    </View>

                </TouchableOpacity>
            ),
        };

    };


    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            username: '',
            email: '',
            newUsername: '',
            oldUsername: '',
            newEmail: '',
            password: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            serverResponse: '',
            savingChanges: false,
            visible: false,
        }
    }

    componentDidMount() {

        this.setState({oldUsername: this.state.userName});

        const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/edit/${this.userID}`;
        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("details", responseJson.toString());
                this.setState({
                    isLoading: false,
                    username: responseJson.username,
                    email: responseJson.email,
                    password: responseJson.password,

                }, function () {

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    displaySnckbar(msg) {
        return (
            <Snackbar
                visible={this.state.visible}
                onDismiss={() => this.setState({visible: false})}>{msg}</Snackbar>
        )
    }

    validatePassword() {
        if (this.state.oldPassword !== "" && this.state.newPassword !== "" && this.state.confirmNewPassword !== "") {
            if (this.state.oldPassword === this.state.password) {
                if (this.state.newPassword.replace(/[^0-9]/g, "").length >= 2 && this.state.newPassword.length >= 8) {
                    if (this.state.confirmNewPassword === this.state.newPassword) {
                        this.setState({password: this.state.newPassword});
                        this.updateProfile();
                    } else {
                        Alert.alert("Password Mismatch", "Please Re-Check your new password")
                    }
                } else {
                    Alert.alert("Invalid Password", "Password should contain at least 8 characters in including 2 digits at least")
                }
            } else {
                Alert.alert("Invalid Password", "Current Password is Incorrect")
            }
        } else if (this.state.oldPassword === "" && this.state.newPassword === "" && this.state.confirmNewPassword === "") {
            this.updateProfile();
        } else {
            Alert.alert("Incomplete Request", "Please Fill all the details under security info to change password or click on clear button to ")
        }

    }

    clearSecurityInfo() {
        this.setState({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        })
    }

    validateChanges() {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.username.length >= 8) {
            if (this.state.email.match(mailformat)) {
                this.validatePassword();
            } else {
                Alert.alert("Invalid Email", "Email you entered is invalid. Please enter a valid email")
            }
        } else {
            Alert.alert("Invalid Username", "Username must contain at least 8 characters")
        }
    }

    updateProfile = () => {

        var json = {username: this.state.username, email: this.state.email, password: this.state.password};


        this.setState({
            savingChanges: true,
        });


        fetch(`http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/edit/${this.userID}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === "user exist") {
                    Alert.alert("User Exist", "Username or email you are trying to use is connected with another account")
                } else if (responseJson.status === "saved") {

                    this.setState({
                        visible: true
                    });
                    (async () => {
                        await AsyncStorage.setItem('@username', this.state.username);
                    })();
                    this.props.navigation.state.params.onNavigateBack(this.state.username);
                }
                this.setState({
                    savingChanges: false,
                })
            })
            .catch((err) => console.log(err));

        console.log("user details", JSON.stringify(json))
    };

    onSavePress() {
        this.validateChanges();


    };

    render() {
        var {params} = this.props.navigation.state;
        this.userID = params.userID;
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={styles.titleBg}>
                    <Text style={styles.titleText}>Personal Info</Text>
                    <Icon
                        name='angle-down'
                        type='font-awesome'
                        color='#b4b4b4'
                        size={23}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name='user'
                        type='font-awesome'
                        color='#b4b4b4'
                        size={25}/>
                    <TextInput style={styles.inputs}
                               value={this.state.username}
                               placeholder="Username"
                               underlineColorAndroid='transparent'
                               onChangeText={(username) => this.setState({username})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name='envelope'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={22}/>
                    <TextInput style={styles.inputs}
                               value={this.state.email}
                               placeholder="Email"
                               keyboardType="email-address"
                               underlineColorAndroid='transparent'
                               onChangeText={(email) => this.setState({email})}/>
                </View>

                <View style={styles.titleBg}>
                    <Text style={styles.titleText}>Security Info</Text>
                    <Icon
                        name='angle-down'
                        type='font-awesome'
                        color='#b4b4b4'
                        size={23}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name='lock'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={26}/>
                    <TextInput style={styles.inputs}
                               placeholder="Old Password"
                               value={this.state.oldPassword}
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(oldPassword) => this.setState({oldPassword})}/>
                </View>

                <View style={styles.inputContainer}>
                    <Icon
                        name='lock'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={26}/>
                    <TextInput style={styles.inputs}
                               value={this.state.newPassword}
                               placeholder="New Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(newPassword) => this.setState({newPassword})}/>

                </View>
                <View style={styles.inputContainer}>
                    <Icon
                        name='lock'
                        type='font-awesome'
                        color="#b4b4b4"
                        size={26}/>
                    <TextInput style={styles.inputs}
                               value={this.state.confirmNewPassword}
                               placeholder="Confirm New Password"
                               secureTextEntry={true}
                               underlineColorAndroid='transparent'
                               onChangeText={(confirmNewPassword) => this.setState({confirmNewPassword})}/>

                </View>

                <TouchableHighlight onPress={() => this.clearSecurityInfo()}>
                    <Text style={{fontSize: 14, color: '#071d92', fontWeight: 'bold'}}>Clear Security Info</Text>
                </TouchableHighlight>

                {
                    //show loading indicator while saving
                    this.state.savingChanges ? <ActivityIndicator/> : null
                }

                <View style={{flex: 1}}/>

                <TouchableHighlight style={[styles.buttonContainer, styles.saveButton]}
                                    onPress={() => this.onSavePress()}>
                    <Text style={[styles.saveText, {fontSize: 16}]}>Save Changes</Text>
                </TouchableHighlight>


                {
                    //Display that changes saved successfully
                    this.state.visible ? this.displaySnckbar("Changes Saved") : null
                }


            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    inputContainer: {
        borderColor: '#cacaca',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 1,
        width: 350,
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
        fontSize: 16
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 7,
        alignItems: 'center',
        width: 250,
        borderRadius: 30,
    },
    saveButton: {
        paddingVertical: 12,
        backgroundColor: "#ff0000",
        marginBottom: 10
    },
    saveText: {
        color: 'white',
    },
    titleBg: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        paddingHorizontal: 35,
        marginBottom: 20,
        backgroundColor: '#494949',
        paddingVertical: 10,
        width: '100%'

    },
    titleText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10

    }
});
