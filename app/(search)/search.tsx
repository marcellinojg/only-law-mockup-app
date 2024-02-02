import layoutS from "@/styles/layout"
import { buildListParams } from "@/util/routeHelpers"
import { Link, useNavigation } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, IconButton, Text, TextInput, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"


const SearchScreen = () => {
    const theme = useTheme()
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [search, setSearch] = useState<string>("")
    const [hideTrendingTags, setHideTrendingTags] = useState<boolean>(false)

    // TEMPORARY, MOCKUP PURPOSES
    const availableTags = ['Strafrecht', 'Familienrecht', 'Demonstrationsrecht', 'Erbschaftrecht', 'Sozialrecht', 'Datenschutz', 'Mietminderung', 'HomeOffice']
    let foundText = 'Alle Suchergebnisse anzeigen'

    switch (selectedTags.length) {
        case 0:
            foundText = 'Alle Suchergebnisse anzeigen'
            break
        case 1:
            foundText = '8 Suchergebnisse anzeigen'
            break
        case 2:
            foundText = '17 Suchergebnisse anzeigen'
            break
        case 3:
            foundText = '32 Suchergebnisse anzeigen'
            break
        default:
            break
    }

    const handleAddTag = (tag: string) => {
        if (selectedTags.length >= 3) return

        setSelectedTags(prev => [...prev, tag])
    }

    const handleDeleteTag = (tag: string) => {
        setSelectedTags(prev => [...prev.filter((t) => t !== tag)])
    }


    return <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.primary }]}>
        <StatusBar style='light' />
        <View style={styles.wrapper}>
            {!hideTrendingTags &&
                <>
                    <View style={[styles.sections, layoutS.flexColCenterStart]}>
                        <Text style={{ color: 'white' }} variant="bodyLarge">
                            {selectedTags.length == 0 ? 'Keine Tags ausgewahlt' : `${selectedTags.length} von 3 Tags ausgewahlt :`}
                        </Text>
                        <View style={[layoutS.flexColCenterStart, { paddingTop: 16, gap: 12 }]}>
                            {selectedTags.map((tag, index) =>
                                <View
                                    key={`${index}_${tag}`}
                                    style={[layoutS.flexRowCenter, styles.selectedCategory, styles.categoryButton, { borderColor: theme.colors.secondary }]}
                                >
                                    <Text
                                        variant="labelMedium"
                                        style={{ color: 'white', textTransform: 'uppercase' }}
                                    >
                                        {tag}
                                    </Text>
                                    <IconButton onPress={() => handleDeleteTag(tag)} icon={'close'} size={16} borderless iconColor="white" style={{ margin: 0 }} />
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={[styles.sections, styles.sectionTags, layoutS.flexColCenterStart]}>
                        <Text style={{ color: 'white' }} variant="labelLarge">Aktulle Trend Tags:</Text>
                        <View style={[layoutS.flexRowStartCenter, { paddingTop: 16, flexWrap: 'wrap', gap: 10 }]}>
                            {availableTags.map((tag, index) =>
                                <Button
                                    uppercase
                                    buttonColor="transparent"
                                    mode="outlined"
                                    key={`${index}-${tag}`}
                                    style={styles.categoryButton}
                                    onPress={() => handleAddTag(tag)}
                                    rippleColor={'lightgrey'}
                                >
                                    <Text variant="labelSmall" style={{ color: 'lightgrey' }} >{tag}</Text>
                                </Button>
                            )}
                        </View>
                    </View>
                </>
            }
            <View style={[styles.sections, styles.sectionSearch]}>
                <TextInput
                    placeholder="Wir helfen dir!"
                    textColor="black"
                    onFocus={() => setHideTrendingTags(true)}
                    onEndEditing={() => setHideTrendingTags(false)}
                    theme={theme}
                    style={{ backgroundColor: 'white' }}
                    left={<TextInput.Icon icon={'magnify'} />}
                    value={search}
                    onChangeText={setSearch}
                    right={<TextInput.Icon icon={'filter'} onPress={() => console.log('test')} containerColor={theme.colors.primary} color={'white'} mode="contained-tonal" size={20} />}
                />
                <Link asChild href={`/lawyers?${buildListParams('tags', selectedTags)}`}>
                    <Button
                        mode="text"
                        textColor="white"
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'flex-end' }}
                        icon={'arrow-right-thin'}
                        labelStyle={{ fontSize: 32 }}
                    >
                        <Text variant="bodyLarge" style={{ color: 'white' }}>{foundText}</Text>
                    </Button>
                </Link>
            </View>
        </View>
    </SafeAreaView>
}

export default SearchScreen

const styles = StyleSheet.create({
    root: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '90%',
        height: '100%',
        color: 'white'
    },
    sections: {
        minWidth: '100%',
        paddingHorizontal: 12,
        flex: 2
    },
    sectionTags: {
        flex: 3
    },
    sectionSearch: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 24,
        gap: 12
    },
    categoryButton: {
        borderWidth: 2,
        borderColor: 'white',
    },
    selectedCategory: {
        borderRadius: 999,
        gap: 4,
        paddingLeft: 16,
        paddingRight: 6,
    }
})