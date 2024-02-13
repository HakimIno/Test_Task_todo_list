import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppStack } from './AppStack'
import { TaskProvider } from '../contexts/TaskContext'

const Routes = () => {
    return (
        <TaskProvider>
            <NavigationContainer>
                <AppStack />
            </NavigationContainer>
        </TaskProvider>
    )
}

export default Routes

