"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Clock, Calendar, DoorOpen } from "lucide-react"
import { AccessTimeForm } from "./access-time-form"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les temps d'accès
const allAccessTimes = [
  {
    id: 1,
    description: "Accès standard - Semaine",
    period: "double séance",
    position: "morning",
    building: "Mghira",
    department: "Administration",
    door: "Entrée principale",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "PRINTSECURE",
  },
  {
    id: 2,
    description: "Accès standard - Après-midi",
    period: "double séance",
    position: "afternoon",
    building: "Mghira",
    department: "Administration",
    door: "Entrée principale",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "PRINTSECURE",
  },
  {
    id: 3,
    description: "Accès Ramadan",
    period: "Ramadan",
    position: "Ramadan",
    building: "Mghira",
    department: "Administration",
    door: "Entrée principale",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "PRINTSECURE",
  },
  {
    id: 4,
    description: "Accès 24h/24h - Sécurité",
    period: "24h/24h",
    position: "toute la journée",
    building: "Mghira",
    department: "Sécurité",
    door: "Entrée principale",
    days: "Lun,Mar,Mer,Jeu,Ven,Sam,Dim",
    company: "PRINTSECURE",
  },
  {
    id: 5,
    description: "Accès Production - Matin",
    period: "double séance",
    position: "morning",
    building: "Mghira",
    department: "Production",
    door: "Entrée production",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "PRINTSECURE",
  },
  {
    id: 6,
    description: "Accès Production - Après-midi",
    period: "double séance",
    position: "afternoon",
    building: "Mghira",
    department: "Production",
    door: "Entrée production",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "PRINTSECURE",
  },
  {
    id: 7,
    description: "Accès Technique - Maintenance",
    period: "24h/24h",
    position: "toute la journée",
    building: "Mghira",
    department: "Technique",
    door: "Entrée technique",
    days: "Lun,Mar,Mer,Jeu,Ven,Sam",
    company: "PRINTSECURE",
  },
  {
    id: 8,
    description: "Accès SIM - Standard",
    period: "double séance",
    position: "morning",
    building: "Mghira",
    department: "SIM",
    door: "SIM IN / OUT",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "PRINTSECURE",
  },
  {
    id: 9,
    description: "Accès Ramadan - SIM",
    period: "Ramadan",
    position: "Ramadan",
    building: "Mghira",
    department: "SIM",
    door: "SIM IN / OUT",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "PRINTSECURE",
  },
  {
    id: 10,
    description: "Accès Administration - TRUSTLINK",
    period: "séance unique",
    position: "Horaire standard",
    building: "Bizerte",
    department: "Administration",
    door: "Entrée principale",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "TRUSTLINK",
  },
  {
    id: 11,
    description: "Accès Technique - TRUSTLINK",
    period: "séance unique",
    position: "Horaire standard",
    building: "Sousse",
    department: "Technique",
    door: "Salle serveur",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "TRUSTLINK",
  },
  {
    id: 12,
    description: "Accès Ramadan - TRUSTLINK",
    period: "Ramadan",
    position: "Ramadan",
    building: "Bizerte",
    department: "Administration",
    door: "Entrée principale",
    days: "Lun,Mar,Mer,Jeu,Ven",
    company: "TRUSTLINK",
  },
]

// Données d'exemple pour les périodes
const allPeriods = [
  { id: 1, name: "double séance", company: "PRINTSECURE" },
  { id: 2, name: "24h/24h", company: "PRINTSECURE" },
  { id: 3, name: "Ramadan", company: "PRINTSECURE" },
  { id: 4, name: "Ramadan 2", company: "PRINTSECURE" },
  { id: 5, name: "test nuit", company: "PRINTSECURE" },
  { id: 6, name: "séance unique", company: "PRINTSECURE" },
  { id: 7, name: "séance unique", company: "TRUSTLINK" },
  { id: 8, name: "Ramadan", company: "TRUSTLINK" },
]

// Données d'exemple pour les postes (horaires)
const allPositions = [
  { id: 1, name: "morning", company: "PRINTSECURE" },
  { id: 2, name: "afternoon", company: "PRINTSECURE" },
  { id: 3, name: "toute la journée", company: "PRINTSECURE" },
  { id: 4, name: "Ramadan", company: "PRINTSECURE" },
  { id: 5, name: "Horaire standard", company: "TRUSTLINK" },
  { id: 6, name: "Ramadan", company: "TRUSTLINK" },
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
  { id: 1, name: "Administration", building: "Mghira", company: "PRINTSECURE" },
  { id: 2, name: "Production", building: "Mghira", company: "PRINTSECURE" },
  { id: 3, name: "Technique", building: "Mghira", company: "PRINTSECURE" },
  { id: 4, name: "SIM", building: "Mghira", company: "PRINTSECURE" },
  { id: 5, name: "Sécurité", building: "Mghira", company: "PRINTSECURE" },
  { id: 6, name: "Administration", building: "Bizerte", company: "TRUSTLINK" },
  { id: 7, name: "Technique", building: "Sousse", company: "TRUSTLINK" },
]

// Données d'exemple pour les portes
const allDoors = [
  { id: 1, name: "Entrée principale", department: "Administration", building: "Mghira", company: "PRINTSECURE" },
  { id: 2, name: "Entrée production", department: "Production", building: "Mghira", company: "PRINTSECURE" },
  { id: 3, name: "Entrée technique", department: "Technique", building: "Mghira", company: "PRINTSECURE" },
  { id: 4, name: "SIM IN / OUT", department: "SIM", building: "Mghira", company: "PRINTSECURE" },
  { id: 5, name: "Entrée principale", department: "Administration", building: "Bizerte", company: "TRUSTLINK" },
  { id: 6, name: "Salle serveur", department: "Technique", building: "Sousse", company: "TRUSTLINK" },
]

