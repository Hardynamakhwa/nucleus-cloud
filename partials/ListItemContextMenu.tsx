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
                <Option
                    onSelect={onSelect}
                    value={"add-to-favourites"}
                    label="Add To Favourites"
                />
                <Option
                    onSelect={onSelect}
                    value={"get-link"}
                    label="Get Link"
                />
                <Option
                    onSelect={onSelect}
                    value={"download"}
                    label="Download"
                />
                <Option
                    onSelect={onSelect}
                    value={"make-available-offline"}
                    label="Make Available Offline"
                />
                <Option
                    onSelect={onSelect}
                    value={"share"}
                    label="Share"
                />
                <Option
                    onSelect={onSelect}
                    value={"manage-permissions"}
                    label="Manage Permission"
                />
                <View className="border-b border-border my-2" />
                <Option
                    onSelect={onSelect}
                    value={"rename"}
                    label="Rename"
                />
                <Option
                    onSelect={onSelect}
                    value={"copy"}
                    label="Copy"
                />
                <Option
                    onSelect={onSelect}
                    value={"move"}
                    label="Move"
                />
                <Option
                    onSelect={onSelect}
                    value={"move-to-trash"}
                    label="Move To Trash"
                />
                <View className="border-b border-border my-2" />
                <Option
                    onSelect={onSelect}
                    value={"info"}
                    label="Info"
                />
            </BottomSheetView>
        </BottomSheet>
    );
}

function Option({
    onSelect,
    label,
    value,
}: {
    onSelect(value: string): void;
    label: string;
    value: string;
}) {
    return (
        <RectButton onPress={() => onSelect(value)}>
            <View className="p-4">
                <Text variant="label">{label}</Text>
            </View>
        </RectButton>
    );
}
