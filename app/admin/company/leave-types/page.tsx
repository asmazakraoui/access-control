"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { LeaveTypeForm } from "./leave-type-form"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les types de congés
const allLeaveTypes = [
  { id: 1, name: "Congé annuel", color: "#4CAF50", daysAllowed: 30, carryOver: true, company: "PRINTSECURE" },
  { id: 2, name: "Congé maladie", color: "#F44336", daysAllowed: 15, carryOver: false, company: "PRINTSECURE" },
  { id: 3, name: "Congé maternité", color: "#9C27B0", daysAllowed: 90, carryOver: false, company: "PRINTSECURE" },
  { id: 4, name: "Congé paternité", color: "#3F51B5", daysAllowed: 10, carryOver: false, company: "PRINTSECURE" },
  { id: 5, name: "Congé sans solde", color: "#FF9800", daysAllowed: null, carryOver: false, company: "PRINTSECURE" },
  { id: 6, name: "Congé exceptionnel", color: "#607D8B", daysAllowed: 5, carryOver: false, company: "PRINTSECURE" },
  { id: 7, name: "Congé annuel", color: "#4CAF50", daysAllowed: 25, carryOver: true, company: "TRUSTLINK" },
  { id: 8, name: "Congé maladie", color: "#F44336", daysAllowed: 12, carryOver: false, company: "TRUSTLINK" },
  { id: 9, name: "Congé formation", color: "#2196F3", daysAllowed: 10, carryOver: true, company: "TRUSTLINK" },
]

export default function LeaveTypesPage() {
  const { selectedCompany } = useCompany()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedLeaveType, setSelectedLeaveType] = useState<(typeof allLeaveTypes)[0] | undefined>(undefined)
  const [leaveTypes, setLeaveTypes] = useState(allLeaveTypes)

  // Filtrer les types de congés en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setLeaveTypes(allLeaveTypes.filter((leaveType) => leaveType.company === selectedCompany))
    } else {
      setLeaveTypes(allLeaveTypes)
    }
  }, [selectedCompany])

  const handleAddLeaveType = () => {
    setSelectedLeaveType(undefined)
    setIsFormOpen(true)
  }

  const handleEditLeaveType = (leaveType: (typeof leaveTypes)[0]) => {
    setSelectedLeaveType(leaveType)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setSelectedLeaveType(undefined)
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des types de congés
          {selectedCompany && ` - ${selectedCompany}`}
        </h2>
        <Button onClick={handleAddLeaveType} className="bg-black hover:bg-gray-800">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un type de congé
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[300px]">Nom</TableHead>
                <TableHead className="w-[200px]">Jours autorisés</TableHead>
                <TableHead className="w-[200px]">Report</TableHead>
                <TableHead className="w-[150px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveTypes.map((leaveType) => (
                <TableRow key={leaveType.id} className="border-t">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: leaveType.color }}></div>
                      <span className="font-medium">{leaveType.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{leaveType.daysAllowed !== null ? leaveType.daysAllowed : "Illimité"}</TableCell>
                  <TableCell>{leaveType.carryOver ? "Oui" : "Non"}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-4">
                      <Button variant="ghost" size="icon" onClick={() => handleEditLeaveType(leaveType)}>
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
        </CardContent>
      </Card>

      {/* Formulaire modal pour ajouter/modifier un type de congé */}
      <LeaveTypeForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        leaveType={selectedLeaveType}
        company={selectedCompany}
      />
    </div>
  )
}

