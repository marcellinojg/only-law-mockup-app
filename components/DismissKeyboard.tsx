import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const DismissKeyboard = ({ children }: { children: ReactNode }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
            {children}
        </>
    </TouchableWithoutFeedback>
);

export default DismissKeyboard