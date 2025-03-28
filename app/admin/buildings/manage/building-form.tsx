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

// Importer le hook useCompany
import { useCompany } from "@/contexts/company-context"

interface BuildingFormProps {
  isOpen: boolean
  onClose: () => void
  building?: {
    id: number
    name: string
    address: string
    phone: string
    company: string
  }
}

export function BuildingForm({ isOpen, onClose, building }: BuildingFormProps) {
  // Dans la fonction BuildingForm, ajouter:
  const { selectedCompany } = useCompany()

  // Modifier l'initialisation de formData pour utiliser la société sélectionnée:
  const [formData, setFormData] = useState({
    name: building?.name || "",
    address: building?.address || "",
    phone: building?.phone || "",
    company: building?.company || selectedCompany || "",
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
          <DialogTitle>{building ? "Modifier le bâtiment" : "Ajouter un bâtiment"}</DialogTitle>
          <DialogDescription>
            {building
              ? "Modifiez les détails du bâtiment ci-dessous."
              : "Remplissez les informations pour ajouter un nouveau bâtiment."}
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
              <Label htmlFor="address" className="text-right">
                Adresse
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Téléphone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Société
              </Label>
              <Select value={formData.company} onValueChange={(value) => handleSelectChange("company", value)}>
                <SelectTrigger id="company" className="col-span-3">
                  <SelectValue placeholder="Sélectionner une société" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRINTSECURE">PRINTSECURE</SelectItem>
                  <SelectItem value="TRUSTLINK">TRUSTLINK</SelectItem>
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

