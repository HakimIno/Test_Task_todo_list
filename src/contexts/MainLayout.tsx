import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('screen');

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView style={[styles.container, {}]}>
            <StatusBar style="auto" />
            <View style={[styles.subContainer, { marginTop: insets.top }]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default MainLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: width,
        height: height,
    },
    subContainer: {
        flex: 1
    }
});
