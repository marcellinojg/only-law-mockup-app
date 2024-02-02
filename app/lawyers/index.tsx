import { extractListParams } from "@/util/routeHelpers"
import { useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions } from "react-native"


const LawyersSearchResultScreen = () => {
    const theme = useTheme()
    const { tags } = useLocalSearchParams<{ tags: string }>()
    return <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.primary }]}>
        <StatusBar style='light' />
        <View style={{ width: '90%', height: '100%' }}>
            <View style={{ backgroundColor: 'white', marginVertical: 24 }}>
                <Text>
                    Filters
                </Text>
            </View>
            <ScrollView
                horizontal
                style={styles.scroller}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Text variant="headlineMedium">
                            PERSON 1
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>

    </SafeAreaView>
}

export default LawyersSearchResultScreen

const styles = StyleSheet.create({
    root: {
        height: '100%',
        alignItems: 'center'
    },
    scroller: {
    },
    cardContainer: {
        backgroundColor: 'white',
    },
    card: {
        width: Dimensions.get('screen').width * 0.9
    },
})