import { ScrollView, View } from "react-native";
import Text from "../../components/Text";

export default function SearchPage() {
    return (
        <ScrollView>
            <View className="mb-6 mt-4 p-4">
                <Text variant="h3">Search</Text>
            </View>
        </ScrollView>
    );
}
