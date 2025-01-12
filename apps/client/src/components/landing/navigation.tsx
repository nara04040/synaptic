"use client";
import { useState } from "react";
import { Button } from "@/components/landing/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/landing/theme-toggle";
import Link from "next/link";

export function Navigation({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="font-inter font-bold text-2xl text-purple-700 dark:text-purple-400">Synaptic</span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["Dashboard", "Roadmap", "Notes", "Review"].map((item) => (
                  <a key={item} href={item.toLowerCase()} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center lg:ml-6">
              <div className="relative">
                <Input type="text" placeholder="Search..." className="w-64 pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Link href='/profile'>
                      <User className="h-5 w-5" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="ml-2">
                    Sign In
                  </Button>
                  <Button variant="default" className="ml-2">
                    Sign Up
                  </Button>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-white dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Dashboard", "Roadmap", "Notes", "Review"].map((item) => (
              <a key={item} href={item.toLowerCase()} className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                {item}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5">
              <Input type="text" placeholder="Search..." className="w-full" />
            </div>
            <div className="mt-3 px-2 space-y-1">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="h-5 w-5 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                  <Button variant="default" className="w-full justify-start">
                    Sign Up
                  </Button>
                </>
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
