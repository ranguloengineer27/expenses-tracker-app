import type { ComponentType } from "react";
import { Spinner } from "../components/utility-components/Spinner";

export function withLoader<P extends object>(Component: ComponentType<P>) {
  const WrappedComponent = ({
    isLoading,
    ...props
  }: P & { isLoading: boolean }) => {
    if (isLoading) return <Spinner />;
    return <Component {...(props as P)} />;
  };

  WrappedComponent.displayName = `withLoader(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
}
