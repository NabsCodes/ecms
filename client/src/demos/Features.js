import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob3 } from "../images/svg-decorator-blob-3.svg";

import { GrSchedulePlay, GrCertificate } from "react-icons/gr";
import { GiHealthDecrease } from "react-icons/gi";
import { BiPhoneCall } from "react-icons/bi";


const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/4 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-green-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-green-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-green-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default () => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component):
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const cards = [
    { imageSrc: <GiHealthDecrease size={38} />, title: "Proper Health Care" },
    { imageSrc: <GrCertificate size={38} />, title: "Certified Care-givers" },
    { imageSrc: <GrSchedulePlay size={38} />, title: "Online Appointment" },
    { imageSrc: <BiPhoneCall size={38} />, title: "Call Center" },
  ];

  return (
    <Container id="services" >
      <ThreeColumnContainer>
        <Heading>Our Care <span tw="text-green-500">Services</span></Heading>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                {card.imageSrc}
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>

              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
