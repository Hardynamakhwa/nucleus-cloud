import { ScrollView, View } from "react-native";
import Text from "../../components/Text";

export default function SettingsNotificationsTab() {
    return (
        <ScrollView>
            <View className="p-4">
                <Text variant="h4">Comming Soon</Text>
                {/* <ListItem
                    title="Email Notifications"
                    description="Receive notifications via email"
                    onTap={() => console.log("Toggle Email Notifications")}
                />
                <ListItem
                    title="Push Notifications"
                    description="Receive notifications on your device"
                    onTap={() => console.log("Toggle Push Notifications")}
                /> */}
            </View>
        </ScrollView>
    );
}
