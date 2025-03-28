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

interface AccessSystemFormProps {
  isOpen: boolean
  onClose: () => void
  accessSystem?: {
    id: string
    brand: string
    model: string
    ipAddress: string
    port: string
    door: string
    building: string
    company?: string
  }
  buildings: {
    id: number
    name: string
    company: string
  }[]
}

export function AccessSystemForm({ isOpen, onClose, accessSystem, buildings }: AccessSystemFormProps) {
  const { selectedCompany } = useCompany()

  const [formData, setFormData] = useState({
    brand: accessSystem?.brand || "",
    model: accessSystem?.model || "",
    ipAddress: accessSystem?.ipAddress || "",
    port: accessSystem?.port || "1471",
    door: accessSystem?.door || "",
    building: accessSystem?.building || "",
    company: accessSystem?.company || selectedCompany || "",
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{accessSystem ? "Modifier le système d'accès" : "Ajouter un système d'accès"}</DialogTitle>
          <DialogDescription>
            {accessSystem
              ? "Modifiez les détails du système d'accès ci-dessous."
              : "Remplissez les informations pour ajouter un nouveau système d'accès."}
            {selectedCompany && ` Pour la société: ${selectedCompany}`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Marque
              </Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">
                Modèle
              </Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ipAddress" className="text-right">
                Adresse IP
              </Label>
              <Input
                id="ipAddress"
                name="ipAddress"
                value={formData.ipAddress}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">
                Port
              </Label>
              <Input
                id="port"
                name="port"
                value={formData.port}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="door" className="text-right">
                Porte
              </Label>
              <Input
                id="door"
                name="door"
                value={formData.door}
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

