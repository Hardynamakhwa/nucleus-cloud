import { ScrollView, View } from "react-native";
import Text from "../../components/Text";
import { Link } from "@react-navigation/native";

export default function SettingsSecurityTab() {
    return (
        <ScrollView>
            <View className="p-4 pt-0">
                <View className="flex-col gap-y-2 py-4">
                    <Text variant="label">Password</Text>
                    <View className="flex-row items-center gap-x-4">
                        <View className="flex-1 opacity-65">
                            <Text variant="subtitle">
                                Set a unique password to protect your personal
                                cloud acount
                            </Text>
                        </View>
                        <Link screen="ChangePassword" params={{}}>
                            <Text color="primary">Change password</Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
