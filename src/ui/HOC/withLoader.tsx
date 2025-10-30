import type { ComponentType } from "react";
import Loader from "../components/utility-components/Loader";

export const withLoader = <P extends object>(Component: ComponentType<P>) => {
    return ({ isLoading, ...props }: P & { isLoading: boolean }) => {
        return isLoading ? <Loader /> : <Component {...(props as P)} />;
    };
};
