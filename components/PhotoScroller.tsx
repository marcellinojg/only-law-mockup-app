import { ReactNode } from "react"
import { ScrollView } from "react-native"


const PhotoScroller = ({ children }: { children: ReactNode }) => {
    return <ScrollView
        nestedScrollEnabled={true}
        horizontal
        contentContainerStyle={{ gap: 8 }}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0  }}
    >
        {children}
    </ScrollView>
}

export default PhotoScroller