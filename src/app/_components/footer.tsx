function Footer() {
  return (
    <div className="w-full flex flex-col py-16 px-40 space-y-5">
      <h3 className="font-semibold text-xl">AutoReportsAI</h3>

      <div className="flex justify-between items-center">
        <div className="font-semibold text-base space-y-1">
          <h4 className="">Product</h4>
          <p className="font-medium text-slate-500">Features</p>
          <p className="font-medium text-slate-500">Pricing</p>
          <p className="font-medium text-slate-500">Documentation</p>
          <p className="font-medium text-slate-500">API</p>
        </div>
        <div className="font-semibold text-base space-y-1">
          <h4 className="">Company</h4>
          <p className="font-medium text-slate-500">About Us</p>
          <p className="font-medium text-slate-500">Career</p>
          <p className="font-medium text-slate-500">Blog</p>
          <p className="font-medium text-slate-500">Press</p>
          <p className="font-medium text-slate-500">Partners</p>
        </div>
        <div className="font-semibold text-base space-y-1">
          <h4 className="">Resources</h4>
          <p className="font-medium text-slate-500">Community</p>
          <p className="font-medium text-slate-500">Contact</p>
          <p className="font-medium text-slate-500">Support</p>
          <p className="font-medium text-slate-500">Status</p>
        </div>
        <div className="font-semibold text-base space-y-1">
          <h4 className="">Socials</h4>
          <p className="font-medium text-slate-500">Twitter</p>
          <p className="font-medium text-slate-500">Instagram</p>
          <p className="font-medium text-slate-500">Youtube</p>
        </div>
      </div>

      <hr className="w-full borber border-slate-200" />

      <div className="flex items-center justify-between">
        <h3 className="text-base font-normal">
          Copyright © 2024 acme.ai - Automate your workflow with AI
        </h3>
        <div className="flex space-x-3">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
