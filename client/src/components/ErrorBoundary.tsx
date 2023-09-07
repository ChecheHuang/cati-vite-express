import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function MyErrorBoundary({ children }: { children: React.ReactNode }) {
  function fallbackRender({ error }: FallbackProps) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  }
  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default MyErrorBoundary;
