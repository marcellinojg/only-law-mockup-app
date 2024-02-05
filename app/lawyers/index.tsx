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
                    <View style={styles.card} key={`${lawyer.name}_${index}`}>
                        <ScrollView
                            nestedScrollEnabled={true}
                            horizontal
                            contentContainerStyle={{ gap: 8 }}
                            showsHorizontalScrollIndicator={false}
                            style={{ flexGrow: 0 }}
                        >
                            <Image
                                source={lawyer.photo_1}
                                style={[{ width: 240, height: 280 }, styles.lawyerPhoto]}
                            />
                            <Image
                                source={lawyer.photo_2}
                                style={[{ width: 320, height: 280 }, styles.lawyerPhoto]}
                            />
                        </ScrollView>
                        <View style={styles.lawyerInfoContainer}>
                            <Text variant="headlineMedium" style={{ fontWeight: 'bold' }} >
                                {lawyer.name}
                            </Text>
                            <Text>
                                {lawyer.kanzlei}
                            </Text>
                            <View style={[layoutS.flexRowStartCenter, { gap: 8 }]}>
                                <Icon source={'map-marker'} size={20} />
                                <Text>{lawyer.location}</Text>
                            </View>
                            <View style={[layoutS.flexRowStartCenter, { flexWrap: 'wrap', marginTop: 12, gap: 8 }]}>
                                {lawyer.tags.map((tag, index) =>
                                    <View
                                        style={[layoutS.flexRowCenter, styles.categoryTagInfo, {borderColor: tags && tagsList.includes(tag) ? theme.colors.secondary : 'black'}]}
                                        key={`${lawyer.name}_${tag}_${index}`}
                                    >
                                        <Text
                                            variant="labelMedium"
                                            style={{ color: 'black', textTransform: 'uppercase' }}
                                        >
                                            {tag}
                                        </Text>
                                    </View>
                                )}

                            </View>
                        </View>
                        <TouchableRipple onPress={() => { }} style={styles.anfrageButton}>
                            <View style={{ gap: 2 }}>
                                <Text>kostenlos & unverbindlich</Text>
                                <View style={[layoutS.flexRowStartCenter, { gap: 12 }]}>
                                    <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
                                        Anfrage starten
                                    </Text>
                                    <Icon source={'arrow-right-thin'} size={24} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </View>
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

    card: {
        width: Dimensions.get('screen').width * 0.9,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 8,
        flexGrow: 1,
        marginBottom: 12,
        justifyContent: 'space-between'
    },
    lawyerPhoto: {
        objectFit: 'cover',
        borderRadius: 8
    },
    categoryTag: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 999,
        gap: 4,
        paddingLeft: 16,
        paddingRight: 6,
        alignSelf: 'center'
    },
    anfrageButton: {
        borderRadius: 8,
        backgroundColor: '#C7E3DE',
        padding: 12
    },
    lawyerInfoContainer: {
        gap: 6,
        marginTop: 20,
        paddingHorizontal: 8,
        flexGrow: 1
    },
    categoryTagInfo: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 999,
        gap: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'center'
    }
})



