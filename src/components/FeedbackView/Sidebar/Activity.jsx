// images or icons
import Bell from "@/assets/bell.svg";

// hooks
import { api } from "@/api";
import { useEffect } from "react";
import { useState } from "react";

// components
import {
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
} from "flowbite-react";

const Activity = () => {
  // states
  const [allActivity, setallActivity] = useState({});

  // constants
  const accessToken = window.location.pathname.split("/").pop();
  const hasActivity = Object.values(allActivity).some((a) => a.length);

  const groupLabels = {
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This week",
    earlier: "Earlier",
  };

  // functions
  useEffect(() => {
    const getActivity = async () => {
      const response = await api.get(`/api/review/${accessToken}/activity`);
      setallActivity(response.data);
    };
    getActivity();
  }, [accessToken]);

  return (
    <div className="w-full h-max flex flex-col gap-3">
      <span className="w-full flex justify-between items-center">
        <h1 className="text-lg text-black font-semibold">Activity</h1>
        <img src={Bell} alt="Comment" className="w-5 h-5" />
      </span>
      <div className="w-full h-60 flex justify-center overflow-auto">
        {hasActivity ? (
          <Timeline
            className="w-full flex flex-col gap-0"
            theme={{
              item: {
                point: {
                  line: "h-0.5 w-full bg-primary flex",
                  marker: {
                    base: {
                      vertical:
                        "absolute -left-1.5 mt-1.5 h-2.5 w-2.5 rounded-full border border-black bg-primary",
                    },
                  },
                },
              },
            }}
          >
            {Object.entries(allActivity)
              .filter(([_, items]) => items.length > 0)
              .map(([groupKey, items]) => (
                <TimelineItem key={groupKey}>
                  <TimelinePoint />
                  <TimelineContent>
                    <TimelineTime>{groupLabels[groupKey]}</TimelineTime>
                    {items.map((activity, index) => {
                      const time = new Date(
                        activity.createdAt,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                      return (
                        <TimelineBody
                          key={`${activity.createdAt}-${index}`}
                          className="text-xs mt-2 flex flex-col"
                        >
                          <span className="text-secondary mr-2">{time}</span>
                          {activity.message}
                        </TimelineBody>
                      );
                    })}
                  </TimelineContent>
                </TimelineItem>
              ))}
          </Timeline>
        ) : (
          <h1 className="text-sm text-secondary font-semibold flex-1 flex items-center">
            No activity
          </h1>
        )}
      </div>
    </div>
  );
};

export default Activity;
