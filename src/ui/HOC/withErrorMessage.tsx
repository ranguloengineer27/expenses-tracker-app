import type { ComponentType } from "react";

export function withErrorMessage<P extends object>(Component: ComponentType<P>) {
  const WrappedComponent = ({ error, ...props }: P & { error?: string|null }) => (
    <>
      <Component {...(props as P)} />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );

  WrappedComponent.displayName = `withErrorMessage(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
}