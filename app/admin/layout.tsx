import type React from "react"
import { MainNav, getAdminNavItems } from "@/components/main-nav"
import { SidebarNav } from "@/components/sidebar-nav"
import { UserNav } from "@/components/user-nav"
import { Separator } from "@/components/ui/separator"
import { Building, ChevronDown } from "lucide-react"
import Link from "next/link"
import { CompanySelector } from "@/components/company-selector"
import { CompanyProvider } from "@/contexts/company-context"

const sidebarNavItems = [
  {
    title: "Administration société",
    items: [
      {
        title: "Gestion jours fériés",
        href: "/admin/company/holidays",
      },
      {
        title: "Gestion types congés",
        href: "/admin/company/leave-types",
      },
    ],
  },
  {
    title: "Bâtiment et accès",
    items: [
      {
        title: "Gestion bâtiments",
        href: "/admin/buildings/manage",
      },
      {
        title: "Gestion départements",
        href: "/admin/buildings/departments",
      },
      {
        title: "Gestion systèmes accès",
        href: "/admin/buildings/access-systems",
      },
      {
        title: "Gestion portes",
        href: "/admin/buildings/doors",
      },
      {
        title: "Gestion zones accès",
        href: "/admin/buildings/access-zones",
      },
    ],
  },
  {
    title: "Horaires de travail",
    items: [
      {
        title: "Gestion postes",
        href: "/admin/schedules/positions",
      },
      {
        title: "Gestion périodes travail",
        href: "/admin/schedules/periods",
      },
      {
        title: "Gestion temps accès",
        href: "/admin/schedules/access-times",
      },
    ],
  },
  {
    title: "Employé",
    items: [
      {
        title: "Gestion employés",
        href: "/admin/employees/manage",
      },
      {
        title: "Gestion mise à pied",
        href: "/admin/employees/suspension",
      },
      {
        title: "Gestion congés",
        href: "/admin/employees/leave",
      },
    ],
  },
  {
    title: "Journalisation",
    items: [
      {
        title: "Journalisation contrôle accès",
        href: "/admin/logs/access-control",
      },
    ],
  },
]

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CompanyProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                <h1 className="text-xl font-bold tracking-tight">CONTRÔLE D'ACCÈS</h1>
              </Link>
              <MainNav items={getAdminNavItems()} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Utilisateur : Admin Access</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Préférences</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <UserNav user={{ name: "Admin", email: "admin@example.com", role: "Administrateur" }} />
            </div>
          </div>
          <CompanySelector />
        </header>
        <div className="flex flex-1">
          <aside className="w-64 border-r">
            <SidebarNav items={sidebarNavItems} className="py-4" />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </CompanyProvider>
  )
}

