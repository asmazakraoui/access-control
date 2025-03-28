"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Clock, AlarmClock } from "lucide-react"
import { PositionForm } from "./position-form"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les postes (horaires de travail)
const allPositions = [
  {
    id: 1,
    description: "morning",
    startTime: "07:30",
    endTime: "12:00",
    company: "PRINTSECURE",
  },
  {
    id: 2,
    description: "afternoon",
    startTime: "14:00",
    endTime: "18:00",
    company: "PRINTSECURE",
  },
  {
    id: 3,
    description: "toute la journée",
    startTime: "08:00",
    endTime: "23:59",
    company: "PRINTSECURE",
  },
  {
    id: 4,
    description: "morning2",
    startTime: "07:30",
    endTime: "12:00",
    company: "PRINTSECURE",
  },
  {
    id: 5,
    description: "afternoon2",
    startTime: "13:00",
    endTime: "17:00",
    company: "PRINTSECURE",
  },
  {
    id: 6,
    description: "Ramadan",
    startTime: "06:30",
    endTime: "15:15",
    company: "PRINTSECURE",
  },
  {
    id: 7,
    description: "Ramadan1",
    startTime: "06:30",
    endTime: "08:01",
    company: "PRINTSECURE",
  },
  {
    id: 8,
    description: "ramadan2",
    startTime: "14:00",
    endTime: "15:01",
    company: "PRINTSECURE",
  },
  {
    id: 9,
    description: "Ramadan samedi 1",
    startTime: "06:30",
    endTime: "08:01",
    company: "PRINTSECURE",
  },
  {
    id: 10,
    description: "ramadan samedi 2",
    startTime: "12:00",
    endTime: "13:00",
    company: "PRINTSECURE",
  },
  {
    id: 11,
    description: "Horaire standard",
    startTime: "08:00",
    endTime: "17:00",
    company: "TRUSTLINK",
  },
  {
    id: 12,
    description: "Mi-temps matin",
    startTime: "08:00",
    endTime: "12:00",
    company: "TRUSTLINK",
  },
  {
    id: 13,
    description: "Mi-temps après-midi",
    startTime: "13:00",
    endTime: "17:00",
    company: "TRUSTLINK",
  },
  {
    id: 14,
    description: "Ramadan",
    startTime: "07:00",
    endTime: "15:00",
    company: "TRUSTLINK",
  },
]

export default function PositionsPage() {
  const { selectedCompany } = useCompany()
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<(typeof allPositions)[0] | undefined>(undefined)
  const [positions, setPositions] = useState(allPositions)

  // Filtrer les postes en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setPositions(allPositions.filter((position) => position.company === selectedCompany))
    } else {
      setPositions(allPositions)
    }
  }, [selectedCompany])

  // Filtrer les postes en fonction des critères de recherche
  const filteredPositions = positions.filter((position) => {
    return position.description.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleEdit = (position: (typeof positions)[0]) => {
    setSelectedPosition(position)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedPosition(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedPosition(undefined)
  }

  // Calculer les statistiques
  const morningPositions = positions.filter((p) => p.startTime < "12:00" && p.endTime <= "12:00").length

  const afternoonPositions = positions.filter((p) => p.startTime >= "12:00").length

  const fullDayPositions = positions.filter((p) => p.startTime < "12:00" && p.endTime > "12:00").length

  const ramadanPositions = positions.filter((p) => p.description.toLowerCase().includes("ramadan")).length

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des postes
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
              <label htmlFor="search" className="text-sm font-medium">
                Recherche
              </label>
              <Input
                id="search"
                placeholder="Rechercher un poste..."
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
              <p className="text-sm font-medium text-gray-500">Total des postes</p>
              <p className="text-2xl font-bold">{positions.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <AlarmClock className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Postes du matin</p>
              <p className="text-2xl font-bold">{morningPositions}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <AlarmClock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Postes de l'après-midi</p>
              <p className="text-2xl font-bold">{afternoonPositions}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <AlarmClock className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Postes Ramadan</p>
              <p className="text-2xl font-bold">{ramadanPositions}</p>
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
                <TableHead>Heure début</TableHead>
                <TableHead>Heure fin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPositions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {position.description}
                    </div>
                  </TableCell>
                  <TableCell>{position.startTime}</TableCell>
                  <TableCell>{position.endTime}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(position)}>
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

      {/* Formulaire pour ajouter/modifier un poste */}
      <PositionForm isOpen={isFormOpen} onClose={handleCloseForm} position={selectedPosition} />
    </div>
  )
}

