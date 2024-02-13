import { Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTaskContext } from '../../hooks/useTaskContext';

interface Props {
    alertTitle: string;
    alertMessage?: string;
    confirmText?: string;
    cancelText?: string;
    isOpen: boolean;
}

const Modals = (props: Props) => {

    const { state, dispatch } = useTaskContext();

    const {
        alertTitle,
        alertMessage,
        cancelText = "ยกเลิก",
        confirmText = "ยืนยัน",
        isOpen = false,
    } = props;

    const taskToEdit = state.tasks.find(task => task.id === state.editTaskId);

    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [date, setDate] = useState("")


    useEffect(() => {
        if (alertTitle === "Edit Task" && taskToEdit) {
            setTitle(String(taskToEdit.title))
            setSubTitle(String(taskToEdit.subTitle))
            setDate(String(taskToEdit.date))
        }
    }, [alertTitle, taskToEdit])


    const onPressSummit = () => {
        if (alertTitle === "Add Task") {
            dispatch({ type: 'ADD_TASK', payload: { id: state.tasks.length + 1, title, subTitle, date } });
            dispatch({ type: 'SET_IS_OPEN', payload: false });
            setTitle("");
            setSubTitle("");
            setDate("");
        } else {
            dispatch({
                type: 'EDIT_TASK', payload: {
                    id: state.editTaskId,
                    title: title || taskToEdit?.title,
                    subTitle: subTitle || taskToEdit?.subTitle,
                    date: date || taskToEdit?.date
                }
            });
            dispatch({ type: 'SET_IS_OPEN_EDIT', payload: false });
        }
    }

    const handelColose = () => {
        dispatch({ type: 'SET_IS_OPEN', payload: false });
        dispatch({ type: 'SET_IS_OPEN_EDIT', payload: false });
    }

    return (
        <Modal visible={isOpen} transparent statusBarTranslucent={false}>
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.8)" barStyle="dark-content" />
            <View style={styles.modalContainer}>
                <View
                    style={[
                        styles.modalContent,
                    ]}
                >
                    <Text>{alertTitle}</Text>

                    <View>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="ชื่อหัวข้อ"
                            onChangeText={text => setTitle(text)}
                            value={title}
                        />

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="คำอธิบาย"
                            onChangeText={text => setSubTitle(text)}
                            value={subTitle}
                        />

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="วันกำหนด"
                            onChangeText={text => setDate(text)}
                            value={date}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.button,
                                {
                                    backgroundColor: "tomato",
                                    marginTop: 8,
                                },
                            ]}
                            onPress={onPressSummit}
                        >
                            <Text style={[styles.buttonText, { color: "white" }]}>{confirmText}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.button,
                                {
                                    borderWidth: 0.8,
                                    borderColor: "tomato",
                                    marginTop: 8,
                                },
                            ]}
                            onPress={handelColose}
                        >
                            <Text style={[styles.buttonText]}>{cancelText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default Modals

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        width: "90%",
        borderRadius: 15,
        justifyContent: "space-between",
    },
    buttonContainer: {
        marginTop: 40,
    },
    button: {
        paddingHorizontal: 20,
        height: 50,
        borderRadius: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "tomato",
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: "center",
    },
    textInputStyle: {
        width: "100%",
        borderRadius: 25,
        borderWidth: 1.5,
        height: 55,
        fontSize: 14,
        marginTop: 10,
        paddingHorizontal: 15,
        color: "gray",
    },
})