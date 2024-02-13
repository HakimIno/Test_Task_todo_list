import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HomeScreen, SummaryScreen } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export const AppStack = () => {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home-sharp'
                                : 'home-outline';
                        } else if (route.name === 'Summary') {
                            iconName = focused ? 'briefcase' : 'briefcase-outline';
                        }

                        return <Ionicons name={iconName as any} size={size} color={color} />;
                    },
                    tabBarStyle: {
                        paddingVertical: 10, height: 60
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Summary" component={SummaryScreen} />
            </Tab.Navigator>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#281034',
    },
});