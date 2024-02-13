import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTaskContext } from '../../hooks/useTaskContext';
import { Ionicons } from '@expo/vector-icons';

const TaskList = () => {
    const { state, dispatch } = useTaskContext();

    const toggleTask = (id: number) => {
        dispatch({ type: 'TOGGLE_TASK', payload: id });
        dispatch({ type: 'SET_IS_OPEN', payload: true });
    };

    const removeTask = (id: number) => {
        dispatch({ type: 'REMOVE_TASK', payload: id });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={state.tasks}
                keyExtractor={(_, index) => index.toString()} // Use index as key
                renderItem={({ item }) => (
                    <View style={styles.listContainer}>
                        <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.listItem}>
                            <View style={styles.details}>
                                <Text style={styles.lable}>
                                    หัวข้องาน:
                                </Text>
                                <Text style={styles.textTitle}>
                                    {item.title}
                                </Text>
                            </View>

                            <View style={styles.details}>
                                <Text style={styles.lable}>
                                    คำอธิบาย:
                                </Text>
                                <Text style={styles.textTitle}>
                                    {item.subTitle}
                                </Text>
                            </View>
                            <View style={styles.details}>
                                <Text style={styles.lable}>
                                    วันกำหนด:
                                </Text>
                                <Text style={styles.textTitle}>
                                    {item.date}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <Ionicons
                            name="pencil" size={24} color="tomato"
                            onPress={() => dispatch({ type: 'SET_IS_OPEN_EDIT', payload: { isOpenEdit: true, editTaskId: item.id, } })} />
                        <Ionicons name="trash" size={24} color="tomato" onPress={() => removeTask(item.id)} />
                    </View>
                )}
            />
        </View>
    )
}

export default TaskList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: "100%",
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        alignItems: 'center'
    },
    listItem: {
        flexDirection: 'column',
        backgroundColor: 'white',
        width: "80%",
    },
    textTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 5
    },
    details: {
        flexDirection: 'row'
    },
    lable: {
        fontSize: 16,
        fontWeight: 'bold',

    }
})