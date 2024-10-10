import React from "react";

const TeamMember = ({ Name, Role, Linkedin, Github, image }) => {
  return (
    <>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <img
          className="mx-auto mb-4 w-36 h-36 rounded-full"
          src={image}
          alt="User Avatar"
        />
        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
          <a href="#">{Name}</a>
        </h3>
        <p>{Role}</p>
        <ul className="flex justify-center mt-4 space-x-1">
          <li>
            <a
              target="_blank"
              href={Linkedin}
              className="text-[#00acee] hover:text-gray-700 "
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.508c0-1.313-.026-3.004-1.83-3.004-1.831 0-2.111 1.432-2.111 2.911v5.601h-3.555v-11.31h3.414v1.545h.049c.476-.9 1.637-1.847 3.369-1.847 3.602 0 4.267 2.368 4.267 5.451v6.161zm-14.896-12.66c-1.148 0-2.078-.931-2.078-2.078 0-1.148.93-2.078 2.078-2.078 1.146 0 2.078.93 2.078 2.078 0 1.147-.931 2.078-2.078 2.078zm1.777 12.66h-3.555v-11.31h3.555v11.31zm16.672-20.452h-24v24h24v-24z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href={Linkedin}
              className="text-gray-900 hover:text-gray-700"
            ></a>
          </li>

          <li>
            <a
              target="_blank"
              href={Github}
              className="text-gray-900 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TeamMember;
