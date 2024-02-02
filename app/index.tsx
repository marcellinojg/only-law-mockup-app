import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import layoutS from '../styles/layout';
import { Button, IconButton, Searchbar, useTheme, Text } from "react-native-paper";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";


const LandingScreen = () => {
    const theme = useTheme()
    return <SafeAreaView style={layoutS.flexColCenter}>
        <StatusBar style='dark' />
        <View style={styles.wrapper}>
            <View style={styles.title_container}>
                <Text variant="displaySmall" style={{ fontWeight: 'bold' }}>ONLYLAW</Text>
                <Text variant="titleSmall">Anwält*innen suchen und finden in Sekunden</Text>
                <Text variant="labelMedium" style={{ paddingTop: 20, marginRight: 72 }}>
                    ONLYLAW ist das neue moderne Suchportal für Menschen die rechtliche Hilfe oder Rechtsbeistand benötigen.
                </Text>
            </View>
            <View style={styles.bottom_container}>
                <Link href={"/(search)/search"} asChild>
                    <Button
                        icon={"magnify"}
                        mode="elevated"
                        buttonColor="white"
                        contentStyle={{ justifyContent: 'flex-start', padding: 12, gap: 10 }}
                        labelStyle={{ fontSize: 28 }}
                    >
                        <Text variant="labelLarge">Suche starten</Text>
                    </Button>
                </Link>
                <View style={layoutS.flexRowCenter}>
                    <Button
                        icon="logout"
                        buttonColor={theme.colors.primary}
                        textColor="white"
                        mode="contained-tonal"
                        contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'space-between', padding: 8 }}
                        style={{ flexGrow: 1 }}
                    >
                        Login/Account erstellen
                    </Button>
                    <IconButton
                        icon={'account-box-multiple'}
                        containerColor={theme.colors.primary}
                        iconColor="white"
                        style={{ width: 56, height: 56 }}
                    />
                </View>
            </View>
        </View>
    </SafeAreaView>
}

export default LandingScreen

const styles = StyleSheet.create({
    'wrapper': {
        width: '90%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    'title_container': {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '90%',
        gap: 12,
    },
    'bottom_container': {
        flex: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: 16,
        paddingBottom: 24,
    },
})