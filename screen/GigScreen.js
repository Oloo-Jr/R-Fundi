import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Card from '../components/card';
import { Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import TitleText from '../components/TitleText';
import Gigs from '../components/Gigs';
import { GIGS } from '../data/services';
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';


const GigScreen = ({ navigation }) => {


    const renderGridItem = itemData => {
        return (
            ////COMPONENT IMPORTED TO RENDER FLATLIST ITEMS//////
            <Gigs
                name={itemData.item.name}

                image={itemData.item.image}
                location={itemData.item.location}
                service={itemData.item.service}
                remarks={itemData.item.remarks}
                onSelect={() => { navigation.navigate("QuoteScreen", { state: 0 }) }}


            />
        )
    }




    return (


        <View style={styles.container}>

            <View style={styles.statsView}>

                <Card style={styles.statsCard}>
                    <TitleText>Ksh 36,237</TitleText>
                    <TitleText>Overall earnings</TitleText>
                </Card>

                <Card style={styles.statsCard}>
                    <TitleText>5</TitleText>
                    <TitleText>Today's Bookings</TitleText>
                </Card>


            </View>

            <TitleText style={styles.title}>New Gig</TitleText>

            <View>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={GIGS}
                    renderItem={renderGridItem}
                    numColumns={1}
                />

            </View>


        </View>





    )
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, alpha)',
        //   alignItems: 'center',
        //  justifyContent: 'center',
        justifyContent: 'space-between',
        padding: 10
    },

    title: {
        fontFamily: 'Lexend-light',
        fontSize: 25,
        
        

    },

    statsCard: {
        width: 164,
        height: 80,
        shadowColor: 'white'
    },

    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 100,
     //   paddingHorizontal: 15
    },



});

export default GigScreen;