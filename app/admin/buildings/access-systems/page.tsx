"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Fingerprint, Wifi, DoorOpen, RefreshCw, Info, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AccessSystemForm } from "./access-system-form"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les systèmes d'accès
const allAccessSystems = [
  {
    id: "1",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.26",
    port: "1471",
    door: "Informatique/finance",
    status: "offline",
    lastSuccess: "21/10/2023 - 12:42:13",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "2",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.33",
    port: "1471",
    door: "SIM IN / OUT",
    status: "online",
    lastSuccess: "29/01/2025 - 15:10:31",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "3",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.32",
    port: "1471",
    door: "SIM IN / OUT",
    status: "online",
    lastSuccess: "29/01/2025 - 15:10:40",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "4",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.25",
    port: "1471",
    door: "Usine 1er",
    status: "offline",
    lastSuccess: "21/10/2023 - 12:42:40",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "5",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.16",
    port: "1471",
    door: "Admin RDC",
    status: "online",
    lastSuccess: "29/01/2025 - 15:11:01",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "6",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.19",
    port: "1471",
    door: "Découpe Reception",
    status: "offline",
    lastSuccess: "03/08/2024 - 12:08:51",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "7",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.24",
    port: "1471",
    door: "Usine 1er",
    status: "offline",
    lastSuccess: "03/08/2024 - 12:08:59",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "8",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.18",
    port: "1471",
    door: "Découpe Reception",
    status: "offline",
    lastSuccess: "03/08/2024 - 12:09:09",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "9",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.20",
    port: "1471",
    door: "reception Escalier",
    status: "offline",
    lastSuccess: "03/08/2024 - 12:09:18",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "10",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.0.21",
    port: "1471",
    door: "reception Escalier",
    status: "offline",
    lastSuccess: "03/08/2024 - 12:09:27",
    building: "Mghira",
    company: "PRINTSECURE",
  },
  {
    id: "11",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.1.10",
    port: "1471",
    door: "Entrée principale",
    status: "online",
    lastSuccess: "29/01/2025 - 15:12:01",
    building: "Bizerte",
    company: "TRUSTLINK",
  },
  {
    id: "12",
    brand: "Suprema",
    model: "BioEntry Plus",
    ipAddress: "192.168.1.11",
    port: "1471",
    door: "Salle serveur",
    status: "offline",
    lastSuccess: "03/08/2024 - 12:10:00",
    building: "Sousse",
    company: "TRUSTLINK",
  },
]

// Données d'exemple pour les bâtiments
const allBuildings = [
  { id: 1, name: "Mghira", company: "PRINTSECURE" },
  { id: 2, name: "Tunis Centre", company: "PRINTSECURE" },
  { id: 3, name: "Sousse", company: "TRUSTLINK" },
  { id: 4, name: "Sfax", company: "PRINTSECURE" },
  { id: 5, name: "Bizerte", company: "TRUSTLINK" },
]

export default function AccessSystemsPage() {
  const { selectedCompany } = useCompany()
  const [searchTerm, setSearchTerm] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedSystem, setSelectedSystem] = useState<(typeof allAccessSystems)[0] | undefined>(undefined)
  const [accessSystems, setAccessSystems] = useState(allAccessSystems)
  const [buildings, setBuildings] = useState(allBuildings)

  // Filtrer les systèmes d'accès et bâtiments en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setAccessSystems(allAccessSystems.filter((system) => system.company === selectedCompany))
      setBuildings(allBuildings.filter((building) => building.company === selectedCompany))
      // Réinitialiser le filtre de bâtiment si le bâtiment sélectionné n'appartient pas à la société
      if (buildingFilter && !allBuildings.some((b) => b.name === buildingFilter && b.company === selectedCompany)) {
        setBuildingFilter("")
      }
    } else {
      setAccessSystems(allAccessSystems)
      setBuildings(allBuildings)
    }
  }, [selectedCompany, buildingFilter])

  // Filtrer les systèmes d'accès en fonction des critères de recherche
  const filteredSystems = accessSystems.filter((system) => {
    const searchMatch =
      system.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      system.door.toLowerCase().includes(searchTerm.toLowerCase())

    const buildingMatch = buildingFilter && buildingFilter !== "all" ? system.building === buildingFilter : true

    return searchMatch && buildingMatch
  })

  const handleEdit = (system: (typeof accessSystems)[0]) => {
    setSelectedSystem(system)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedSystem(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedSystem(undefined)
  }

  const handleCheckStatus = () => {
    // Ici, vous implémenteriez la logique pour vérifier le statut des systèmes
    console.log("Vérification du statut des systèmes...")
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des systèmes d'accès
          {selectedCompany && ` - ${selectedCompany}`}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCheckStatus}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Vérifier statut
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau
          </Button>
        </div>
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
              <Select value={buildingFilter} onValueChange={setBuildingFilter}>
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
                placeholder="Rechercher un système d'accès..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <Fingerprint className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total systèmes</p>
              <p className="text-2xl font-bold">{accessSystems.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Wifi className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">En ligne</p>
              <p className="text-2xl font-bold">{accessSystems.filter((s) => s.status === "online").length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-red-50 p-3 rounded-full">
              <Wifi className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Hors ligne</p>
              <p className="text-2xl font-bold">{accessSystems.filter((s) => s.status === "offline").length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <Building className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bâtiments</p>
              <p className="text-2xl font-bold">{new Set(accessSystems.map((s) => s.building)).size}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marque</TableHead>
                <TableHead>Modèle</TableHead>
                <TableHead>Adresse IP</TableHead>
                <TableHead>Port</TableHead>
                <TableHead>Porte</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date du dernier succès</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSystems.map((system) => (
                <TableRow key={system.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-muted-foreground" />
                      {system.brand}
                    </div>
                  </TableCell>
                  <TableCell>{system.model}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-muted-foreground" />
                      {system.ipAddress}
                    </div>
                  </TableCell>
                  <TableCell>{system.port}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DoorOpen className="h-4 w-4 text-muted-foreground" />
                      {system.door}
                    </div>
                  </TableCell>
                  <TableCell>
                    {system.status === "online" ? (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">En ligne</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                          Détails
                        </Badge>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{system.lastSuccess}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(system)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Info className="h-4 w-4" />
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
              <Button variant="outline" size="sm" className="px-3">
                2
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                3
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

      {/* Formulaire pour ajouter/modifier un système d'accès */}
      <AccessSystemForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        accessSystem={selectedSystem}
        buildings={buildings}
      />
    </div>
  )
}

