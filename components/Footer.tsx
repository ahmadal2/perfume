
"use client";
import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
  Cpu,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "./ui/hover-footer";
import { LocationMap } from "./ui/expand-map";

const Footer: React.FC = () => {
  // Footer link data
  const footerLinks = [
    {
      title: "Collections",
      links: [
        { label: "The Original", href: "/products" },
        { label: "Special Reserve", href: "/products" },
        { label: "Legacy Archive", href: "/products" },
        { label: "Limited Editions", href: "/products" },
      ],
    },
    {
      title: "Concierge",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Support", href: "/contact" },
        {
          label: "Live Consultation",
          href: "#",
          pulse: true,
        },
        {
          label: "Technical Blueprint",
          href: "/blueprint",
          icon: <Cpu size={10} className="inline mr-2 opacity-50" />
        }
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "concierge@khamrah.com",
      href: "mailto:concierge@khamrah.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+49 155 605 495 29",
      href: "tel:+4915560549529",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "75008 Place Royale, Paris",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8 border border-white/5">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#3ca2fa] text-3xl font-extrabold">
                &hearts;
              </span>
              <span className="text-white text-3xl font-black serif uppercase tracking-widest">KHAMRAH</span>
            </div>
            <p className="text-sm leading-relaxed text-white/40 uppercase tracking-widest text-[10px]">
              The Sanctuary of Olfactory Excellence. Curating legacy in every drop.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6 serif italic">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative flex items-center">
                    <Link
                      to={link.href}
                      className="hover:text-[#3ca2fa] transition-colors text-white/60 text-xs uppercase tracking-widest flex items-center"
                    >
                      {link.icon && link.icon}
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6 serif italic">
              Connect
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#3ca2fa] transition-colors text-white/60 text-xs uppercase tracking-widest"
                    >
                      {item.text}
                    </a>
                  ) : item.text.includes('Place Royale') ? (
                    <div className="pt-2">
                      <LocationMap />
                    </div>
                  ) : (
                    <span className="hover:text-[#3ca2fa] transition-colors text-white/60 text-xs uppercase tracking-widest">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/5 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-white/20 space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} KHAMRAH. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect with 'KHAMRAH' as requested */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="KHAMRAH" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
};

export default Footer;
