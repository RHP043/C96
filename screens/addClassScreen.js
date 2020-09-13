import React from 'react';
import {Text,View,TextInput,KeyboardAvoidingView,StyleSheet,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase'
import DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export default class AddClassScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            userId:firebase.auth().currentUser.email,
            title:'',
            duration:'',
            classDate:Date.parse(moment())
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addClassDetails=(duration,title,classDate) => {
        alert("classDate:"+Date.parse(classDate))
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId();
        db.collection('details').add({
            "user_id":userId,
            "duration":duration,
            "title":title,
            "date":classDate
        })
        this.setState({
            duration:'',
            title:'',
            //date:''
        })
        return alert('Details added successfully')
    }
    handleChange(date){
        this.setState({
            classDate:date
        })
    }

    render(){
        return(
            <View style = {{flex:1}}>
                <KeyboardAvoidingView style = {styles.keyboardStyle}>
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {"Enter the class name"}
                    onChangeText = {(text)=>{
                        this.setState({
                            title:text
                        })
                    }}
                    value = {this.state.title}/>
                    <TextInput
                    style = {styles.formTextInput}
                    placeholder = {"Enter the duration of class"}
                    onChangeText = {(text)=>{
                        this.setState({
                            duration:text
                        })
                    }}
                    value = {this.state.duration}/>
                    <DatePicker
                    selected = {this.state.classDate}
                    onChange = {this.handleChange}
                    name = "startDate"
                    //dateFormat = "MM/DD/YYYY"
                    />
                    <TouchableOpacity style = {styles.button}
                    onPress = {()=>{this.addClassDetails(this.state.duration,this.state.title,this.state.classDate)}}
                    >
                        <Text>Add details</Text>
                        </TouchableOpacity>
                </KeyboardAvoidingView>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    keyboardStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"ff5722",
        shadowColor:"#0000",
        shadowOffset:{
            width:0,
            height:8,
        },
        shadowOpacity:0.44,
        shadowRadius:10.22,
        elevation:16,
        marginTop:20
    }
})