const Body = ({ iframeRef, proxyUrl, commentEnabled }) => {
  return (
    <div className="w-full flex-1 flex px-3 pb-3 bg-background overflow-auto">
      <div className="w-full flex-1 bg-white rounded-2xl border border-border overflow-hidden">
        {commentEnabled && (
          <div className="w-full bg-primary rounded-t-2xl flex items-center justify-center py-1">
            <span className="text-xs text-white">
              Click anywhere on the screen to give feedback
            </span>
          </div>
        )}

        {proxyUrl && (
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            src={proxyUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals"
            title="Review"
          />
        )}
      </div>
    </div>
  );
};

export default Body;
