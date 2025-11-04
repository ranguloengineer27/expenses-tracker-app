import { useState } from "react";
import { Input } from "../utility-components/Input";
import { Button } from "../utility-components/Button";

type ProjectInputNameProps = {
    onCreate: (name: string) => void;
};

export const ProjectInputName = ({ onCreate }: ProjectInputNameProps) => {
    const [name, setName] = useState("");

    const submit = () => {
        if (!name.trim()) return;
        onCreate(name);
        setName("");
    };

    return (
        <>
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="New Project Name"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submit();
                    }
                }}
            />
            <Button
                className="mt-2"
                onClick={submit}
            >
                Create
            </Button>
        </>
    );
};


