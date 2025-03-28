"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Facebook, Globe, Linkedin, Phone, Eye, Youtube, Twitter } from "lucide-react"

// Données d'exemple pour les employés
const employees = [

  {
    id: "00002",
    matricule: "462",
    prenom: "RANIA",
    nom: "BEN YOUNES",
    filiale: "dev",
    statut: "inactif",
    poste: "Développeur Frontend",
    photo: "/placeholder.svg?height=200&width=200",
    background: "#E91E63",
  },
  {
    id: "00003",
    matricule: "463",
    prenom: "ADNAN",
    nom: "BEN TAAZAIT",
    filiale: "dev",
    statut: "actif",
    poste: "Développeur Backend",
    photo: "/placeholder.svg?height=200&width=200",
    background: "#2196F3",
  },
  {
    id: "00004",
    matricule: "464",
    prenom: "ROMDHAN",
    nom: "BALDI",
    filiale: "dev",
    statut: "inactif",
    poste: "Chef de Projet",
    photo: "/placeholder.svg?height=200&width=200",
    background: "#9C27B0",
  },
  {
    id: "00005",
    matricule: "465",
    prenom: "SAFA",
    nom: "JLASSI",
    filiale: "dev",
    statut: "inactif",
    poste: "Designer UI/UX",
    photo: "/placeholder.svg?height=200&width=200",
    background: "#FF5722",
  },
  {
    id: "00006",
    matricule: "466",
    prenom: "ALA EDDINE",
    nom: "ALBAROUDI",
    filiale: "dev",
    statut: "inactif",
    poste: "Ingénieur DevOps",
    photo: "/placeholder.svg?height=200&width=200",
    background: "#3F51B5",
  },
  {
    id: "00007",
    matricule: "467",
    prenom: "SARAH",
    nom: "MANSOUR",
    filiale: "dev",
    statut: "actif",
    poste: "Responsable QA",
    photo: "/placeholder.svg?height=200&width=200",
    background: "#00BCD4",
  },
]

// Composant pour la carte d'employé
function EmployeeCard({ employee }: { employee: (typeof employees)[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="h-24 w-full" style={{ backgroundColor: employee.background }} />
        <div className="absolute left-1/2 top-12 flex -translate-x-1/2 transform justify-center">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white">
            <Image
              src={employee.photo || "/placeholder.svg"}
              alt={`${employee.prenom} ${employee.nom}`}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <CardContent className="mt-16 text-center">
        <h3 className="text-xl font-bold">
          {employee.prenom} {employee.nom}
        </h3>
        <p className="text-muted-foreground">{employee.poste}</p>

        <div className="mt-4 flex justify-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30">
            <Facebook className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30">
            <Twitter className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30">
            <Linkedin className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30">
            <Youtube className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/30">
            <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <div className={`h-3 w-3 rounded-full ${employee.statut === "actif" ? "bg-green-500" : "bg-red-500"}`} />
          <span className="ml-2 text-sm text-muted-foreground">
            {employee.statut === "actif" ? "Actif" : "Inactif"}
          </span>
          <span className="ml-4 text-sm text-muted-foreground">ID: {employee.matricule}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center gap-2 border-t p-4">
        <Button variant="outline" size="sm" className="flex-1">
          <Phone className="mr-2 h-4 w-4" />
          Appeler
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="mr-2 h-4 w-4" />
          Voir
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function EmployeesManagePage() {
  const [searchName, setSearchName] = useState("")
  const [searchId, setSearchId] = useState("")
  const [designation, setDesignation] = useState("")

  // Filtrer les employés en fonction des critères de recherche
  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = `${employee.prenom} ${employee.nom}`.toLowerCase().includes(searchName.toLowerCase())
    const idMatch = employee.matricule.includes(searchId)
    const designationMatch = designation ? employee.poste.toLowerCase().includes(designation.toLowerCase()) : true

    return nameMatch && idMatch && designationMatch
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des employés</h2>
      </div>

      <div className="grid gap-6 rounded-lg bg-muted/20 p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <Input
              placeholder="Nom de l'employé"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="h-12 bg-white"
            />
          </div>
          <div>
            <Input
              placeholder="ID de l'employé"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="h-12 bg-white"
            />
          </div>
          <div>
            <Select value={designation} onValueChange={setDesignation}>
              <SelectTrigger className="h-12 bg-white">
                <SelectValue placeholder="Poste de l'employé" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les postes</SelectItem>
                <SelectItem value="développeur">Développeur</SelectItem>
                <SelectItem value="chef">Chef de projet</SelectItem>
                <SelectItem value="administrateur">Administrateur</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button className="h-12 flex-1 bg-emerald-500 hover:bg-emerald-600">Filtres</Button>
            <Button className="h-12 flex-1 bg-indigo-500 hover:bg-indigo-600">Ajouter un employé</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">Aucun employé trouvé</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Affichage de {filteredEmployees.length} sur {employees.length} employés
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Précédent
          </Button>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}

