import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { PropsWithChildren, ReactNode } from "react";
import { View } from "react-native";
import Text from "../components/Text";

export default function ManageAccessLayout(props: {
    state: TabNavigationState<ParamListBase>;
    children: ReactNode;
}) {
    const target = props.state.routes[props.state.index].params;
    return (
        <View>
            <Text>{target.name}</Text>
            {props.children}
        </View>
    );
}
