import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8 flex items-center gap-2">
        <Building className="h-8 w-8 text-indigo-500" />
        <h1 className="text-3xl font-bold tracking-tight">Contrôle d'Accès</h1>
      </div>

      <div className="w-full max-w-md space-y-8">
        <Card className="border-2 border-indigo-100">
          <CardHeader>
            <CardTitle className="text-center text-xl">Bienvenue</CardTitle>
            <CardDescription className="text-center">Système de gestion des accès et des bâtiments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Lock className="h-16 w-16 text-indigo-500" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Connectez-vous pour accéder au système de contrôle d'accès
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Link href="/auth/sign-in" className="w-full">
              <Button className="w-full bg-indigo-500 hover:bg-indigo-600">Se connecter</Button>
            </Link>
            <Link href="/auth/sign-up" className="w-full">
              <Button variant="outline" className="w-full">
                Créer un compte
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          © 2023 Système de Contrôle d'Accès. Tous droits réservés.
        </div>
      </div>
    </div>
  )
}

