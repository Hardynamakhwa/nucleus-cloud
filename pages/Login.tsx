import { Text, View } from "react-native";
import { Field, Input, Label } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import api from "../services/axios";
import { AxiosError } from "axios";
import store from "../stores";

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
        <View>
            <Text>Login Page</Text>
            {err && <Text>{err}</Text>}
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
            <Button onTap={onLogin}>Sign In</Button>
        </View>
    );
}
