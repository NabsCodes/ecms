import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { Row, Col } from "reactstrap";
import { confirmed } from '../data/images';


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;


const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;


export default () => {


  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{"What to expect"}</Header>

        </HeaderRow>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <hr />
          {confirmed.map((image, index) => (
            <Col key={index} md={3} style={{ marginBottom: "10px" }}>
              <Card className="group" initial="rest" whileHover="hover" animate="rest">
                <CardImageContainer imageSrc={image} style={{ width: "100%" }}>
                </CardImageContainer>
                {/* <CardText>
                  <CardTitle>{card.type}</CardTitle>
                  <CardContent>{card.content}</CardContent>
                  <CardPrice>₦: {card.price.toLocaleString()}</CardPrice>
                  <CardButton onClick={() => { toggle(); setSelected(card) }}>Buy Now</CardButton>
                </CardText> */}
              </Card>
            </Col>
          ))}
        </Row>

      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />

    </Container >
  );
};

