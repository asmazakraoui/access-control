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
import { Checkbox } from "@/components/ui/checkbox"

// Données d'exemple pour les bâtiments
const buildings = [
  { id: 1, name: "Mghira" },
  { id: 2, name: "Tunis Centre" },
  { id: 3, name: "Sousse" },
  { id: 4, name: "Sfax" },
  { id: 5, name: "Bizerte" },
]

// Données d'exemple pour les portes
const doors = [
  { id: "1", name: "Usine 1er", building: "Mghira" },
  { id: "2", name: "Découpe Reception", building: "Mghira" },
  { id: "3", name: "SIM pack IN/OUT", building: "Mghira" },
  { id: "4", name: "Informatique/finance", building: "Mghira" },
  { id: "5", name: "SIM IN / OUT", building: "Mghira" },
]

interface AccessZoneFormProps {
  isOpen: boolean
  onClose: () => void
  accessZone?: {
    id: string
    name: string
    building: string
    doors: string[]
  }
}

export function AccessZoneForm({ isOpen, onClose, accessZone }: AccessZoneFormProps) {
  const [formData, setFormData] = useState({
    name: accessZone?.name || "",
    building: accessZone?.building || "",
    doors: accessZone?.doors || [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDoorToggle = (doorName: string) => {
    setFormData((prev) => {
      const doors = [...prev.doors]
      if (doors.includes(doorName)) {
        return { ...prev, doors: doors.filter((d) => d !== doorName) }
      } else {
        return { ...prev, doors: [...doors, doorName] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique pour sauvegarder les données
    console.log("Données du formulaire:", formData)
    onClose()
  }

  // Filtrer les portes par bâtiment sélectionné
  const filteredDoors = doors.filter((door) => !formData.building || door.building === formData.building)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{accessZone ? "Modifier la zone d'accès" : "Ajouter une zone d'accès"}</DialogTitle>
          <DialogDescription>
            {accessZone
              ? "Modifiez les détails de la zone d'accès ci-dessous."
              : "Remplissez les informations pour ajouter une nouvelle zone d'accès."}
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

            <div className="grid grid-cols-4 gap-4">
              <Label className="text-right pt-2">Portes</Label>
              <div className="col-span-3 space-y-2">
                {filteredDoors.length > 0 ? (
                  filteredDoors.map((door) => (
                    <div key={door.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`door-${door.id}`}
                        checked={formData.doors.includes(door.name)}
                        onCheckedChange={() => handleDoorToggle(door.name)}
                      />
                      <Label htmlFor={`door-${door.id}`} className="font-normal">
                        {door.name}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {formData.building
                      ? "Aucune porte disponible pour ce bâtiment."
                      : "Veuillez d'abord sélectionner un bâtiment."}
                  </p>
                )}
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

