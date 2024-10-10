import React from "react";
import TeamMember from "./TeamMember";
import deepesh from "../assets/TeamMemberPhotos/deepesh.jpg";
import priyansu from "../assets/TeamMemberPhotos/priyansu.jpg";
import soniya from "../assets/TeamMemberPhotos/Soniya.png";

const OurTeam = () => {
  return (
    <div>
      <section className="" id="our-team">
        <div className="flex justify-between py-8 pl-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6"></div>
        <div className="mx-auto mb-12 max-w-screen-sm lg:mb-16">
          <h2 className="primary-heading ">Our team</h2>
          <p className="primary-text ">Meet Our Team Members</p>
          <div className="grid gap-16 lg:gap-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <TeamMember
              Name="Deepesh Kalura"
              Role="Backend Developer"
              Linkedin="https://www.linkedin.com/in/deepeshkalura/"
              Github="https://github.com/DeepeshKalura/"
              image={deepesh}
            />
            <TeamMember
              Name="Priyansu Mohanty"
              Role="Frontend Developer"
              Github="https://github.com/Priyansu-17"
              Linkedin="https://www.linkedin.com/in/priyansu-mohanty-105551237/"
              image={priyansu}
            />
            <TeamMember
              Name="Soniya Prasad"
              Role="Frontend Developer"
              Github="https://www.github.com/soniyaprasad77/"
              Linkedin="https://www.linkedin.com/in/soniyaprasad77/"
              image={soniya}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
