import { ScrollView, View } from "react-native";
import { Field, Input, Label } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import api from "../services/axios";
import Text from "../components/Text";
import { Link } from "@react-navigation/native";
import store from "../stores";

export default function RegisterPage() {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        password2: "",
    });
    const [isPending, setIsPending] = useState(false);
    const [formStateErr, setFormStateErr] = useState({
        email: [] as string[],
        password: [] as string[],
        password2: [] as string[],
    });
    const [err, setErr] = useState("");

    const submit = async () => {
        setIsPending(true);
        setErr("");
        setFormStateErr({
            email: [],
            password: [],
            password2: [],
        });

        if (formState.password !== formState.password2) {
            setFormStateErr((prev) => ({
                ...prev,
                password2: ["Passwords do not match."],
            }));
            setIsPending(false);
            return;
        }

        try {
            const { email, password } = formState;
            const { data: userData } = await api.post("/users", { email, password });
            const { data: tokenData } = await api.post("/token", {
                email: formState.email,
                password: formState.password,
            });
            store.auth.login(
                {
                    id: userData.id,
                    email: userData.email,
                    is_active: userData.is_active,
                },
                {
                    accessToken: tokenData.access_token,
                    refreshToken: tokenData.refresh_token,
                    tokenType: tokenData.token_type,
                }
            );
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
                <Text variant="h3">Create an account</Text>
                {err && <Text>{err}</Text>}
            </View>
            <Field errors={formStateErr.email}>
                <Label>Email address</Label>
                <Input
                    onInput={(email) =>
                        setFormState((prevState) => ({ ...prevState, email }))
                    }
                    type="email-address"
                />
            </Field>
            <View className="-mt-4 flex-row items-center">
                <View className="flex-1">
                    <Field errors={formStateErr.password}>
                        <Label>Password</Label>
                        <Input
                            onInput={(password) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    password,
                                }))
                            }
                            secure
                        />
                    </Field>
                </View>
                <View className="flex-1">
                    <Field errors={formStateErr.password2}>
                        <Label>Re-type password</Label>
                        <Input
                            onInput={(password2) =>
                                setFormState((prevState) => ({
                                    ...prevState,
                                    password2,
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
                    Create account
                </Button>
            </View>
            <View className="flex-col gap-y-4 px-4">
                <Link
                    screen="Reset"
                    params={{}}
                >
                    <Text color="primary">Sign in with SSO</Text>
                </Link>
                <Text>
                    Already have an account?&nbsp;
                    <Link
                        screen="Register"
                        params={{}}
                    >
                        <Text color="primary">Login</Text>
                    </Link>
                </Text>
                <Text>
                    Forgot your password?&nbsp;
                    <Link
                        screen="Reset"
                        params={{}}
                    >
                        <Text color="primary">Reset it</Text>
                    </Link>
                </Text>
            </View>
        </ScrollView>
    );
}
