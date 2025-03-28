"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Building, FolderOpen } from "lucide-react"
import { DepartmentForm } from "./department-form"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les départements
const allDepartments = [
  { id: 1, name: "Dept 1", building: "Mghira", company: "PRINTSECURE" },
  { id: 2, name: "SIM", building: "Mghira", company: "PRINTSECURE" },
  { id: 3, name: "Administration", building: "Mghira", company: "PRINTSECURE" },
  { id: 4, name: "Printsecure", building: "Mghira", company: "PRINTSECURE" },
  { id: 5, name: "Prod", building: "Mghira", company: "PRINTSECURE" },
  { id: 6, name: "Technique", building: "Mghira", company: "PRINTSECURE" },
  { id: 7, name: "Dep sim", building: "Mghira", company: "PRINTSECURE" },
  { id: 8, name: "Access total", building: "Mghira", company: "PRINTSECURE" },
  { id: 9, name: "Escalier 2ème pack", building: "Mghira", company: "PRINTSECURE" },
  { id: 10, name: "TRUSTLINK", building: "Bizerte", company: "TRUSTLINK" },
  { id: 11, name: "Administration", building: "Sousse", company: "TRUSTLINK" },
  { id: 12, name: "Technique", building: "Bizerte", company: "TRUSTLINK" },
]

// Données d'exemple pour les bâtiments
const allBuildings = [
  { id: 1, name: "Mghira", company: "PRINTSECURE" },
  { id: 2, name: "Tunis Centre", company: "PRINTSECURE" },
  { id: 3, name: "Sousse", company: "TRUSTLINK" },
  { id: 4, name: "Sfax", company: "PRINTSECURE" },
  { id: 5, name: "Bizerte", company: "TRUSTLINK" },
]

export default function DepartmentsPage() {
  const { selectedCompany } = useCompany()
  const [searchTerm, setSearchTerm] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<(typeof allDepartments)[0] | undefined>(undefined)
  const [departments, setDepartments] = useState(allDepartments)
  const [buildings, setBuildings] = useState(allBuildings)

  // Filtrer les départements et bâtiments en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setDepartments(allDepartments.filter((dept) => dept.company === selectedCompany))
      setBuildings(allBuildings.filter((building) => building.company === selectedCompany))
      // Réinitialiser le filtre de bâtiment si le bâtiment sélectionné n'appartient pas à la société
      if (buildingFilter && !allBuildings.some((b) => b.name === buildingFilter && b.company === selectedCompany)) {
        setBuildingFilter("")
      }
    } else {
      setDepartments(allDepartments)
      setBuildings(allBuildings)
    }
  }, [selectedCompany, buildingFilter])

  // Filtrer les départements en fonction des critères de recherche
  const filteredDepartments = departments.filter((department) => {
    const searchMatch = department.name.toLowerCase().includes(searchTerm.toLowerCase())
    const buildingMatch = buildingFilter ? department.building === buildingFilter : true

    return searchMatch && buildingMatch
  })

  const handleEdit = (department: (typeof departments)[0]) => {
    setSelectedDepartment(department)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedDepartment(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedDepartment(undefined)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des départements
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
                placeholder="Rechercher un département..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <FolderOpen className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total départements</p>
              <p className="text-2xl font-bold">{departments.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Building className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bâtiments</p>
              <p className="text-2xl font-bold">{new Set(departments.map((d) => d.building)).size}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <FolderOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Dépt. Mghira</p>
              <p className="text-2xl font-bold">{departments.filter((d) => d.building === "Mghira").length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <Pencil className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Actifs</p>
              <p className="text-2xl font-bold">{departments.length}</p>
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
                <TableHead>Bâtiment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      {department.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {department.building}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(department)}>
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

      {/* Formulaire pour ajouter/modifier un département */}
      <DepartmentForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        department={selectedDepartment}
        buildings={buildings}
      />
    </div>
  )
}

