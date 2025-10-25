'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Handle scrolling to hash on page load
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu

    // If we're on the home page, scroll to the section
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If we're on another page, navigate to home with hash
      router.push(`/#${sectionId}`);
    }
  };

  const navLinks = [
    { href: '/#skills', label: 'Skills', id: 'skills' },
    { href: '/#experience', label: 'Experience', id: 'experience' },
    { href: '/#projects', label: 'Projects', id: 'projects' },
    { href: '/#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className='fixed top-0 w-full z-50 bg-background/60 backdrop-blur-md border-b border-border/50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='flex justify-between items-center h-16'>
          <Link
            href='/'
            className='text-xl font-mono font-semibold text-foreground'
          >
            Aravind
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className='text-sm text-muted-foreground hover:text-foreground transition'
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            {/* Theme Toggle */}
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleTheme}
              className='rounded-full'
            >
              {theme === 'dark' ? (
                <Sun className='h-5 w-5' />
              ) : (
                <Moon className='h-5 w-5' />
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='md:hidden rounded-full'
                >
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='top' className='h-auto'>
                <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
                <div className='flex flex-col gap-6 mt-4 pb-4'>
                  {navLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className='text-lg px-6 text-foreground hover:text-foreground transition'
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
