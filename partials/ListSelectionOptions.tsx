import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import {
    ArrowDownTrayIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    InformationCircleIcon,
    PencilSquareIcon,
    ScissorsIcon,
    Square2StackIcon,
    TrashIcon,
    UsersIcon,
} from "react-native-heroicons/outline";
import Text, { TextThemed } from "../components/Text";
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from "react-native-popup-menu";
import Animated, {
    FadeOutUp,
    FadeInUp,
    LinearTransition,
} from "react-native-reanimated";

type options = "download" | "delete";

interface ListSelectionOptionsProps {
    title: string;
    onOptionSelect?(value: options): void;
}

export default function ListSelectionOptions(props: ListSelectionOptionsProps) {
    const theme = useTheme();

    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            layout={LinearTransition}
            className="flex-row items-center gap-x-4 p-4 py-0"
        >
            <RectButton>
                <View
                    style={{ backgroundColor: theme.colors.text }}
                    className="flex-row items-center justify-center gap-x-4 px-4 py-2"
                >
                    <Text color="background">Share selected</Text>
                    <ChevronDownIcon
                        size={18}
                        color={theme.colors.background}
                    />
                </View>
            </RectButton>
            <Menu onSelect={(value) => props.onOptionSelect?.(value)}>
                <MenuTrigger
                    customStyles={{
                        TriggerTouchableComponent: RectButton,
                    }}
                >
                    <View className="p-2">
                        <EllipsisHorizontalIcon
                            size={24}
                            color={theme.colors.text}
                        />
                    </View>
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        OptionTouchableComponent: RectButton,
                        optionWrapper: {
                            flexDirection: "row",
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            alignItems: "center",
                            columnGap: 16,
                        },
                        optionsContainer: {
                            backgroundColor: theme.colors.card,
                            borderColor: theme.colors.border,
                            borderWidth: 1,
                            borderRadius: 8,
                        },
                    }}
                >
                    <View className="border-b border-neutral-700 p-4 py-2.5">
                        <TextThemed
                            variant="h5"
                            theme={theme}
                        >
                            {props.title}
                        </TextThemed>
                    </View>
                    <MenuOption>
                        <ArrowDownTrayIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>Download</TextThemed>
                    </MenuOption>
                    <MenuOption>
                        <UsersIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>Manage access</TextThemed>
                        <ChevronRightIcon
                            size={16}
                            color={theme.colors.text}
                            style={{ marginStart: "auto" }}
                        />
                    </MenuOption>
                    <View className="border-b border-neutral-700" />
                    <MenuOption>
                        <PencilSquareIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>Rename</TextThemed>
                    </MenuOption>
                    <MenuOption>
                        <Square2StackIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>Copy</TextThemed>
                    </MenuOption>
                    <MenuOption>
                        <ScissorsIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>Move</TextThemed>
                    </MenuOption>
                    <MenuOption value="delete">
                        <TrashIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>Delete</TextThemed>
                    </MenuOption>
                    <View className="border-b border-neutral-700" />
                    <MenuOption>
                        <InformationCircleIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <TextThemed theme={theme}>Info</TextThemed>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </Animated.View>
    );
}
