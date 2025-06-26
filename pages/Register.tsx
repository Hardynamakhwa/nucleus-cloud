import { ScrollView } from "react-native";
import useForm from "../hooks/useForm";
import { Field, Input, Label } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import api from "../services/axios";

export default function RegisterPage() {
    const { subscribe, form } = useForm();
    const [isPending, setIsPending] = useState(false);

    const submit = async () => {
        setIsPending(true);
        try {
            const { data } = await api.post("/users", form);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <ScrollView>
            <Field>
                <Label>Email address</Label>
                <Input
                    {...subscribe("email", "")}
                    type="email-address"
                />
            </Field>
            <Field>
                <Label>Password</Label>
                <Input
                    {...subscribe("password", "")}
                    secure
                />
            </Field>
            <Field>
                <Label>Password (Re-Type)</Label>
                <Input
                    {...subscribe("password2", "")}
                    secure
                />
            </Field>
            <Button
                loading={isPending}
                disabled={isPending}
                onTap={submit}
            >
                Create account
            </Button>
        </ScrollView>
    );
}
