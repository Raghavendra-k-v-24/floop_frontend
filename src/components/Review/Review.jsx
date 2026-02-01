// hooks
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { api } from "@/api";

// components
import Body from "./Body";
import Header from "./Header";

const Review = () => {
  // hooks
  const { id: reviewId } = useParams();

  // states
  const iframeRef = useRef(null);
  const [proxyUrl, setProxyUrl] = useState(null);
  const [revieweeName, setRevieweeName] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState(null);
  const [commentEnabled, setCommentEnabled] = useState(false);

  // functions
  useEffect(() => {
    const getProxyUrl = async () => {
      const response = await api.get(`/api/review/${reviewId}/view`);
      const { proxyUrl, revieweeName, portfolioLink } = response.data;
      setProxyUrl(proxyUrl);
      setRevieweeName(revieweeName);
      setPortfolioLink(portfolioLink);
    };
    getProxyUrl();
  }, [reviewId]);

  const toggleComment = () => {
    const next = !commentEnabled;
    setCommentEnabled(next);

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "FLOOP_TOGGLE_COMMENT_MODE",
        enabled: next,
      },
      "*", // replace with your domain in prod
    );
  };
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <Header
        revieweeName={revieweeName}
        portfolioLink={portfolioLink}
        commentEnabled={commentEnabled}
        toggleComment={toggleComment}
      />
      <Body
        iframeRef={iframeRef}
        proxyUrl={proxyUrl}
        commentEnabled={commentEnabled}
      />
    </div>
  );
};

export default Review;
