"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, DoorOpen, Lock, Building } from "lucide-react"
import { AccessZoneForm } from "./access-zone-form"

// Données d'exemple pour les zones d'accès
const accessZones = [
  {
    id: "1",
    name: "Administration",
    building: "Mghira",
    company: "PRINTSECURE",
    doors: ["RRH", "reception Escalier", "Admin RDC", "Escalier RRH", "Salle serveur RDC"],
  },
  {
    id: "2",
    name: "Production",
    building: "Mghira",
    company: "PRINTSECURE",
    doors: ["Usine 1er", "Perso ouvrier 1er", "Entrée/sortie Ouvrier"],
  },
  {
    id: "3",
    name: "SIM",
    building: "Mghira",
    company: "PRINTSECURE",
    doors: ["SIM pack IN/OUT", "SIM IN / OUT", "Sim usine Ouvrier"],
  },
  {
    id: "4",
    name: "Technique",
    building: "Mghira",
    company: "PRINTSECURE",
    doors: ["Informatique/finance", "Salle serveur 1ER", "Salle serveur 2EME", "4422"],
  },
  {
    id: "5",
    name: "TRUSTLINK",
    building: "Bizerte",
    company: "TRUSTLINK",
    doors: ["Admin RDC", "Entrée/sortie Ouvrier"],
  },
]

// Données d'exemple pour les bâtiments
const buildings = [
  { id: 1, name: "Mghira", company: "PRINTSECURE" },
  { id: 2, name: "Tunis Centre", company: "PRINTSECURE" },
  { id: 3, name: "Sousse", company: "TRUSTLINK" },
  { id: 4, name: "Sfax", company: "PRINTSECURE" },
  { id: 5, name: "Bizerte", company: "TRUSTLINK" },
]

export default function AccessZonesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedZone, setSelectedZone] = useState<(typeof accessZones)[0] | undefined>(undefined)
  const [expandedZones, setExpandedZones] = useState<Record<string, boolean>>({})
  const [filteredBuildings, setFilteredBuildings] = useState(buildings)

  // Mettre à jour les bâtiments filtrés lorsque le filtre de société change
  useEffect(() => {
    if (companyFilter) {
      setFilteredBuildings(buildings.filter((b) => b.company === companyFilter))
      setBuildingFilter("")
    } else {
      setFilteredBuildings(buildings)
    }
  }, [companyFilter])

  // Filtrer les zones d'accès en fonction des critères de recherche
  const filteredZones = accessZones.filter((zone) => {
    const searchMatch = zone.name.toLowerCase().includes(searchTerm.toLowerCase())
    const buildingMatch = buildingFilter && buildingFilter !== "all" ? zone.building === buildingFilter : true
    const companyMatch = companyFilter ? zone.company === companyFilter : true

    return searchMatch && buildingMatch && companyMatch
  })

  const handleEdit = (zone: (typeof accessZones)[0]) => {
    setSelectedZone(zone)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedZone(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedZone(undefined)
  }

  const toggleZoneExpansion = (zoneId: string) => {
    setExpandedZones((prev) => ({
      ...prev,
      [zoneId]: !prev[zoneId],
    }))
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Gestion des zones d'accès</h2>
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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Société
              </label>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="PRINTSECURE">PRINTSECURE</SelectItem>
                  <SelectItem value="TRUSTLINK">TRUSTLINK</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                  {filteredBuildings.map((building) => (
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
                placeholder="Rechercher une zone d'accès..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <Lock className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total des zones</p>
              <p className="text-2xl font-bold">{filteredZones.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <DoorOpen className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total des portes</p>
              <p className="text-2xl font-bold">{filteredZones.reduce((acc, zone) => acc + zone.doors.length, 0)}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Building className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bâtiments</p>
              <p className="text-2xl font-bold">{new Set(filteredZones.map((z) => z.building)).size}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <Pencil className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Zones Mghira</p>
              <p className="text-2xl font-bold">{filteredZones.filter((z) => z.building === "Mghira").length}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone d'accès</TableHead>
                <TableHead>Porte</TableHead>
                <TableHead>Société</TableHead>
                <TableHead>Bâtiment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredZones.map((zone) => (
                <>
                  <TableRow
                    key={zone.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleZoneExpansion(zone.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        {zone.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DoorOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{zone.doors.length} portes</span>
                      </div>
                    </TableCell>
                    <TableCell>{zone.company}</TableCell>
                    <TableCell>{zone.building}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(zone)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedZones[zone.id] &&
                    zone.doors.map((door, index) => (
                      <TableRow key={`${zone.id}-door-${index}`} className="bg-muted/20">
                        <TableCell></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 pl-4">
                            <DoorOpen className="h-4 w-4 text-muted-foreground" />
                            {door}
                          </div>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" disabled>
                              <Pencil className="h-4 w-4 opacity-30" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled></Button>
                            <Button variant="ghost" size="icon" disabled>
                              <Trash2 className="h-4 w-4 opacity-30" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
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

      {/* Formulaire pour ajouter/modifier une zone d'accès */}
      <AccessZoneForm isOpen={isFormOpen} onClose={handleCloseForm} accessZone={selectedZone} />
    </div>
  )
}

