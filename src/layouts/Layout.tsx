import React, { useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { themeStore } from '../stores/themeStore'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import '../styles/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  const $theme = useStore(themeStore)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', $theme === 'dark')
  }, [$theme])

  const toggleTheme = () => {
    themeStore.set($theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`min-h-screen flex flex-col ${$theme === 'dark' ? 'dark bg-[#1a1b26] text-[#a9b1d6]' : 'bg-white text-gray-900'}`}>
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <a href="/" className="text-2xl font-bold">STEAMer Academy</a>
          <div className="flex items-center space-x-4">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Services</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a href="/services/english-club">English Club</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/services/math-club">Math Club</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="/gallery" className="hover:text-blue-600 transition-colors">Gallery</a>
            <a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {$theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold">Location</h3>
            <p>Mirpur-2, Dhaka, Bangladesh</p>
          </div>
          <div>
            <h3 className="font-bold">Hours</h3>
            <p>Friday - Saturday</p>
            <p>8am - 8pm</p>
          </div>
          <div>
            <h3 className="font-bold">Social</h3>
            <a href="#" className="hover:text-blue-600 transition-colors">Facebook</a>
          </div>
          <div>
            <h3 className="font-bold">Contact</h3>
            <p>steamerbangladesh@gmail.com</p>
            <p>+88017 7585 4054</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
