// hooks
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// components
import Sidebar from "./Sidebar/Sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Body = ({ iframeRef, proxyUrl, commentEnabled }) => {
  // hooks
  const location = useLocation();
  const timeoutRef = useRef(null);

  // states
  const isDashboard = location.pathname.includes("/dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // functions
  useEffect(() => {
    if (!proxyUrl) return;

    setIsLoading(true);
    setHasError(false);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
    }, 15000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [proxyUrl]);

  const retryIframe = () => {
    if (!iframeRef?.current) return;

    setIsLoading(true);
    setHasError(false);

    iframeRef.current.src = proxyUrl;

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setHasError(true);
    }, 15000);
  };

  return (
    <div className="w-full flex-1 min-h-0 flex px-3 pb-3 bg-background overflow-hidden">
      <div className="w-full flex-1 min-h-0 flex bg-white rounded-2xl border border-border overflow-hidden">
        {/* MAIN AREA */}
        <div className="flex-1 min-h-0 flex flex-col bg-white">
          {/* COMMENT MODE BANNER */}
          {commentEnabled && (
            <div className="w-full bg-primary flex items-center justify-center py-1">
              <span className="text-xs text-white">
                Click anywhere on the screen to give feedback
              </span>
            </div>
          )}

          {/* IFRAME VIEWPORT */}
          <div className="flex-1 min-h-0 relative overflow-hidden">
            {/* LOADER */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
                  <span className="text-sm text-secondary">
                    Loading review surface...
                  </span>
                </div>
              </div>
            )}

            {/* ERROR */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="text-center max-w-md">
                  <p className="text-lg font-semibold">
                    Failed to load website
                  </p>

                  <p className="text-sm text-secondary mt-1">
                    The portfolio might be blocking embeds, is slow, or
                    temporarily unreachable.
                  </p>

                  <Button
                    className="mt-4 px-6 bg-primary h-10 rounded-full text-sm cursor-pointer hover:bg-primary"
                    onClick={retryIframe}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* IFRAME */}
            {proxyUrl && (
              <iframe
                ref={iframeRef}
                src={proxyUrl}
                title="Review"
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals allow-downloads"
                onLoad={() => {
                  setIsLoading(false);
                  setHasError(false);

                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                }}
                style={{
                  opacity: isLoading ? 0 : 1,
                  transition: "opacity 0.25s ease",
                }}
              />
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        {isDashboard && (
          <>
            <Separator orientation="vertical" />
            <Sidebar />
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
