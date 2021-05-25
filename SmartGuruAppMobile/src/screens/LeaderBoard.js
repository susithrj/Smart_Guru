import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Alert,
    FlatList,
    Image,
    ScrollView
} from 'react-native';


export default class LeaderBoard extends React.Component {

    ranks = [];
    static navigationOptions = {
        title: 'Leaderboard',
    };

    showAlert = (msg)=>{
        Alert.alert("Info",msg)
    };

    componentDidMount() {

        const URL = `http://smartguru-env.mfrzh7c8xs.us-east-1.elasticbeanstalk.com/leaderboardlist`;
        return fetch(URL)
            .then((response) => response.json())
            .then((responseJson) => {
                this.ranks = responseJson;
                //console.log("links", responseJson.toString());
                this.setState({
                    isLoading: false,
                }, function () {

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <ScrollView>
                    <Image
                        source={{uri:'https://getthematic.com/wp-content/uploads/2019/01/shutterstock_1112175710.jpg'}}
                    style={{width:'100%',height: 220}}/>
                    <View style={[styles.detailRow, {paddingVertical:-15, backgroundColor:'#f4f4f4'}]}>
                        <Text style={[styles.rowCell, {width:'14%', fontWeight:'bold'}]}>Rank</Text>
                        <Text style={[styles.rowCell, {width:'67%',fontWeight:'bold'}]}>Username</Text>
                        <Text style={[styles.rowCell, {width:'14%', fontWeight:'bold'}]}>Score</Text>
                    </View>
                    <FlatList
                        data={this.ranks}
                        renderItem={({ item, index }) => (
                            <View style={styles.detailRow}>
                                <Text style={[styles.rowCell, {width:'10%'}]}>{parseInt(index)+1}</Text>
                                <Text style={[styles.rowCell, {width:'75%',borderLeftWidth:1, borderRightWidth:1, borderLeftColor:'#f3f3f3', borderRightColor:'#f3f3f3'}]}>{item[1]}</Text>
                                <Text style={[styles.rowCell, {width:'10%'}]}>{item[0]}</Text>
                            </View>
                        )}

                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>

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
    rowCell: {
        //paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        textAlign: 'center'
    },
    detailRow: {
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical:15,
        shadowColor: '#000000',
        shadowRadius: 10,
        shadowOpacity: 0,
        shadowOffset: {width: 12, height: 12,},
        margin: 5,
        elevation: 4,
        flexDirection: 'row'
    }
});
