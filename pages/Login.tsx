import { ScrollView, View } from "react-native";
import { Field, Input, Label } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import api from "../services/axios";
import { AxiosError } from "axios";
import store from "../stores";
import Text from "../components/Text";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const [formStateErr, setFormStateErr] = useState({
        email: [] as string[],
        password: [] as string[],
    });
    const [err, setErr] = useState("");

    const onLogin = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.post("/token", formState);
            store.auth.login(
                { email: formState.email },
                { accessToken: data.access_token, tokenType: data.token_type }
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
            setIsLoading(false);
        }
    };

    return (
        <ScrollView>
            <View className="mb-6 p-4">
                <Text variant="h3">Sign In</Text>
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
            <View className="mb-6 p-4">
                <Button
                    onTap={onLogin}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Sign In
                </Button>
            </View>
        </ScrollView>
    );
}
