"use client";

import Link from "next/link";
import { ModeToggle } from "./modeToggle";
import TopNavbar from "./TopNavbar";
import SearchBar from "./SearchBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  // Replace with your actual auth logic
  const isLoggedIn = false;
  const user = {
    name: "User",
    image: "https://github.com/shadcn.png",
  };

  return (
    <>
      <TopNavbar />
      <nav className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left side - Logo and Website Name */}
            <div className="flex items-center lg:w-1/4">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/logo/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <span className="text-xl font-bold hidden sm:inline-block">
                  Kushtia Kachabazaar
                </span>
                <span className="text-xl font-bold sm:hidden">KKB</span>
              </Link>
            </div>

            {/* Search Bar - Hidden on Mobile, Shown as Overlay */}
            <div className="hidden md:flex justify-center flex-1">
              <SearchBar />
            </div>

            {/* Middle - Navigation Links (Hidden on Mobile) */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-6">
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className="font-medium">
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-2">
                        <div className="row-span-3">
                          <h3 className="font-bold mb-2">Categories</h3>
                          <div className="grid gap-2">
                            <Link
                              href="/products/vegetables"
                              className="hover:underline"
                            >
                              Vegetables
                            </Link>
                            <Link
                              href="/products/fruits"
                              className="hover:underline"
                            >
                              Fruits
                            </Link>
                            <Link
                              href="/products/meat"
                              className="hover:underline"
                            >
                              Meat
                            </Link>
                            <Link
                              href="/products/fish"
                              className="hover:underline"
                            >
                              Fish
                            </Link>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Featured</h3>
                          <div className="grid gap-2">
                            <Link
                              href="/products/seasonal"
                              className="hover:underline"
                            >
                              Seasonal Items
                            </Link>
                            <Link
                              href="/products/offers"
                              className="hover:underline"
                            >
                              Special Offers
                            </Link>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink className="font-medium">
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink className="font-medium">
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/blog" legacyBehavior passHref>
                      <NavigationMenuLink className="font-medium">
                        Blog
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right side - Mode Toggle, Auth, and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <div className="hidden md:block">
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="outline" size="sm">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button using Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  {/* Header inside Sheet */}
                  <div className="flex items-center justify-between border-b p-3">
                    <Link href="/" className="flex items-center space-x-2">
                      <Image
                        src="/images/logo/logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                      />
                      <span className="font-bold">KKB</span>
                    </Link>
                  </div>
                  {/* Navigation Menu */}
                  <div className="flex flex-col space-y-4 p-4">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="text-sm font-medium hover:text-primary"
                      >
                        Home
                      </Link>
                    </SheetClose>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-left text-sm font-medium hover:text-primary">
                        Products
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link href="/products/vegetables">Vegetables</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/products/fruits">Fruits</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/products/meat">Meat</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/products/fish">Fish</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/products/seasonal">Seasonal Items</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/products/offers">Special Offers</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <SheetClose asChild>
                      <Link
                        href="/about"
                        className="text-sm font-medium hover:text-primary"
                      >
                        About
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="text-sm font-medium hover:text-primary"
                      >
                        Contact
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/blog"
                        className="text-sm font-medium hover:text-primary"
                      >
                        Blog
                      </Link>
                    </SheetClose>

                    {!isLoggedIn && (
                      <Button variant="outline" size="sm" className="w-full">
                        <Link href="/login">Login</Link>
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden py-2">
            <SearchBar />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
