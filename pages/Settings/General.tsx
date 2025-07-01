import { ScrollView, View } from "react-native";
import Text from "../../components/Text";
import store from "../../stores";
import GravatarImage from "../../components/GravatarImage";

export default function SettingsGeneralTab() {
    return (
        <ScrollView>
            <View className="p-4">
                <Text variant="h4">Basic</Text>
                <View className="mt-2">
                    <View className="flex-row items-center justify-between border-t border-border py-4">
                        <View className="flex-1">
                            <Text variant="label">Photo</Text>
                        </View>
                        <View className="flex-row items-center gap-x-4">
                            <GravatarImage
                                email={`${store.auth.user?.email}`}
                                size={38}
                            />
                            <Text color="primary">Edit</Text>
                            <Text color="primary">Remove</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between border-t border-border py-4">
                        <View className="flex-1">
                            <Text variant="label">Name</Text>
                        </View>
                        <View className="flex-row items-center gap-x-4">
                            <Text color="primary">Edit</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center justify-between border-t border-border py-4">
                        <View className="flex-1">
                            <Text variant="label">Personal Email</Text>
                        </View>
                        <View className="flex-row items-center gap-x-4">
                            <Text>{store.auth.user?.email}</Text>
                            <Text color="primary">Edit</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="flex-col gap-y-2 p-4">
                <Text variant="h4">Preferences</Text>
                <View className="mt-2 flex-col gap-y-2 border-t border-border py-4">
                    <Text variant="label">Clear cache</Text>
                    <View className="flex-row items-center">
                        <View className="flex-1 opacity-65">
                            <Text variant="subtitle">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nostrum, commodi!
                            </Text>
                        </View>
                        <Text color="primary">Clear</Text>
                    </View>
                </View>
            </View>
            <View className="flex-col gap-y-2 p-4">
                <Text variant="h4">Delete account</Text>
                <View className="mt-2 flex-col gap-y-2 border-t border-border py-4">
                    <Text variant="label">Delete my Cloud</Text>
                    <View className="flex-row items-center">
                        <View className="flex-1 opacity-65">
                            <Text variant="subtitle">
                                If you delete your account your files will be
                                lost forever
                            </Text>
                        </View>
                        <Text color="primary">Delete</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
