import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="container mx-auto w-full bg-background border-t">
      {/* Main Footer */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Us</h3>
            <p className="text-muted-foreground">
              Kushtiaka Cabazaar provides fresh vegetables and fruits directly
              from farmers to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <FacebookIcon className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Twitter">
                  <TwitterIcon className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Instagram">
                  <InstagramIcon className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>123 Main Street</li>
              <li>Kushtia, Bangladesh</li>
              <li>Phone: +880 1234-567890</li>
              <li>Email: info@kushtiakacabazaar.com</li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>

      <Separator />

      {/* Mini Footer */}
      <div className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            {" "}
            {new Date().getFullYear()} Kushtiaka Cabazaar. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
