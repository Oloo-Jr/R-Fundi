import React, {useEffect, useState, useRef} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SERVICES } from '../data/services';
import Services from '../components/Services';
import { Icon } from 'react-native-elements';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText';
import QuoteTable from '../components/QuoteTable';
import { QUOTE } from '../data/services';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';


const QuoteScreen = ({ navigation }) => {
    const [latlng, setLatLng] = useState({})

    const checkPermission = async () => {
      const hasPermission = await Location.requestForegroundPermissionsAsync();
      if (hasPermission.status === 'granted') {
        const permission = await askPermission();
        return permission
      }
      return true
    };
  
    const askPermission = async () => {
      const permission = await Location.requestBackgroundPermissionsAsync();
      return permission.status === 'granted';
    };
  
  
    const getLocation = async () => {
      try {
        const { granted } = await Location.requestBackgroundPermissionsAsync();
        if (!granted) return;
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        setLatLng({ latitude: latitude, longitude: longitude })
      } catch (err) {
  
      }
    }
  
    const _map = useRef(1);
  
    useEffect(() => {
      checkPermission();
      getLocation()
      console.log(latlng)
        , []
    })


    const renderQuoteItem = itemData => {
        return (
            ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
            <QuoteTable
                description={itemData.item.description}


                amount={itemData.item.amount}

            //  onSelect={() => { navigation.navigate("DescriptionScreen", { state: 0 }) }}


            />
        )
    }


    return (


        <View style={styles.container}>


            <View style={styles.iconView}>
                <Icon
                    type="material-community"
                    name="menu"
                    //color = {colors.grey1}
                    size={35}
                    onPress={() => { navigation.toggleDrawer() }}
                />





            </View>




            <View style={styles.gridView}>



                <Card style={styles.card}>
                    <View style={styles.textView}>
                        <TitleText style={styles.Text}>Please draft a quotation for the client</TitleText>

                    </View>


                    <View style={styles.QuoteInput}>
                        <TextInput
                            style={styles.input}


                            placeholder="Description"

                        />


<TextInput
                            style={styles.input1}


                            placeholder="Amount"

                        />

<Icon
                    type="material-community"
                    name="plus"
                    color = 'black'
                    size={30}
                    onPress={() => { navigation.replace("GigScreen", { state: 0 }) }}
                  
                />


                    </View>

                    <View style={styles.flatlist}>
                        <FlatList
                            keyExtractor={(item, index) => item.id}
                            data={QUOTE}
                            renderItem={renderQuoteItem}
                            numColumns={1}
                        />

                    </View>


                    <View >
                        <TitleText style={styles.Text}>Please draft an for the client</TitleText>

                    </View>


                    <View style={styles.buttonView}>


                        <TouchableOpacity onPress={() => { navigation.replace("ConfirmScreen", { state: 0 }) }}>

                            <Card style={styles.submitbutton}>


                                <TitleText style={styles.Text}>SUBMIT</TitleText>


                            </Card>

                        </TouchableOpacity>



                    </View>

                    <View style={styles.buttonView2}>
                        <TouchableOpacity onPress={() => { navigation.replace("GigScreen", { state: 0 }) }}>

                            <Card style={styles.backButton}>


                                <TitleText style={styles.Text}>GO BACK</TitleText>


                            </Card>

                        </TouchableOpacity>
                    </View>

                </Card>


            </View>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,

        // alignItems: 'center',
        justifyContent: 'space-around'
    },

QuoteInput: {
flexDirection: 'row',
justifyContent: 'space-around',
width: '90%',
paddingTop: 10

},


    input: {
        width: '50%',
        borderColor: '#8CC740',
        //height: 48,
      //  margin: 12,
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
       // borderRadius: 30
    },

    input1: {
        width: '20%',
        borderColor: '#8CC740',
        //height: 48,
      //  margin: 12,
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
       // borderRadius: 30
    },


    table: {
        width: Dimensions.get('window').width * 0.8,
        //  paddingLeft: '15%',

        // width: '80%',
        borderRadius: 8,
        borderStyle: 'dashed',
        //height: '25%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'

    },

    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    logo: {
        padding: 10
    },

    Text: {
        fontFamily: 'Lexend-bold'
    },

    textView: {
        paddingTop: 50
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

    userIcon: {
        position: "absolute",
        top: 50,
        right: 12,
        backgroundColor: 'grey',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8
    },

    buttonView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 90,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        //padding: 20

    },

    buttonView2: {


        zIndex: 30,
        position: 'absolute',
        bottom: 45,
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        paddingTop: 20

    },

    Text: {
        fontWeight: 'bold',

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

    backButton: {
        //  flex: 1,

        backgroundColor: '#ffff',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 48,
        shadowOpacity: 0.2,
        borderColor: '#8CC740',
        borderWidth: 1,

    },


    flatlist: {
        paddingTop: 10,
        backgroundColor: 'transparent',
    },

    card: {
        flex: 1,
        backgroundColor: '#F5F2F0',

        width: Dimensions.get('window').width * 1,
        //  justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.75,
        shadowOpacity: 0.2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },



    image: {
        //height: Dimensions.get('window').width * 0.25,
        //  width: Dimensions.get('window').width * 0.25,

    },


    gridView: {


        zIndex: 30,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width * 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: Dimensions.get('window').height * 0.75,

    },

    buttonText: {
        fontWeight: 'bold',

    },



});

export default QuoteScreen;