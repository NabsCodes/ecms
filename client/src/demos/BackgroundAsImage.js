import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";

import Header, {
  NavLink,
  NavLinks,
  PrimaryLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../components/headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url("https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/nurse-helping-patient.jpeg");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const Heading = styled.h3`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-700 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-gray-700 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 text-gray-100 font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;

export default () => {
  const navLinks = [
    <NavLinks key={1}>
      <NavLink
        style={{ color: "green", fontWeight: "700", textDecoration: "none" }}
        href="#home"
      >
        Home
      </NavLink>
      <NavLink
        href="#about"
        style={{ color: "green", fontWeight: "700", textDecoration: "none" }}
      >
        About
      </NavLink>
      <NavLink
        href="#services"
        style={{ color: "green", fontWeight: "700", textDecoration: "none" }}
      >
        Services
      </NavLink>
      <NavLink
        href="#contact"
        style={{ color: "green", fontWeight: "700", textDecoration: "none" }}
      >
        Contact
      </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink
        as={Link}
        to="/login"
        style={{ background: "rgb(37, 160, 92)" }}
      >
        Sign In
      </PrimaryLink>
    </NavLinks>,
  ];

  return (
    <Container id="home">
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            <Heading>
              <span>Retirement Living </span>
              <br />
              <SlantedBackground>With Comfort.</SlantedBackground>
            </Heading>
            <Link to={"/login"}>
              <PrimaryAction style={{ background: "rgb(37, 160, 92)" }}>
                Get Started
              </PrimaryAction>
            </Link>
          </LeftColumn>
          <RightColumn></RightColumn>
        </TwoColumn>
      </HeroContainer>
    </Container>
  );
};
