import Image from "next/image";
import logo from "../assets/Main/logo.svg";
import { Instagram, Twitter, Facebook, ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    title: "Shop",
    links: ["Furniture", "Lighting", "Home Decor", "Textiles", "New Arrivals"],
  },
  {
    title: "Company",
    links: ["Our Story", "Artisans", "Sustainability", "Careers", "Journal"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Shipping & Returns", "Warranty", "FAQ", "Sizing Guide"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 px-8 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          {/* Logo and About */}
          <div className="lg:col-span-2">
            <Image
              src={logo}
              alt="Artisan Logo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain mb-8"
            />
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm">
              Crafting premium lifestyle pieces that blend timeless elegance with modern functionality. Sustainably sourced, artisan-made.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-[#d2714e] hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-[#d2714e] hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 hover:bg-[#d2714e] hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="lg:col-span-1">
              <h4 className="text-sm font-bold text-[#2b2825] mb-6 uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-zinc-500 hover:text-[#d2714e] transition-colors flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-[#2b2825] mb-6 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4">
              <li className="text-sm text-zinc-500">123 Artisan Street, Craft City, CC 12345</li>
              <li className="text-sm text-zinc-500">hello@artisan.com</li>
              <li className="text-sm text-zinc-500">+1 (234) 567-890</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-400">© 2026 Artisan Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-zinc-400 hover:text-[#d2714e]">Privacy Policy</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-[#d2714e]">Terms of Service</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-[#d2714e]">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
