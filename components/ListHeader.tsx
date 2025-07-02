import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { Bars2Icon } from "react-native-heroicons/outline";
import Checkbox from "./Checkbox";
import PopupMenu from "./PopupMenu";
import { TextThemed } from "./Text";

export default function ListHeader() {
    const theme = useTheme();
    return (
        <View className="mb-4 flex-row items-center justify-between px-4">
            <View className="flex-row items-center gap-x-3">
                <Checkbox />
                <TextThemed theme={theme}>Name</TextThemed>
            </View>
            <View>
                <PopupMenu
                    items={[
                        {
                            label: "Sort by name",
                            value: "sort-name",
                            icon: Bars2Icon,
                        },
                        {
                            label: "Sort by date",
                            value: "sort-date",
                            icon: Bars2Icon,
                        },
                    ]}
                >
                    <Bars2Icon
                        size={24}
                        color={theme.colors.text}
                    />
                </PopupMenu>
            </View>
        </View>
    );
}
