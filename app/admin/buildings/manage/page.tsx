"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Building, Phone, MapPin } from "lucide-react"
import { BuildingForm } from "./building-form"

// Importer le hook useCompany
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les bâtiments
const buildings = [
  {
    id: 1,
    name: "Mghira",
    address: "Ben Arous",
    phone: "79408381",
    company: "PRINTSECURE",
  },
  {
    id: 2,
    name: "Tunis Centre",
    address: "Avenue Habib Bourguiba, Tunis",
    phone: "71123456",
    company: "PRINTSECURE",
  },
  {
    id: 3,
    name: "Sousse",
    address: "Zone Industrielle, Sousse",
    phone: "73456789",
    company: "TRUSTLINK",
  },
  {
    id: 4,
    name: "Sfax",
    address: "Route de Gabès, Sfax",
    phone: "74987654",
    company: "PRINTSECURE",
  },
  {
    id: 5,
    name: "Bizerte",
    address: "Zone Portuaire, Bizerte",
    phone: "72654321",
    company: "TRUSTLINK",
  },
]

export default function BuildingsManagePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState<(typeof buildings)[0] | undefined>(undefined)

  // Dans la fonction BuildingsManagePage, ajouter:
  const { selectedCompany } = useCompany()

  // Modifier la section de filtrage des bâtiments pour inclure le filtre par société:
  // Filtrer les bâtiments en fonction des critères de recherche
  const filteredBuildings = buildings.filter((building) => {
    const searchMatch =
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.toLowerCase().includes(searchTerm.toLowerCase())
    const companyMatch = companyFilter ? building.company === companyFilter : true
    const selectedCompanyMatch = selectedCompany ? building.company === selectedCompany : true

    return searchMatch && companyMatch && selectedCompanyMatch
  })

  const handleEdit = (building: (typeof buildings)[0]) => {
    setSelectedBuilding(building)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedBuilding(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedBuilding(undefined)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        {/* Modifier le titre pour inclure la société sélectionnée: */}
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des bâtiments
          {selectedCompany && ` - ${selectedCompany}`}
        </h2>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zone de recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="building" className="text-sm font-medium">
                Bâtiment
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="building">
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.name}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Recherche
              </label>
              <Input
                id="search"
                placeholder="Rechercher un bâtiment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          {/* Mettre à jour les statistiques pour qu'elles reflètent uniquement les bâtiments filtrés: */}
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <Building className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total bâtiments</p>
              <p className="text-2xl font-bold">{filteredBuildings.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Building className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">PRINTSECURE</p>
              <p className="text-2xl font-bold">
                {filteredBuildings.filter((b) => b.company === "PRINTSECURE").length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Building className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">TRUSTLINK</p>
              <p className="text-2xl font-bold">{filteredBuildings.filter((b) => b.company === "TRUSTLINK").length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Villes</p>
              <p className="text-2xl font-bold">
                {new Set(filteredBuildings.map((b) => b.address.split(",")[0].trim())).size}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Numéro de téléphone</TableHead>
                <TableHead>Société</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {building.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {building.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {building.phone}
                    </div>
                  </TableCell>
                  <TableCell>{building.company}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(building)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-end p-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                1
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
              <Select defaultValue="10">
                <SelectTrigger className="w-16">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire pour ajouter/modifier un bâtiment */}
      <BuildingForm isOpen={isFormOpen} onClose={handleCloseForm} building={selectedBuilding} />
    </div>
  )
}

