import { ScrollView, View } from "react-native";
import GravatarImage from "../components/GravatarImage";
import useAuth from "../hooks/useAuth";
import Text from "../components/Text";
import ListItem from "../components/ListItem";
import store from "../stores";
import { observer } from "mobx-react-lite";

function SettingsPage() {
    return (
        <ScrollView>
            <View className="flex-row items-end gap-x-4 p-4">
                <GravatarImage
                    email={`${store.auth.user?.email}`}
                    size={86}
                />
                <View>
                    <Text>{store.auth.authenticated}</Text>
                </View>
            </View>
            <View>
                <ListItem
                    title="Log out"
                    onTap={() => store.auth.logout()}
                />
            </View>
        </ScrollView>
    );
}
export default observer(SettingsPage);
