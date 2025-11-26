import { withErrorMessage } from "@/ui/HOC/withErrorMessage";
import { Input } from "../utility-components/Input";
import { FC, useState } from "react";
import { useDebounce } from "@/ui/hooks/shared/useDebounce";
import { fetchProfileByName } from "@/api/adapters/profile";

const InputWithErrorMessage = withErrorMessage(Input);

type Props = {
    className?: string
    name: string;
    setName: (name:string) => void;
    error?:string|null;
    nameExists: boolean;
    setNameExists: (nameExists:boolean) => void;
}

export const InputQueryProfiles:FC<Props> = ({ name, setName, className, error = null, nameExists, setNameExists }) => {
    const checkForProfileName = useDebounce(async(nm) => {
        const data = await fetchProfileByName(nm);
        if(data?.length) {
            setNameExists(true);
            return;
        }

        if(nameExists) {
            setNameExists(false);
        }
    }, 1500);

    return (
        <InputWithErrorMessage
            value={name}
            onChange={(e) => {
                const newVale = e.target.value;
                setName(newVale);
                checkForProfileName(newVale);
            }}
            className={className}
            error={error}
        />
    )
}