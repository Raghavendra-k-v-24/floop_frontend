// images or icons
import Cursor from "@/assets/cursor_round.svg";

// hooks
import { api } from "@/api";
import { useEffect } from "react";
import { useState } from "react";

const Feedback = () => {
  // states
  const [allComments, setallComments] = useState([]);

  // constants
  const accessToken = window.location.pathname.split("/").pop();
  const hasComments = allComments.length > 0;

  // functions
  useEffect(() => {
    const getComments = async () => {
      const response = await api.get(`/api/review/${accessToken}/comments`);
      setallComments(response.data);
    };
    getComments();
  }, [accessToken]);

  console.log(allComments);
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <span className="w-full flex justify-between items-center">
        <h1 className="text-lg text-black font-semibold">Feedback</h1>
        <img src={Cursor} alt="Comment" className="w-5 h-5" />
      </span>
      <div className="w-full flex-1 min-h-0 items-center flex flex-col gap-3 overflow-auto">
        {hasComments ? (
          allComments.map((comment, index) => (
            <div
              className="relative w-full min-h-30 bg-background rounded-2xl border border-border p-3 flex flex-col gap-2"
              key={index}
            >
              <span className="text-xs text-secondary">
                Author: {comment.author}
              </span>
              <span className="text-sm text-primary">{comment.text}</span>
              <span className="text-xxs text-secondary absolute bottom-2 right-3 font-semibold">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <h1 className="text-sm text-secondary font-semibold flex-1 flex items-center">
            No feedback yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default Feedback;
