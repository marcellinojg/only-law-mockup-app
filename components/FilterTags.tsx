import layoutS from "@/styles/layout"
import { ScrollView, StyleSheet, View } from "react-native"
import { IconButton, Text, useTheme } from "react-native-paper"


const FilterTags = ({ tags }: { tags: string[] | "" }) => {
    const theme = useTheme()
    return <View style={styles.filterContainer}>
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

            {tags ? tags.map((tag, index) =>
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
}

export default FilterTags

const styles = StyleSheet.create({
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
    categoryTag: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 999,
        gap: 4,
        paddingLeft: 16,
        paddingRight: 6,
        alignSelf: 'center'
    },
})