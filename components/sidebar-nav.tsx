"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string
    href?: string
    items?: {
      title: string
      href: string
    }[]
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <nav className={cn("flex flex-col space-y-1 p-2", className)} {...props}>
        {items.map((item) => {
          const isOpen = openSections[item.title] ?? true

          return (
            <div key={item.title} className="space-y-1">
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                  )}
                >
                  {item.title}
                  {item.items && (
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleSection(item.title)
                      }}
                    />
                  )}
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-between font-medium"
                  onClick={() => toggleSection(item.title)}
                >
                  {item.title}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")} />
                </Button>
              )}

              {item.items && isOpen && (
                <div className="ml-4 space-y-1 border-l pl-2">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                        pathname === subItem.href ? "bg-accent/50 font-medium text-accent-foreground" : "transparent",
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </ScrollArea>
  )
}