export default function AccessTimesPage() {
  const { selectedCompany } = useCompany()
  const [searchTerm, setSearchTerm] = useState("")
  const [periodFilter, setPeriodFilter] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedAccessTime, setSelectedAccessTime] = useState<(typeof allAccessTimes)[0] | undefined>(undefined)

  const [accessTimes, setAccessTimes] = useState(allAccessTimes)
  const [periods, setPeriods] = useState(allPeriods)
  const [positions, setPositions] = useState(allPositions)
  const [buildings, setBuildings] = useState(allBuildings)
  const [departments, setDepartments] = useState(allDepartments)
  const [doors, setDoors] = useState(allDoors)
  const [filteredDepartments, setFilteredDepartments] = useState(allDepartments)

  // Filtrer les données en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setAccessTimes(allAccessTimes.filter((time) => time.company === selectedCompany))
      setPeriods(allPeriods.filter((period) => period.company === selectedCompany))
      setPositions(allPositions.filter((position) => position.company === selectedCompany))
      setBuildings(allBuildings.filter((building) => building.company === selectedCompany))
      setDepartments(allDepartments.filter((department) => department.company === selectedCompany))
      setDoors(allDoors.filter((door) => door.company === selectedCompany))

      // Réinitialiser les filtres si nécessaire
      if (periodFilter && !allPeriods.some((p) => p.name === periodFilter && p.company === selectedCompany)) {
        setPeriodFilter("")
      }
      if (buildingFilter && !allBuildings.some((b) => b.name === buildingFilter && b.company === selectedCompany)) {
        setBuildingFilter("")
        setDepartmentFilter("")
      }
    } else {
      setAccessTimes(allAccessTimes)
      setPeriods(allPeriods)
      setPositions(allPositions)
      setBuildings(allBuildings)
      setDepartments(allDepartments)
      setDoors(allDoors)
    }
  }, [selectedCompany, periodFilter, buildingFilter])

  // Filtrer les départements en fonction du bâtiment sélectionné
  useEffect(() => {
    if (buildingFilter) {
      setFilteredDepartments(departments.filter((dept) => dept.building === buildingFilter))
      if (departmentFilter && !departments.some((d) => d.name === departmentFilter && d.building === buildingFilter)) {
        setDepartmentFilter("")
      }
    } else {
      setFilteredDepartments(departments)
    }
  }, [buildingFilter, departments, departmentFilter])

  // Filtrer les temps d'accès en fonction des critères de recherche
  const filteredAccessTimes = accessTimes.filter((time) => {
    const searchMatch = time.description.toLowerCase().includes(searchTerm.toLowerCase())
    const periodMatch = periodFilter ? time.period === periodFilter : true
    const buildingMatch = buildingFilter ? time.building === buildingFilter : true
    const departmentMatch = departmentFilter ? time.department === departmentFilter : true

    return searchMatch && periodMatch && buildingMatch && departmentMatch
  })

  const handleEdit = (accessTime: (typeof accessTimes)[0]) => {
    setSelectedAccessTime(accessTime)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedAccessTime(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedAccessTime(undefined)
  }

  // Calculer les statistiques
  const standardAccessTimes = accessTimes.filter(
    (time) => time.period === "double séance" || time.period === "séance unique",
  ).length
  const ramadanAccessTimes = accessTimes.filter((time) => time.period.toLowerCase().includes("ramadan")).length
  const fullTimeAccessTimes = accessTimes.filter((time) => time.period === "24h/24h").length

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion temps d'accès
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
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label htmlFor="period" className="text-sm font-medium">
                Période
              </label>
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger id="period">
                  <SelectValue placeholder="Toutes les périodes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les périodes</SelectItem>
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.name}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="building" className="text-sm font-medium">
                Bâtiment
              </label>
              <Select value={buildingFilter} onValueChange={setBuildingFilter}>
                <SelectTrigger id="building">
                  <SelectValue placeholder="Tous les bâtiments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les bâtiments</SelectItem>
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
              <Select value={departmentFilter} onValueChange={setDepartmentFilter} disabled={!buildingFilter}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Tous les départements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  {filteredDepartments.map((department) => (
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
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total temps d'accès</p>
              <p className="text-2xl font-bold">{accessTimes.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Accès standard</p>
              <p className="text-2xl font-bold">{standardAccessTimes}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Accès Ramadan</p>
              <p className="text-2xl font-bold">{ramadanAccessTimes}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <DoorOpen className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Accès 24h/24h</p>
              <p className="text-2xl font-bold">{fullTimeAccessTimes}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Poste</TableHead>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Porte</TableHead>
                <TableHead>Jours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccessTimes.map((accessTime) => (
                <TableRow key={accessTime.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {accessTime.description}
                    </div>
                  </TableCell>
                  <TableCell>{accessTime.period}</TableCell>
                  <TableCell>{accessTime.position}</TableCell>
                  <TableCell>{accessTime.building}</TableCell>
                  <TableCell>{accessTime.department}</TableCell>
                  <TableCell>{accessTime.door}</TableCell>
                  <TableCell>{accessTime.days}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(accessTime)}>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire pour ajouter/modifier un temps d'accès */}
      <AccessTimeForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        accessTime={selectedAccessTime}
        periods={periods}
        positions={positions}
        buildings={buildings}
        departments={departments}
        doors={doors}
      />
    </div>
  )
}

