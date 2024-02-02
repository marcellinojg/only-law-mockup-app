import { StyleSheet } from "react-native"

const layoutS = StyleSheet.create({
    flexRowCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRowStartCenter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    flexColCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexColCenterStart:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    }
})

export default layoutS