"use client"

import type React from "react"

import { useState } from "react"
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
import { useCompany } from "@/contexts/company-context"

interface DoorFormProps {
  isOpen: boolean
  onClose: () => void
  door?: {
    id: string
    name: string
    department: string
    building: string
    company?: string
  }
  buildings: {
    id: number
    name: string
    company: string
  }[]
  departments: {
    id: number
    name: string
    company: string
  }[]
}

export function DoorForm({ isOpen, onClose, door, buildings, departments }: DoorFormProps) {
  const { selectedCompany } = useCompany()

  const [formData, setFormData] = useState({
    name: door?.name || "",
    department: door?.department || "",
    building: door?.building || "",
    company: door?.company || selectedCompany || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique pour sauvegarder les données
    console.log("Données du formulaire:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{door ? "Modifier la porte" : "Ajouter une porte"}</DialogTitle>
          <DialogDescription>
            {door
              ? "Modifiez les détails de la porte ci-dessous."
              : "Remplissez les informations pour ajouter une nouvelle porte."}
            {selectedCompany && ` Pour la société: ${selectedCompany}`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Département
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                <SelectTrigger id="department" className="col-span-3">
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department.id} value={department.name}>
                      {department.name}
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

