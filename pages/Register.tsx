import { ScrollView, View } from "react-native";
import { Field, Input, Label } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import api from "../services/axios";
import Text from "../components/Text";
import { Link } from "@react-navigation/native";

export default function RegisterPage() {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        password2: "",
    });
    const [isPending, setIsPending] = useState(false);

    const submit = async () => {
        setIsPending(true);
        try {
            const { data } = await api.post("/users", formState);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <ScrollView>
            <View className="mb-6 mt-4 p-4">
                <Text variant="h3">Create an account</Text>
            </View>
            <Field>
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
                    <Field>
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
                    <Field>
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
