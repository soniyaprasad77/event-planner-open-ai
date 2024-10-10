import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
const EventCoverCard = ({ events, eventId }) => {
  console.log(events);
  return (
    <>
      <div className="w-full relative">
        <div
          className="w-full absolute inset-0 bg-cover bg-repeat filter blur-sm"
          style={{
            backgroundImage: `url(${`${events[eventId - 1].image
              }`})`,
          }}
        ></div>
        <div className="flex justify-center relative z-10 bg-white sm:mx-16 sm:mt-3 sm:mb-6 rounded-xl">
          <div className="hidden md:block w-1/2 bg-white my-4 ml-4 rounded-l-xl">
            <div className="h-1/2">
              <h1 className=" text-3xl font-extrabold pt-4">
                {events[eventId - 1].name}
              </h1>
            </div>

            <div className="h-1/2">
              <div className="h-1/2">
                <span className="text-gray-600 text-xs">
                  <DateRangeIcon />
                </span>
                <span className="text-xs text-gray-600">
                  {" "}
                  {events[eventId - 1].timeline.start}
                </span>
                <span className="text-xs text-gray-600"> - </span>
                <span className="text-xs text-gray-600">
                  {" "}
                  {events[eventId - 1].timeline.end}
                </span>
              </div>
              <div className="h-1/2">
                <a
                  href="#generate-plan"
                  className="inline-flex items-center text-sm font-medium text-center rounded-lg text-gray-600 hover:text-black"
                >
                  Generate Plan
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
                </a>
              </div>
            </div>
            {/* Your content here */}
          </div>
          <div className="w-full ml-[-2.5rem] md:ml-0 md:w-1/2 sm:h-16 md:h-64 flex justify-center relative sm:m-1">
            <img
              src={`${events[eventId - 1].image}`}
              alt="Event Image"
              className="object-cover max-w-full max-h-full rounded-lg mr-[-2rem]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCoverCard;
