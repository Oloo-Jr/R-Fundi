import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import TitleText from '../components/TitleText';
import { Icon } from 'react-native-elements'
import BodyText from '../components/BodyText';
import SubText from '../components/SubText';
import { auth,db } from '../Database/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUserDocument, uploadProfile } from '../Database/dbmethods';
import { useState,useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';


const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    const source = {uri: result.uri};
    console.log(source);
    setImage(source)
  };
 const uploadProfile = async (name, idNumber, phoneNumber,imgUrl) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const serialNumber = Math.floor(100000+Math.random()*9000).toString()
    const ref = storage.ref("FundiProfileImages").child(serialNumber)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        storage.ref("FundiProfileImages")
            .child(serialNumber)
            .getDownloadURL()
            .then((imageUrl)=>{
              db.collection('FundiProfile')
              .add({
                Name: name,
                PhoneNumber: phoneNumber,
                IdNumber: idNumber,
                imgUrl: imgUrl,
              })
            })
      }
      )
  
  }
    
  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
     const user = userCredentials.user;
     uploadProfile(name,idNumber,phoneNumber,image );
     console.log('Registered in with:', user.email);
    })
    .catch(error => alert(error.message))
 }
    
            useEffect(() => {
                const unsubscribe = auth.onAuthStateChanged(user => {
                    if (user) {
                        navigation.replace("HomeScreen",{
                            currentDisplayName: name
                        })
                    }
                })

                return unsubscribe
            }, [])



    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>


                <ImageBackground
                    source={require('../assets/4k-background.png')}
                    resizeMode="cover"
                    style={styles.imageBackground}
                >



                    <View style={styles.logo}>


                        <Image
                            source={require('../assets/logo.png')}
                        //    style={styles.image}
                        // resizeMode="cover" 
                        />

                    </View>


                    <View style={styles.gridView}>










                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        //   style={styles.container}
                        >
                            <Card style={styles.card}>

                                <TitleText style={styles.Text}>Registration Form</TitleText>




                                <TextInput
                                    style={styles.input}
                                    value =  { name }
                                    onChangeText={text => setName(text)}
                                    placeholder="Name"

                                />

                                <TouchableOpacity onPress={pickImage}>

                                    <Card style={styles.inputButton}>


                                        <BodyText style={styles.inputText}>Upload Profile Image</BodyText>


                                    </Card>

                                </TouchableOpacity>

                                <TextInput
                                    style={styles.input}
                                    value =  { idNumber }
                                    onChangeText={text => setIdNumber(text)}
                                    placeholder="ID Number"

                                />

                                <TextInput
                                    style={styles.input}
                                    value =  { phoneNumber }
                                     onChangeText={text => setPhoneNumber(text)}
                                    placeholder="Phone Number(+254)"

                                />

                                <TextInput
                                    style={styles.input}
                                    value =  { email }
                                    onChangeText={text => setEmail(text)}
                                    placeholder="Email"

                                />

                                <TextInput
                                    style={styles.input}
                                    value =  { password }
                                    onChangeText={text => setPassword(text)}
                                    placeholder="Password"
                                    secureTextEntry

                                />

                                <TextInput
                                    style={styles.input}
                                    value =  { confirmPassword }
                                    onChangeText={text => setConfirmPassword(text)}
                                    placeholder="Confirm Password"
                                    secureTextEntry

                                />









                                <View style={styles.buttonView}>
                                    <TouchableOpacity onPress={handleSignUp} >

                                        <Card style={styles.submitbutton}>


                                            <TitleText style={styles.Text}>SUBMIT</TitleText>


                                        </Card>

                                    </TouchableOpacity>
                                </View>
                                <View style={styles.login}>


                                    <TouchableWithoutFeedback onPress={() => { navigation.replace("LoginScreen", { state: 0 }) }}>
                                        <View>
                                            <SubText style={styles.Text}>Already have an account? Click Here</SubText>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </Card>
                        </KeyboardAvoidingView>

                    </View>
                </ImageBackground>

            </View>
        </TouchableWithoutFeedback>




    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, alpha)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    socials: {
        paddingTop: 10,
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',




    },


    image: {
        height: 20,
        // Dimensions.get('window').width * 0.25,
        width: 20,

    },

    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },


    logo: {
        padding: 50,

        flex: 1,

        alignItems: 'center',

    },

    iconView: {
        position: "absolute",
        top: 50,
        left: 12,
        backgroundColor: '#8CC740',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8
    },

    dropdown: {
        width: '80%'
    },

    flatlist: {
        paddingTop: 50,
        backgroundColor: 'transparent'
    },

    card: {
        flex: 1,
        backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        paddingTop: 47,
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.7,
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    gridView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width * 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.8,

    },

    buttonText: {
        fontWeight: 'bold',

    },

    input: {
        width: '80%',
        borderColor: 'white',
        height: 48,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 30
    },


    buttonText: {
        fontWeight: 'bold',

    },


    button: {
        //  flex: 1,


        width: Dimensions.get('window').width * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 24,
        shadowOpacity: 0.2,
    },

    imageview: {
        width: '80%',
        borderRadius: 8,
        borderStyle: 'dashed',
        height: '25%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
    },

    Text: {
       // fontWeight: 'bold',
        fontFamily: 'Lexend-bold'

    },

    inputText: {
        // fontWeight: 'bold',
         fontFamily: 'Lexend-bold',
         paddingLeft: 10
 
     },


    submitbutton: {
        //  flex: 1,

        backgroundColor: '#8CC740',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        shadowOpacity: 0.2,
    },

    inputButton: {
        //  flex: 1,
        shadowColor: 'white',
        shadowOpacity: 0,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 100,
        height: 48,
        shadowOpacity: 0.2,
    },

    socialsButton: {
        //  flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#8CC740',
        width: Dimensions.get('window').width * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 40,
        shadowOpacity: 0.2,
    },


    buttonView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 50,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,

    },

    login: {


        zIndex: 30,
        position: 'absolute',
        bottom: 5,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,

    },


});

export default SignUpScreen;