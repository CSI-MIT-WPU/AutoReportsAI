/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="md:grid md:grid-cols-2 md:mx-12 lg:mx-24 text-udark my-24">
      <div className="leftSide mx-auto space-y-4 my-auto w-3/4">
        <div className="text-4xl font-bold">
          Start Growing Smarter with Hydrobud Today
        </div>
        <div className="text-sm font-light">
          Experience faster crop growth and effortless control with Hydrobud's
          smart hydroponic automation—perfect for anyone to grow fresh produce
          at home.
        </div>
        <div className="space-x-4">
          <Button> Contact </Button>
          <Button variant="outline"> Learn More </Button>
        </div>
      </div>
      <div className="hidden md:block rightSide mx-auto">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/hydrobud-427708.appspot.com/o/CTA1.jpeg?alt=media&token=13af97e0-532f-4f58-a296-c23178e5e45e"
          alt=""
          className="rounded-md"
        />
      </div>
    </section>
  );
};

export default CTA;
