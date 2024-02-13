import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTaskContext } from '../../hooks/useTaskContext';
import MainLayout from '../../contexts/MainLayout';

const SummaryScreen = () => {
    const { state, dispatch } = useTaskContext();
    return (
        <MainLayout>
            <View style={styles.headerContainer}>
                <Text style={styles.haderText}>Summary Task</Text>
            </View>
            <FlatList
                data={state.tasks}
                keyExtractor={(_, index) => index.toString()} //
                renderItem={({ item }) => (
                    <View style={styles.listContainer}>
                        <View style={styles.listItem}>
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
                        </View>
                    </View>
                )}
            />
        </MainLayout>
    )
}

export default SummaryScreen

const styles = StyleSheet.create({
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
    },
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