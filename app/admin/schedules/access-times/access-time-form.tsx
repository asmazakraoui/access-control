"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCompany } from "@/contexts/company-context"

interface AccessTimeFormProps {
  isOpen: boolean
  onClose: () => void
  accessTime?: {
    id: number
    description: string
    period: string
    position: string
    building: string
    department: string
    door: string
    days: string
    company?: string
  }
  periods: { id: number; name: string; company: string }[]
  positions: { id: number; name: string; company: string }[]
  buildings: { id: number; name: string; company: string }[]
  departments: { id: number; name: string; building: string; company: string }[]
  doors: { id: number; name: string; department: string; building: string; company: string }[]
}

const daysOfWeek = [
  { id: "Lun", label: "Lundi" },
  { id: "Mar", label: "Mardi" },
  { id: "Mer", label: "Mercredi" },
  { id: "Jeu", label: "Jeudi" },
  { id: "Ven", label: "Vendredi" },
  { id: "Sam", label: "Samedi" },
  { id: "Dim", label: "Dimanche" },
]

export function AccessTimeForm({
  isOpen,
  onClose,
  accessTime,
  periods,
  positions,
  buildings,
  departments,
  doors,
}: AccessTimeFormProps) {
  const { selectedCompany } = useCompany()

  const [formData, setFormData] = useState({
    description: accessTime?.description || "",
    period: accessTime?.period || "",
    position: accessTime?.position || "",
    building: accessTime?.building || "",
    department: accessTime?.department || "",
    door: accessTime?.door || "",
    days: accessTime?.days ? accessTime.days.split(",") : ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    company: accessTime?.company || selectedCompany || "",
  })

  const [filteredPositions, setFilteredPositions] = useState(positions)
  const [filteredDepartments, setFilteredDepartments] = useState(departments)
  const [filteredDoors, setFilteredDoors] = useState(doors)

  // Mettre à jour les positions en fonction de la période sélectionnée
  useEffect(() => {
    // Dans un cas réel, vous filtreriez les positions en fonction de la période
    // Pour cet exemple, nous utilisons simplement toutes les positions disponibles
    setFilteredPositions(positions)
  }, [formData.period, positions])

  // Mettre à jour les départements en fonction du bâtiment sélectionné
  useEffect(() => {
    if (formData.building) {
      setFilteredDepartments(departments.filter((dept) => dept.building === formData.building))
      if (
        formData.department &&
        !departments.some((d) => d.name === formData.department && d.building === formData.building)
      ) {
        setFormData((prev) => ({ ...prev, department: "" }))
      }
    } else {
      setFilteredDepartments([])
      setFormData((prev) => ({ ...prev, department: "" }))
    }
  }, [formData.building, departments, formData.department])

  // Mettre à jour les portes en fonction du département sélectionné
  useEffect(() => {
    if (formData.department && formData.building) {
      setFilteredDoors(
        doors.filter((door) => door.department === formData.department && door.building === formData.building),
      )
      if (
        formData.door &&
        !doors.some(
          (d) => d.name === formData.door && d.department === formData.department && d.building === formData.building,
        )
      ) {
        setFormData((prev) => ({ ...prev, door: "" }))
      }
    } else {
      setFilteredDoors([])
      setFormData((prev) => ({ ...prev, door: "" }))
    }
  }, [formData.department, formData.building, doors, formData.door])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const days = [...prev.days]
      if (days.includes(day)) {
        return { ...prev, days: days.filter((d) => d !== day) }
      } else {
        return { ...prev, days: [...days, day] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique pour sauvegarder les données
    const dataToSave = {
      ...formData,
      days: formData.days.join(","),
    }
    console.log("Données du formulaire:", dataToSave)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{accessTime ? "Modifier le temps d'accès" : "Ajouter un temps d'accès"}</DialogTitle>
          <DialogDescription>
            {accessTime
              ? "Modifiez les détails du temps d'accès ci-dessous."
              : "Remplissez les informations pour ajouter un nouveau temps d'accès."}
            {selectedCompany && ` Pour la société: ${selectedCompany}`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Période
              </Label>
              <Select value={formData.period} onValueChange={(value) => handleSelectChange("period", value)}>
                <SelectTrigger id="period" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.name}>
                      {period.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Poste
              </Label>
              <Select
                value={formData.position}
                onValueChange={(value) => handleSelectChange("position", value)}
                disabled={!formData.period}
              >
                <SelectTrigger id="position" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un poste" />
                </SelectTrigger>
                <SelectContent>
                  {filteredPositions.map((position) => (
                    <SelectItem key={position.id} value={position.name}>
                      {position.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="building" className="text-right">
                Bâtiment
              </Label>
              <Select value={formData.building} onValueChange={(value) => handleSelectChange("building", value)}>
                <SelectTrigger id="building" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un bâtiment" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.name}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Département
              </Label>
              <Select
                value={formData.department}
                onValueChange={(value) => handleSelectChange("department", value)}
                disabled={!formData.building}
              >
                <SelectTrigger id="department" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDepartments.map((department) => (
                    <SelectItem key={department.id} value={department.name}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="door" className="text-right">
                Porte
              </Label>
              <Select
                value={formData.door}
                onValueChange={(value) => handleSelectChange("door", value)}
                disabled={!formData.department}
              >
                <SelectTrigger id="door" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une porte" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDoors.map((door) => (
                    <SelectItem key={door.id} value={door.name}>
                      {door.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Jours</Label>
              <div className="col-span-3 space-y-2">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${day.id}`}
                      checked={formData.days.includes(day.id)}
                      onCheckedChange={() => handleDayToggle(day.id)}
                    />
                    <Label htmlFor={`day-${day.id}`} className="font-normal">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

