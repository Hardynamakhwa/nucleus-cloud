import { FlatList, RefreshControl, Text, View } from "react-native";
interface ListProps {
    data: any[];
    loading?: boolean;
    refreshing?: boolean;
    onRefresh?(): void;
}

export default function List(props: ListProps) {
    const renderItem = () => {
        return (
            <View>
                <Text></Text>
            </View>
        );
    };
    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl
                    refreshing={!!props.refreshing}
                    onRefresh={props.onRefresh}
                />
            }
        />
    );
}
