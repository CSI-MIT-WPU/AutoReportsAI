import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Footer = () => {
    return (
        <section className="footer mx-5 md:mx-20 text-primary">
            <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 my-10">
                <div className="leftSide grid grid-cols-4 space-x-5">
                    <div className="logo font-playFair font-bold tracking-wide text-xl">
                        AutoReportsAI
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-semibold">About Us</span>
                        <Link href="/" className="font-light text-sm">
                            Home
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            Products
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            Services
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            Contact
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            FAQ
                        </Link>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="font-semibold">Blog</span>
                        <Link href="/" className="font-light text-sm">
                            Support
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            Terms
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            Privacy
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            Cookies
                        </Link>
                        <Link href="/" className="font-light text-sm">
                            Sitemap
                        </Link>
                    </div>
                    {/* <div className="flex flex-col space-y-1">
                        <span className="font-semibold">Careers</span>
                        <Link href="/" className="font-light text-sm">
                        Press
                        </Link>
                        <Link href="/" className="font-light text-sm">
                        Partners
                        </Link>
                        <Link href="/" className="font-light text-sm">
                        Investors
                        </Link>
                        <Link href="/" className="font-light text-sm">
                        Events
                        </Link>
                        <Link href="/" className="font-light text-sm">
                        Resources
                        </Link>
                    </div> */}
                </div>
                <div className="hidden rightSide lg:flex flex-col space-y-3">
                    <div className="font-semibold">Subscribe</div>
                    <p className="text-sm font-light">
                        Stay updated with our latest features and releases
                    </p>
                    <form>
                        <div className="newsletterContainer flex w-100 justify-between">
                            <Input
                                type="email"
                                name="newsEmail"
                                id="newsEmail"
                                className="py-2 px-2 text-sm text-udark w-full mx-5 border bg-ubg border-udark"
                            />
                            <Button
                                // type="submit"
                                className="w-fit py-2 px-4 border border-udark"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </form>
                    <p className="text-sm font-light">
                        By subscribing, you agree to our Privacy Policy and consent to
                        receive updates from our company.
                    </p>
                </div>
            </div>
            <hr className="border border-umedium my-2" />
            <div className="flex justify-between text-xs md:text-sm">
                <div className="leftSide flex mt-2 mb-5">
                    <div>AutoReportsAI. All rights reserved.</div>
                    <div className="flex space-x-3 mx-5">
                        <Link href="/">Privacy Policy</Link>
                        <Link href="/">Terms of service</Link>
                        <Link href="/">Cookies Settings</Link>
                    </div>
                </div>
                <div className="rightSide flex space-x-1 my-auto">
                    {/* <img src={linkedinsvg} alt="" />
          <img src={facebooksvg} alt="" />
          <img src={twittersvg} alt="" /> */}
                    {/* <LinkedinIcon /> */}
                </div>
            </div>
        </section>
    );
};

export default Footer;
