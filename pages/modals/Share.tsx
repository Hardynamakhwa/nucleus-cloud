import { ScrollView, View } from "react-native";
import Text from "../../components/Text";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Router";
import { useEffect, useMemo } from "react";
import { Field, Input, Label } from "../../components/Input";

type shareNavigation = NativeStackNavigationProp<RootStackParamList, "Share">;
type shareRoute = RouteProp<RootStackParamList, "Share">;

function Share() {
    const navigation = useNavigation<shareNavigation>();
    const route = useRoute<shareRoute>();

    const resource = useMemo(() => route.params.resource, [route]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle() {
                return (
                    <View>
                        <Text>{resource.name}</Text>
                    </View>
                );
            },
        });
    }, [navigation, resource.name]);

    const heading = useMemo(
        () =>
            `Share this ${resource.__typename === "FileType" ? "file" : "folder"}`,
        [resource.__typename]
    );

    return (
        <ScrollView>
            <View className="p-4">
                <Text variant="h3">{heading}</Text>
            </View>
            <Field>
                <Label>Add an email</Label>
                <Input type="email-address" />
            </Field>
        </ScrollView>
    );
}

export default Share;
