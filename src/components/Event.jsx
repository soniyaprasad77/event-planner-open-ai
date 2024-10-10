import React, { useState } from "react";
import { Link } from "react-router-dom";

const Event = ({ props }) => {
  const [expandedMap, setExpandedMap] = useState({});

  const toggleExpanded = (eventId) => {
    setExpandedMap((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  const collapseAll = () => {
    setExpandedMap({});
  };

  console.log(props);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:mx-16 my-6`}
    >
      {props.map((event) => (
        <div
          key={event.id}
          className="max-w-sm border border-gray-200 rounded-lg shadow relative transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#23f2dd85] hover:cursor-pointer"
        >
          <Link to={"/events/" + event?.id}>
            <div>
              <img
                className="rounded-t-lg"
                src={`${event.image}`}
                alt=""

              />
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {event.name}
                </h5>
              <div className="mb-6 font-normal text-gray-700">
                {expandedMap[event.id]
                  ? event.description
                  : event.description.length > 100
                    ? event.description.substring(0, 100) + "..."
                    : event.description}

                <div className="flex flex-wrap justify-between items-center">
                  <span className="text-gray-800 font-bold">
                    Start Date: {event.timeline.start}
                  </span>
                  <span className="text-gray-800 font-bold ">
                    End Date: {event.timeline.end}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <div className="absolute bottom-1">
            {!expandedMap[event.id] ? (
              <button
                onClick={() => toggleExpanded(event.id)}
                className="inline-flex items-center px-3 py-2 ml-3 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700  "
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => toggleExpanded(event.id)}
                className="inline-flex items-center px-3 py-2 ml-3 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 "
              >
                Read less
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Event;
