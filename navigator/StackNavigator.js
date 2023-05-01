import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen'
import RequestScreen from '../screen/RequestScreen'
import DescriptionScreen from '../screen/DescriptionScreen';
import LoginScreen from '../screen/LoginScreen';
import QuoteScreen from '../screen/QuoteScreen';
import ConfirmScreen from '../screen/ConfirmScreen';
import GigScreen from '../screen/GigScreen';
import ArrivedScreen from '../screen/ArrivedScreen';
import ConfirmationScreen from '../screen/confirmationScreen';
import ConfirmedScreen from '../screen/ConfirmedPage';
import PaymentScreen from '../screen/PaymentPage';



const Home = createNativeStackNavigator();

export function HomeStack() {
    return (
        <Home.Navigator>

<Home.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Home.Screen
                name="GigScreen"
                component={GigScreen}
                options={{ headerShown: false }}
            />

         



<Home.Screen
                name="QuoteScreen"
                component={QuoteScreen}
                options={{ headerShown: false }}
            />


<Home.Screen
                name="ConfirmScreen"
                component={ConfirmScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="ArrivedScreen"
                component={ArrivedScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="ConfirmationScreen"
                component={ConfirmationScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="ConfirmedScreen"
                component={ConfirmedScreen}
                options={{ headerShown: false }}
            />

<Home.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{ headerShown: false }}
            />

        </Home.Navigator>
    )
}