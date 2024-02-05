import dataDummyLawyer from "@/constants/dummyLawyer"
import { availableTags, popularTags } from "@/constants/dummyTags"
import layoutS from "@/styles/layout"
import { buildListParams } from "@/util/routeHelpers"
import { Link } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Image, Keyboard, StyleSheet, View } from "react-native"
import { Button, IconButton, List, Text, TextInput, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import _ from "lodash"
import DismissKeyboard from "@/components/DismissKeyboard"


const SearchScreen = () => {
    const theme = useTheme()
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [search, setSearch] = useState<string>("")
    const [hideTrendingTags, setHideTrendingTags] = useState<boolean>(false)
    const countFoundLawyers = dataDummyLawyer.filter((lawyer) => lawyer.tags.some(tag => selectedTags.includes(tag))).length

    const handleAddTag = (tag: string) => {
        if (selectedTags.length >= 3 || selectedTags.includes(tag)) return

        setSelectedTags(prev => [...prev, tag])
    }

    const handleAddTagViaSearch = (tag: string) => {
        setHideTrendingTags(false)
        Keyboard.dismiss()
        setSearch('')
        if (selectedTags.length >= 3 || selectedTags.includes(tag)) return

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
                            {popularTags.map((tag, index) =>
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
            {hideTrendingTags &&
                <View style={{ flex: 8, paddingTop: 20 }}>
                    {search.length !== 0 &&
                        <>
                            {availableTags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase())).splice(0, 3).map((tag, index) =>
                                <List.Item
                                    key={`${tag}_${index}`}
                                    title={tag}
                                    onPress={() => handleAddTagViaSearch(tag)}
                                    rippleColor={'white'}
                                    titleStyle={{ color: 'white', fontSize: 20 }}
                                    style={{ paddingVertical: 0, paddingRight: 0 }}
                                    contentStyle={{ paddingVertical: 12 }}
                                />
                            )}
                            {availableTags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase())).length == 0 &&
                                <>
                                    <Image source={require('@/assets/images/tagsnotfound-illus.png')} style={{ objectFit: 'cover', width: 240, height: 240, alignSelf: 'center' }} />
                                    <Text variant="titleLarge" style={{ color: 'white', textAlign: 'center' }} >
                                        Keine Tags gefunden
                                    </Text>
                                </>
                            }
                        </>

                    }
                    {search.length == 0 &&
                        <>
                            <Image source={require('@/assets/images/search-illus.png')} style={{ objectFit: 'cover', width: 240, height: 240, alignSelf: 'center' }} />
                            <Text variant="titleLarge" style={{ color: 'white', textAlign: 'center' }} >
                                Bitte geben Sie einen Tag ein
                            </Text>
                        </>
                    }
                </View>
            }
            <View style={[styles.sections, styles.sectionSearch]}>
                {hideTrendingTags &&
                    <Text variant="bodyMedium" style={{ color: 'lightgray', alignSelf:'center' }}>
                        Suche nach Tags, Rechtsgebieten oder Anwälten:
                    </Text>
                }
                <DismissKeyboard>
                    <TextInput
                        placeholder="Wir helfen dir!"
                        textColor="black"
                        onFocus={() => setHideTrendingTags(true)}
                        onEndEditing={() => setHideTrendingTags(false)}
                        style={{ backgroundColor: 'white', borderRadius: 6 }}
                        left={<TextInput.Icon icon={'magnify'} />}
                        value={search}
                        onChangeText={setSearch}
                    />
                </DismissKeyboard>
                {!hideTrendingTags &&
                    <Link asChild href={`/lawyers?${buildListParams('tags', selectedTags)}`}>
                        <Button
                            mode="text"
                            textColor="white"
                            contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'flex-end' }}
                            icon={'arrow-right-thin'}
                            labelStyle={{ fontSize: 32 }}
                        >
                            <Text variant="bodyLarge" style={{ color: 'white' }}>
                                {selectedTags.length != 0 ? `${countFoundLawyers} Suchergebnisse anzeigen` : 'Alle Suchergebnisse anzeigen'}
                            </Text>
                        </Button>
                    </Link>
                }
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