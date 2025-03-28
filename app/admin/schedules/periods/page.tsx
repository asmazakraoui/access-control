"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, Calendar, Clock } from "lucide-react"
import { PeriodForm } from "./period-form"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les périodes de travail
const allPeriods = [
  {
    id: 1,
    description: "double séance",
    startDate: "01/01/1970",
    endDate: "01/01/2050",
    company: "PRINTSECURE",
  },
  {
    id: 2,
    description: "24h/24h",
    startDate: "16/01/2019",
    endDate: "14/01/2030",
    company: "PRINTSECURE",
  },
  {
    id: 3,
    description: "Ramadan",
    startDate: "27/05/2017",
    endDate: "26/06/2017",
    company: "PRINTSECURE",
  },
  {
    id: 4,
    description: "Ramadan 2",
    startDate: "27/05/2017",
    endDate: "26/07/2017",
    company: "PRINTSECURE",
  },
  {
    id: 5,
    description: "test nuit",
    startDate: "01/01/2006",
    endDate: "31/12/2050",
    company: "PRINTSECURE",
  },
  {
    id: 6,
    description: "séance unique",
    startDate: "22/08/2006",
    endDate: "22/08/2019",
    company: "PRINTSECURE",
  },
  {
    id: 7,
    description: "emploiProduction",
    startDate: "15/11/2017",
    endDate: "01/01/2020",
    company: "PRINTSECURE",
  },
  {
    id: 8,
    description: "test",
    startDate: "12/02/2018",
    endDate: "12/02/2018",
    company: "PRINTSECURE",
  },
  {
    id: 9,
    description: "Admin",
    startDate: "18/03/2019",
    endDate: "19/03/2021",
    company: "PRINTSECURE",
  },
  {
    id: 10,
    description: "NO-ACCESS-PERIODE",
    startDate: "18/03/2019",
    endDate: "19/03/2026",
    company: "PRINTSECURE",
  },
  {
    id: 11,
    description: "RamadhanEntree",
    startDate: "01/01/2023",
    endDate: "31/12/2025",
    company: "TRUSTLINK",
  },
  {
    id: 12,
    description: "Ramadan",
    startDate: "10/03/2023",
    endDate: "10/04/2023",
    company: "TRUSTLINK",
  },
  {
    id: 13,
    description: "séance unique",
    startDate: "01/06/2023",
    endDate: "31/08/2023",
    company: "TRUSTLINK",
  },
]

export default function PeriodsPage() {
  const { selectedCompany } = useCompany()
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<(typeof allPeriods)[0] | undefined>(undefined)
  const [periods, setPeriods] = useState(allPeriods)

  // Filtrer les périodes en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setPeriods(allPeriods.filter((period) => period.company === selectedCompany))
    } else {
      setPeriods(allPeriods)
    }
  }, [selectedCompany])

  // Filtrer les périodes en fonction des critères de recherche
  const filteredPeriods = periods.filter((period) => {
    return period.description.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleEdit = (period: (typeof periods)[0]) => {
    setSelectedPeriod(period)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedPeriod(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedPeriod(undefined)
  }

  // Calculer les statistiques
  const activePeriods = periods.filter((p) => {
    const today = new Date()
    const endDate = parseDate(p.endDate)
    return endDate >= today
  }).length

  const expiredPeriods = periods.filter((p) => {
    const today = new Date()
    const endDate = parseDate(p.endDate)
    return endDate < today
  }).length

  const ramadanPeriods = periods.filter((p) => p.description.toLowerCase().includes("ramadan")).length

  // Fonction pour convertir une date au format DD/MM/YYYY en objet Date
  function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des périodes de travail
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
                placeholder="Rechercher une période..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total des périodes</p>
              <p className="text-2xl font-bold">{periods.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-green-50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Périodes actives</p>
              <p className="text-2xl font-bold">{activePeriods}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-red-50 p-3 rounded-full">
              <Clock className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Périodes expirées</p>
              <p className="text-2xl font-bold">{expiredPeriods}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Périodes Ramadan</p>
              <p className="text-2xl font-bold">{ramadanPeriods}</p>
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
                <TableHead>Date début</TableHead>
                <TableHead>Date fin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPeriods.map((period) => (
                <TableRow key={period.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {period.description}
                    </div>
                  </TableCell>
                  <TableCell>{period.startDate}</TableCell>
                  <TableCell>{period.endDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(period)}>
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire pour ajouter/modifier une période */}
      <PeriodForm isOpen={isFormOpen} onClose={handleCloseForm} period={selectedPeriod} />
    </div>
  )
}

