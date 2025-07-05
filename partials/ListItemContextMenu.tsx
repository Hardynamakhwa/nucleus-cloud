import { ForwardedRef, useCallback } from "react";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import Text from "../components/Text";
import { useTheme } from "@react-navigation/native";
import { FolderUnionFile } from "./List";
import { View } from "react-native";
import dayjs from "dayjs";
import { RectButton } from "react-native-gesture-handler";
import { UsersIcon } from "react-native-heroicons/outline";

export default function ListItemContextMenu({
    ref,
    item,
    onSelect,
    onDismiss,
}: {
    ref: ForwardedRef<BottomSheet>;
    item: FolderUnionFile | null;
    onSelect(value: any): void;
    onDismiss(): void;
}) {
    const theme = useTheme();
    const date = dayjs(item?.createdAt).format("MMM DD ddd, YYYY");

    const renderBottomSheetBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
            />
        ),
        []
    );
    return (
        <BottomSheet
            ref={ref}
            backgroundStyle={{
                backgroundColor: theme.colors.card,
                borderRadius: 0,
            }}
            handleIndicatorStyle={{
                backgroundColor: theme.colors.text,
            }}
            enablePanDownToClose
            index={-1}
            onClose={onDismiss}
            backdropComponent={renderBottomSheetBackdrop}
        >
            <BottomSheetView>
                <View className="border-b border-border p-4 pt-0">
                    <Text variant="h2">{item?.name}</Text>
                    <Text>{date}</Text>
                </View>
                <RectButton onPress={() => onSelect("manage-permissions")}>
                    <View className="flex-row items-center gap-x-4 p-4">
                        <UsersIcon
                            size={20}
                            color={theme.colors.text}
                        />
                        <Text variant="label">Manage permissions</Text>
                    </View>
                </RectButton>
            </BottomSheetView>
        </BottomSheet>
    );
}
