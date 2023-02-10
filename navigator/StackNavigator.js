import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen'
import RequestScreen from '../screen/RequestScreen'
import DescriptionScreen from '../screen/DescriptionScreen';

import LoginScreen from '../screen/LoginScreen';
import QuoteScreen from '../screen/QuoteScreen';
import ConfirmScreen from '../screen/ConfirmScreen';
import SignUpScreen from '../screen/SignUp';
import GigScreen from '../screen/GigScreen';



const Home = createNativeStackNavigator();

export function HomeStack() {
    return (
        <Home.Navigator>

<Home.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />

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
                name="DescriptionScreen"
                component={DescriptionScreen}
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

        </Home.Navigator>
    )
}