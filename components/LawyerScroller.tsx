import { ReactNode } from "react"
import { ScrollView, Platform, Dimensions } from "react-native"


interface LawyerScrollerProps {
    foundLawyers: any
    children: ReactNode
}

const LawyerScroller = (props: LawyerScrollerProps) => {
    const { foundLawyers, children } = props

    const HORIZONTAL_INSET = Dimensions.get('window').width * 0.05
    const CARD_WIDTH = Dimensions.get('window').width * 0.9
    const CARD_GAP = 16

    return <ScrollView
        horizontal
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        pagingEnabled
        contentContainerStyle={{
            gap: CARD_GAP,
            paddingHorizontal: Platform.OS === 'android' ? HORIZONTAL_INSET : 0
        }}
        snapToOffsets={foundLawyers.map((_: any, index: number) => (CARD_WIDTH * index) + (CARD_GAP * index))}
        snapToAlignment={"center"}
        contentInset={{
            top: 0,
            left: HORIZONTAL_INSET,
            bottom: 0,
            right: HORIZONTAL_INSET
        }}
    >
        {children}
    </ScrollView>
}

export default LawyerScroller