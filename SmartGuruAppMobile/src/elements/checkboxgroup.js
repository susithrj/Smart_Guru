import React from 'react';
import {View, StyleSheet, Dimensions, WebView, Text, TouchableOpacity} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';


export default class CheckBoxGroup extends React.Component {

    checked = [false, false, false, false, false];
    values = [];

    constructor(props) {
        super(props);
        this.state = {

            checked: [false, false, false, false, false],
            values: []
        };
        //updateState = updateState.bind(this)
    }

    uncheckAll = () => {
        this.setState({
            checked: [false, false, false, false, false],
        })
        this.checked = [false, false, false, false, false];
        this.values = [];
    };
    get_values = () => {

        var values = [];
        for (var i = 0; i < this.checked.length; i++) {
            if (this.checked[i] === true) {
                values.push(i);
            }
        }
        this.values = values;
    };

    uncheck_all = () => {
        this.setState({checked: [false, false, false, false, false]});
    };

    changeState() {
        this.setState({
            checked: [false, false, false, false, false]
        })
    }

    render() {
        //if (this.props.uncheckAll===true){
        //this.setState({checked: [false, false, false, false, false]});
        //console.log("check box component", this.state.checked)
        //}
        //this.changeState();

        return (


            <View>


                <TouchableOpacity onPress={this.props.onPress(this.values)}>

                    {this.props.labels[0] !== "" ?<CheckBox
                        title={this.props.labels[0]}
                        textStyle={{fontWeight: 'normal'}}
                        checked={this.state.checked[0]}
                        checkedColor='#FF0000'
                        uncheckedColor='#FF0000'
                        containerStyle = {{borderColor: '#fff'}}
                        checkedIcon={<Icon
                            name='check-square'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        uncheckedIcon={<Icon
                            name='square-o'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        onPress={() => {
                            this.checked[0] = !this.state.checked[0];
                            //console.log("this.checked", this.checked);
                            this.setState({checked: this.checked});
                            //console.log("this.state.checked", this.state.checked);
                            this.get_values();
                        }}
                    />:null}

                    {this.props.labels[1] !== "" ?<CheckBox
                        title={this.props.labels[1]}
                        textStyle={{fontWeight: 'normal'}}
                        checked={this.state.checked[1]}
                        checkedColor='#FF0000'
                        uncheckedColor='#FF0000'
                        containerStyle = {{borderColor: '#fff'}}
                        checkedIcon={<Icon
                            name='check-square'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        uncheckedIcon={<Icon
                            name='square-o'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        onPress={() => {
                            this.checked[1] = !this.state.checked[1];
                            this.setState({checked: this.checked});
                            this.get_values();
                        }}
                    />:null}

                    {this.props.labels[2] !== "" ?<CheckBox
                        title={this.props.labels[2]}
                        textStyle={{fontWeight: 'normal'}}
                        checked={this.state.checked[2]}
                        checkedColor='#FF0000'
                        uncheckedColor='#FF0000'
                        containerStyle = {{borderColor: '#fff'}}
                        checkedIcon={<Icon
                            name='check-square'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        uncheckedIcon={<Icon
                            name='square-o'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        onPress={() => {
                            this.checked[2] = !this.state.checked[2];
                            this.setState({checked: this.checked});
                            this.get_values();
                        }}
                    />:null}

                    {this.props.labels[3] !== "" ?<CheckBox
                        title={this.props.labels[3]}
                        textStyle={{fontWeight: 'normal'}}
                        checked={this.state.checked[3]}
                        checkedColor='#FF0000'
                        uncheckedColor='#FF0000'
                        containerStyle = {{borderColor: '#fff'}}
                        checkedIcon={<Icon
                            name='check-square'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        uncheckedIcon={<Icon
                            name='square-o'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        onPress={() => {
                            this.checked[3] = !this.state.checked[3];
                            this.setState({checked: this.checked});
                            this.get_values();
                        }}
                    />:null}

                    {this.props.labels[4] !== "" ? <CheckBox
                        title={this.props.labels[4]}
                        textStyle={{fontWeight: 'normal'}}
                        checked={this.state.checked[4]}
                        checkedColor='#FF0000'
                        uncheckedColor='#FF0000'
                        containerStyle = {{borderColor: '#fff'}}
                        checkedIcon={<Icon
                            name='check-square'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        uncheckedIcon={<Icon
                            name='square-o'
                            type='font-awesome'
                            color='#FF0000'
                            size={28}/>}
                        onPress={() => {
                            this.checked[4] = !this.state.checked[4];
                            this.setState({checked: this.checked});
                            this.get_values();
                        }}
                    /> : null}


                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
