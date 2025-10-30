import type { ComponentType } from "react";
import Loader from "../components/utility-components/Loader";

export function withLoader<P extends object>(Component: ComponentType<P>) {
    const WrappedComponent = ({ isLoading, ...props }: P & { isLoading: boolean }) => {
        if (isLoading) return <Loader />;
        return <Component {...(props as P)} />;
    };

    WrappedComponent.displayName = `withLoader(${Component.displayName || Component.name || "Component"})`;

    return WrappedComponent;
}