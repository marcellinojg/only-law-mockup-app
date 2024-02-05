import { useLocalSearchParams } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Image, Platform, ScrollView, StyleSheet, View } from "react-native"
import { Button, Icon, IconButton, Surface, Text, TouchableRipple, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { Dimensions } from "react-native"
import layoutS from "@/styles/layout"
import { extractListParams } from "@/util/routeHelpers"
import { useRouteInfo } from "expo-router/build/hooks"
import dataDummyLawyer from "@/constants/dummyLawyer"


const LawyersSearchResultScreen = () => {
    const theme = useTheme()
    const { tags } = useLocalSearchParams<{ tags: string }>()
    const tagsList = tags && extractListParams(tags)
    const foundLawyers = tags ? dataDummyLawyer.filter((lawyer => lawyer.tags.some(tag => tags.includes(tag)))) : [...dataDummyLawyer]
    return <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.primary }]}>
        <StatusBar style='light' />
        <View style={styles.wrapper}>
            <View style={styles.filterContainer}>
                <IconButton
                    icon={'filter'}
                    containerColor={theme.colors.primary}
                    onPress={() => { }}
                    iconColor="white"
                    mode="contained-tonal"
                    rippleColor={'white'}
                />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 8, gap: 8 }}
                >

                    {tagsList ? tagsList.map((tag, index) =>
                        <View
                            key={`${tag}_${index}`}
                            style={[layoutS.flexRowCenter, styles.categoryTag]}
                        >
                            <Text
                                variant="labelMedium"
                                style={{ color: 'black', textTransform: 'uppercase' }}
                            >
                                {tag}
                            </Text>
                            <IconButton
                                rippleColor={'lightgrey'}
                                icon={'close'}
                                size={16}
                                borderless
                                iconColor={theme.colors.primary}
                                style={{ margin: 0 }}
                                onPress={() => { }}
                            />
                        </View>
                    ) : <Text variant="bodyLarge">Keine Tags ausgewählt</Text>}
                </ScrollView>
            </View>
            <ScrollView
                horizontal
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                pagingEnabled
                contentContainerStyle={{
                    gap: 16,
                    paddingHorizontal: Platform.OS === 'android' ? Dimensions.get('window').width * 0.05 : 0
                }}
                snapToOffsets={foundLawyers.map((_, index) => (Dimensions.get('window').width * 0.9 * index) + (16 * index))}
                snapToAlignment={"center"}
                contentInset={{ // iOS ONLY
                    top: 0,
                    left: Dimensions.get('window').width * 0.05,
                    bottom: 0,
                    right: Dimensions.get('window').width * 0.05
                }}
            >
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
                                        style={[layoutS.flexRowCenter, styles.categoryTagInfo]}
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
    wrapper: {
        width: '100%',
        height: '100%',
    },
    filterContainer: {
        backgroundColor: 'white',
        marginVertical: 12,
        flexDirection: 'row',
        gap: 8,
        borderRadius: 8,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
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



