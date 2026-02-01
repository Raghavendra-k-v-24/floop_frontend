// hooks
import { motion } from "framer-motion";
import { useState } from "react";
import { api } from "@/api";
import { useEffect } from "react";

// components
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import EmptyPlaceholder from "./EmptyPlaceholder";
import Card from "./Card";
import Sidebar from "./Sidebar/Sidebar";

const Received = () => {
  // states
  const [allReviews, setallReviews] = useState([]);
  const latestReviews = allReviews.slice(0, 5);

  // functions
  useEffect(() => {
    const getReviews = async () => {
      const response = await api.get("/api/review?type=received");
      setallReviews(response.data.reviews);
    };
    getReviews();
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="flex-1 flex flex-col gap-8 p-10 overflow-auto">
        <span className="w-full flex justify-between items-center">
          <h1 className="text-lg text-black font-semibold">
            Received Feedbacks
          </h1>
          <Button
            className="w-40 h-10 text-xs text-white rounded-full cursor-pointer bg-[radial-gradient(circle_at_bottom_right,#FF8030_0%,#383BFE_60%)]"
            type="button"
          >
            Share your website
          </Button>
        </span>
        <div className="w-full h-max flex flex-col gap-3">
          <h1 className="text-md text-black">Recently shared for review</h1>
          {latestReviews.length > 0 ? (
            <div className="w-full grid grid-cols-4 gap-10">
              {latestReviews.map((review, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card review={review} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder
              message={
                <>
                  Your recent website/portfolio links that you share <br /> with
                  others will be shown here
                </>
              }
            />
          )}
        </div>
        <div className="w-full h-max flex flex-col gap-3">
          <h1 className="text-md text-black">All received feedbacks</h1>
          {allReviews.length > 0 ? (
            <div className="w-full grid grid-cols-4 gap-10">
              {allReviews.map((review, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card review={review} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyPlaceholder
              message={
                <>
                  List of all the feedbacks you have received <br />
                  will be showed here
                </>
              }
            />
          )}
        </div>
      </div>
      <Separator orientation="vertical" />
      <Sidebar />
    </div>
  );
};

export default Received;
