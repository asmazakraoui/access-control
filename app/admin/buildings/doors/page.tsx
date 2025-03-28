"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, DoorOpen, FolderOpen, Building } from "lucide-react"
import { DoorForm } from "./door-form"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les portes
const allDoors = [
  { id: "1", name: "Usine 1er", department: "Prod", building: "Mghira", company: "PRINTSECURE" },
  { id: "2", name: "Découpe Reception", department: "Access total", building: "Mghira", company: "PRINTSECURE" },
  { id: "3", name: "SIM pack IN/OUT", department: "SIM", building: "Mghira", company: "PRINTSECURE" },
  { id: "4", name: "Informatique/finance", department: "Technique", building: "Mghira", company: "PRINTSECURE" },
  { id: "5", name: "SIM IN / OUT", department: "SIM", building: "Mghira", company: "PRINTSECURE" },
  { id: "6", name: "RRH", department: "Dept 1", building: "Mghira", company: "PRINTSECURE" },
  { id: "7", name: "reception Escalier", department: "Administration", building: "Mghira", company: "PRINTSECURE" },
  { id: "8", name: "Sim usine Ouvrier", department: "SIM", building: "Mghira", company: "PRINTSECURE" },
  { id: "9", name: "Admin RDC", department: "Administration", building: "Mghira", company: "PRINTSECURE" },
  { id: "10", name: "Perso ouvrier 1er", department: "Prod", building: "Mghira", company: "PRINTSECURE" },
  { id: "11", name: "Entrée principale", department: "Administration", building: "Bizerte", company: "TRUSTLINK" },
  { id: "12", name: "Salle serveur", department: "Technique", building: "Sousse", company: "TRUSTLINK" },
]

// Données d'exemple pour les bâtiments
const allBuildings = [
  { id: 1, name: "Mghira", company: "PRINTSECURE" },
  { id: 2, name: "Tunis Centre", company: "PRINTSECURE" },
  { id: 3, name: "Sousse", company: "TRUSTLINK" },
  { id: 4, name: "Sfax", company: "PRINTSECURE" },
  { id: 5, name: "Bizerte", company: "TRUSTLINK" },
]

// Données d'exemple pour les départements
const allDepartments = [
  { id: 1, name: "Prod", company: "PRINTSECURE" },
  { id: 2, name: "Access total", company: "PRINTSECURE" },
  { id: 3, name: "SIM", company: "PRINTSECURE" },
  { id: 4, name: "Technique", company: "PRINTSECURE" },
  { id: 5, name: "Administration", company: "PRINTSECURE" },
  { id: 6, name: "Dept 1", company: "PRINTSECURE" },
  { id: 7, name: "Technique", company: "TRUSTLINK" },
  { id: 8, name: "Administration", company: "TRUSTLINK" },
]

export default function DoorsPage() {
  const { selectedCompany } = useCompany()
  const [searchTerm, setSearchTerm] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedDoor, setSelectedDoor] = useState<(typeof allDoors)[0] | undefined>(undefined)
  const [doors, setDoors] = useState(allDoors)
  const [buildings, setBuildings] = useState(allBuildings)
  const [departments, setDepartments] = useState(allDepartments)

  // Filtrer les portes, bâtiments et départements en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setDoors(allDoors.filter((door) => door.company === selectedCompany))
      setBuildings(allBuildings.filter((building) => building.company === selectedCompany))
      setDepartments(allDepartments.filter((dept) => dept.company === selectedCompany))

      // Réinitialiser les filtres si les valeurs sélectionnées n'appartiennent pas à la société
      if (buildingFilter && !allBuildings.some((b) => b.name === buildingFilter && b.company === selectedCompany)) {
        setBuildingFilter("")
      }
      if (
        departmentFilter &&
        !allDepartments.some((d) => d.name === departmentFilter && d.company === selectedCompany)
      ) {
        setDepartmentFilter("")
      }
    } else {
      setDoors(allDoors)
      setBuildings(allBuildings)
      setDepartments(allDepartments)
    }
  }, [selectedCompany, buildingFilter, departmentFilter])

  // Filtrer les portes en fonction des critères de recherche
  const filteredDoors = doors.filter((door) => {
    const searchMatch = door.name.toLowerCase().includes(searchTerm.toLowerCase())
    const buildingMatch = buildingFilter && buildingFilter !== "all" ? door.building === buildingFilter : true
    const departmentMatch = departmentFilter && departmentFilter !== "all" ? door.department === departmentFilter : true

    return searchMatch && buildingMatch && departmentMatch
  })

  const handleEdit = (door: (typeof doors)[0]) => {
    setSelectedDoor(door)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedDoor(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedDoor(undefined)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des portes
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
          <div className="grid gap-4 md:grid-cols-3">
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
              <label htmlFor="department" className="text-sm font-medium">
                Département
              </label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.name}>
                      {department.name}
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
                placeholder="Rechercher une porte..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <DoorOpen className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total des portes</p>
              <p className="text-2xl font-bold">{doors.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <FolderOpen className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Départements</p>
              <p className="text-2xl font-bold">{new Set(doors.map((d) => d.department)).size}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Building className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bâtiments</p>
              <p className="text-2xl font-bold">{new Set(doors.map((d) => d.building)).size}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <Pencil className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Portes SIM</p>
              <p className="text-2xl font-bold">{doors.filter((d) => d.department === "SIM").length}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Porte</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Bâtiment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoors.map((door) => (
                <TableRow key={door.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <DoorOpen className="h-4 w-4 text-muted-foreground" />
                      {door.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      {door.department}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {door.building}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(door)}>
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
              <Button variant="outline" size="sm" className="px-3">
                2
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

      {/* Formulaire pour ajouter/modifier une porte */}
      <DoorForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        door={selectedDoor}
        buildings={buildings}
        departments={departments}
      />
    </div>
  )
}

