import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from "react-native-popup-menu";
import { TextThemed } from "../components/Text";
import { ArrowUpTrayIcon } from "react-native-heroicons/outline";

export default function ButtonUpload() {
    const theme = useTheme();
    return (
        <Menu>
            <MenuTrigger
                customStyles={{ TriggerTouchableComponent: RectButton }}
            >
                <View
                    style={{ backgroundColor: theme.colors.text }}
                    className="flex-row items-center gap-x-3 rounded-full p-2 px-5"
                >
                    <ArrowUpTrayIcon
                        size={18}
                        color={theme.colors.background}
                    />
                    <TextThemed
                        theme={theme}
                        color="background"
                    >
                        Upload
                    </TextThemed>
                </View>
            </MenuTrigger>

            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: theme.colors.card,
                    },
                    optionWrapper: {
                        padding: 16,
                        paddingVertical: 10,
                    },
                    OptionTouchableComponent: RectButton,
                }}
            >
                <MenuOption>
                    <TextThemed theme={theme}>Folder</TextThemed>
                </MenuOption>
                <MenuOption>
                    <TextThemed theme={theme}>Shared Folder</TextThemed>
                </MenuOption>
                <MenuOption>
                    <TextThemed theme={theme}>Document</TextThemed>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
}
