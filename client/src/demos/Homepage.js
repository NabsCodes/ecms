import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Preview from "demos/Previews.js";
import Footer from "demos/Footer.js";
import Hero1 from "demos/BackgroundAsImage"
import Features from "demos/Features"
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
import tw from "twin.macro";


export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-green-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;
  return (
    <AnimationRevealPage>
      {/* <Hero /> */}
      <Hero1 />
      <Features />
      <Preview
        subheading={<Subheading>A Reputed Brand</Subheading>}
        heading={<>Meet The <HighlightedText>Director</HighlightedText></>}
        statistics={[
          {
            key: "Date : Time",
            value: "Thurdays: 10AM",
          }
        ]}

        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/3 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
      />
      <Footer />
    </AnimationRevealPage>
  )
};
