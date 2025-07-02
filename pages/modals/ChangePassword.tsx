import { ScrollView, View } from "react-native";
import { Field, Input, Label } from "../../components/Input";
import { useState } from "react";
import { Button } from "../../components/Button";
import api from "../../services/axios";
import Text from "../../components/Text";
import { useNavigation } from "@react-navigation/native";

export default function ChangePasswordPage() {
    const navigation = useNavigation();
    const [formState, setFormState] = useState({
        old_password: "",
        new_password: "",
        new_password2: "",
    });
    const [isPending, setIsPending] = useState(false);
    const [formStateErr, setFormStateErr] = useState({
        old_password: [] as string[],
        new_password: [] as string[],
        new_password2: [] as string[],
    });
    const [err, setErr] = useState("");

    const submit = async () => {
        setIsPending(true);
        setErr("");
        setFormStateErr({
            old_password: [],
            new_password: [],
            new_password2: [],
        });

        if (formState.new_password !== formState.new_password2) {
            setFormStateErr((prev) => ({
                ...prev,
                new_password2: ["Passwords do not match."],
            }));
            setIsPending(false);
            return;
        }

        try {
            const { old_password, new_password } = formState;
            await api.post("/users/me/change-password", { old_password, new_password });
            navigation.goBack();
        } catch (e) {
            switch (e.status) {
                case 401:
                    setErr(e.response.data.detail);
                    break;
                case 422:
                    e.response.data.detail.forEach((err) => {
                        setFormStateErr((prevState) => ({
                            ...prevState,
                            [err.loc[1]]: [err.ctx.reason],
                        }));
                    });
                    break;
            }
        } finally {
            setIsPending(false);
        }
    };

    return (
        <ScrollView>
            <View className="mb-6 mt-4 p-4">
                <Text variant="h3">Change Password</Text>
                {err && <Text>{err}</Text>}
            </View>
            <Field errors={formStateErr.old_password}>
                <Label>Old Password</Label>
                <Input
                    onInput={(old_password) =>
                        setFormState((prevState) => ({ ...prevState, old_password }))
                    }
                    secure
                />
            </Field>
            <View className="-mt-4 flex-row items-center">
                <View className="flex-1">
                    <Field errors={formStateErr.new_password}>
                        <Label>New Password</Label>
                        <Input
                            onInput={(new_password) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    new_password,
                                }))
                            }
                            secure
                        />
                    </Field>
                </View>
                <View className="flex-1">
                    <Field errors={formStateErr.new_password2}>
                        <Label>Re-type new password</Label>
                        <Input
                            onInput={(new_password2) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    new_password2,
                                }))
                            }
                            secure
                        />
                    </Field>
                </View>
            </View>
            <View className="mb-6 p-4">
                <Button
                    loading={isPending}
                    disabled={isPending}
                    onTap={submit}
                >
                    Change Password
                </Button>
            </View>
        </ScrollView>
    );
}
