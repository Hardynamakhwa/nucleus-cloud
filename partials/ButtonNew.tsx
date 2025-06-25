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
import {
    FolderOpenIcon,
    FolderPlusIcon,
    PlusIcon,
    DocumentPlusIcon,
} from "react-native-heroicons/outline";

export default function ButtonNew() {
    const theme = useTheme();
    return (
        <Menu>
            <MenuTrigger>
                <RectButton>
                    <View
                        style={{ borderColor: theme.colors.text }}
                        className="flex-row items-center gap-x-3 rounded-full border p-2 px-5"
                    >
                        <PlusIcon
                            size={18}
                            color={theme.colors.text}
                        />
                        <TextThemed
                            theme={theme}
                            color="secondary"
                        >
                            Create
                        </TextThemed>
                    </View>
                </RectButton>
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsContainer: {
                        backgroundColor: theme.colors.card,
                    },
                    optionWrapper: {
                        padding: 16,
                        paddingVertical: 10,
                        flexDirection: "row",
                        columnGap: 16,
                        alignItems: "center",
                    },
                    OptionTouchableComponent: RectButton,
                }}
            >
                <MenuOption>
                    <FolderPlusIcon
                        size={24}
                        color={theme.colors.text}
                    />
                    <TextThemed theme={theme}>Folder</TextThemed>
                </MenuOption>
                <MenuOption>
                    <FolderOpenIcon
                        size={24}
                        color={theme.colors.text}
                    />
                    <TextThemed theme={theme}>Shared Folder</TextThemed>
                </MenuOption>
                <MenuOption>
                    <DocumentPlusIcon
                        size={24}
                        color={theme.colors.text}
                    />
                    <TextThemed theme={theme}>Document</TextThemed>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
}
