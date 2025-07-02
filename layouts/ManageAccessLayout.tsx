import {PropsWithChildren} from "react";
import {View} from "react-native";

export default function (props: PropsWithChildren) {

    return <View>
    {props.children}
    </View>
}
