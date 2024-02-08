import { useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native"
import { Icon, Text, TouchableRipple, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions } from "react-native"
import layoutS from "@/styles/layout"
import { extractListParams } from "@/util/routeHelpers"
import dataDummyLawyer from "@/constants/dummyLawyer"
import FilterTags from "@/components/FilterTags"
import LawyerScroller from "@/components/LawyerScroller"
import PhotoScroller from '../../components/PhotoScroller';
import LawyerCard from "@/components/LawyerCard"


const LawyersSearchResultScreen = () => {
    const theme = useTheme()
    const { tags } = useLocalSearchParams<{ tags: string }>()
    const tagsList = tags && extractListParams(tags)
    const foundLawyers = tags ? dataDummyLawyer.filter((lawyer => lawyer.tags.some(tag => tags.includes(tag)))) : [...dataDummyLawyer]
    return <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.primary }]}>
        <StatusBar style='light' />
        <View style={styles.wrapper}>
            <FilterTags tags={tagsList} />
            <LawyerScroller foundLawyers={foundLawyers}>
                {foundLawyers.map((lawyer, index) =>
                    <LawyerCard
                        key={`${lawyer.name}_${index}`}
                        lawyer={lawyer}
                        tags = {tags}
                    />
                )}
            </LawyerScroller>
        </View>

    </SafeAreaView>
}

export default LawyersSearchResultScreen

const styles = StyleSheet.create({
    root: {
        height: '100%',
        alignItems: 'center'
    },
    wrapper: {
        width: '100%',
        height: '100%',
    },
})



