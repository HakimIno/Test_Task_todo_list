import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TaskList } from '../../components'
import MainLayout from '../../contexts/MainLayout'
import { Ionicons } from '@expo/vector-icons'
import Modals from '../../components/Modals'
import { useTaskContext } from '../../hooks/useTaskContext'

const HomeScreen = () => {

    const { state, dispatch } = useTaskContext();

    const openModal = () => {
        dispatch({ type: 'SET_IS_OPEN', payload: true });
    }

    return (
        <MainLayout>
            <View style={styles.headerContainer}>
                <Text style={styles.haderText}>Task</Text>
                <Ionicons name="add-circle" size={30} color="white" onPress={openModal} />
            </View>
            <TaskList />
            <Modals alertTitle="Add Task" isOpen={state.isOpen} />
            <Modals alertTitle="Edit Task" isOpen={state.isOpenEdit} />
        </MainLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    haderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "tomato"
    }
})