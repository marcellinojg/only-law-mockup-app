import layoutS from "@/styles/layout"
import { Dimensions, StyleSheet, View, Image } from "react-native"
import { Icon, TouchableRipple, Text, useTheme, ProgressBar } from "react-native-paper"
import PhotoScroller from "./PhotoScroller"
import { extractListParams } from "@/util/routeHelpers"

interface LawyerCardProps {
    lawyer: Lawyer,
    tags: string,
}

const LawyerCard = (props: LawyerCardProps) => {
    const { lawyer, tags } = props
    const tagsList = tags && extractListParams(tags)
    const theme = useTheme()
    const RATING_SIZE = Dimensions.get('screen').width * 0.1

    return <View style={styles.card}>
        <PhotoScroller>
            <Image
                source={lawyer.photo_1}
                style={[{ width: 240, height: Dimensions.get('screen').height * 0.28 }, styles.lawyerPhoto]}
            />
            <Image
                source={lawyer.photo_2}
                style={[{ width: 320, height: Dimensions.get('screen').height * 0.28 }, styles.lawyerPhoto]}
            />

        </PhotoScroller>
        <View style={styles.lawyerInfoContainer}>
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }} >
                {lawyer.name}
            </Text>
            <Text>
                {lawyer.kanzlei}
            </Text>
            <View style={[layoutS.flexRowStartCenter, { gap: 8 }]}>
                <Icon source={'map-marker'} size={20} />
                <Text>{lawyer.location}</Text>
            </View>
            <View style={[layoutS.flexRowStartCenter, { gap: 12, marginVertical: 8 }]}>
                <View style={{ gap: 4, alignItems: 'center' }}>
                    <Icon source={'shield-sword'} size={24} />
                    <ProgressBar progress={lawyer.rating1 / 5} style={{ width: RATING_SIZE }} />
                </View>
                <View style={{ gap: 4, alignItems: 'center' }}>
                    <Icon source={'chat'} size={24} />
                    <ProgressBar progress={lawyer.rating2 / 5} style={{ width: RATING_SIZE }} />
                </View>
                <View style={{ gap: 4, alignItems: 'center' }}>
                    <Icon source={'feather'} size={24} />
                    <ProgressBar progress={lawyer.rating3 / 5} style={{ width: RATING_SIZE }} />
                </View>
                <View style={{ gap: 4, alignItems: 'center' }}>
                    <Icon source={'handshake'} size={24} />
                    <ProgressBar progress={lawyer.rating4 / 5} style={{ width: RATING_SIZE }} />
                </View>
            </View>
            <View style={[layoutS.flexRowStartCenter, { flexWrap: 'wrap', marginTop: 4, gap: 8 }]}>
                {lawyer.tags.map((tag, index) =>
                    <View
                        style={[layoutS.flexRowCenter, styles.categoryTagInfo, { borderColor: tags && tagsList.includes(tag) ? theme.colors.secondary : 'black' }]}
                        key={`${lawyer.name}_${tag}_${index}`}
                    >
                        <Text
                            variant="labelSmall"
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
}

const styles = StyleSheet.create({
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


export default LawyerCard