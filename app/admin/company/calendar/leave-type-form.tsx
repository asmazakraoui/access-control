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
import { Switch } from "@/components/ui/switch"

interface LeaveTypeFormProps {
  isOpen: boolean
  onClose: () => void
  leaveType?: {
    id: number
    name: string
    color: string
    daysAllowed: number | null
    carryOver: boolean
  }
}

export function LeaveTypeForm({ isOpen, onClose, leaveType }: LeaveTypeFormProps) {
  const [formData, setFormData] = useState({
    name: leaveType?.name || "",
    color: leaveType?.color || "#4CAF50",
    daysAllowed:
      leaveType?.daysAllowed !== null && leaveType?.daysAllowed !== undefined ? String(leaveType.daysAllowed) : "",
    unlimited: leaveType?.daysAllowed === null,
    carryOver: leaveType?.carryOver || false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique pour sauvegarder les données
    const dataToSave = {
      ...formData,
      daysAllowed: formData.unlimited ? null : Number.parseInt(formData.daysAllowed),
    }
    console.log("Données du formulaire:", dataToSave)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{leaveType ? "Modifier le type de congé" : "Ajouter un type de congé"}</DialogTitle>
          <DialogDescription>
            {leaveType
              ? "Modifiez les détails du type de congé ci-dessous."
              : "Remplissez les informations pour ajouter un nouveau type de congé."}
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
              <Label htmlFor="color" className="text-right">
                Couleur
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="h-10 w-16"
                />
                <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: formData.color }}></div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unlimited" className="text-right">
                Jours illimités
              </Label>
              <div className="col-span-3">
                <Switch
                  id="unlimited"
                  checked={formData.unlimited}
                  onCheckedChange={(checked) => handleSwitchChange("unlimited", checked)}
                />
              </div>
            </div>
            {!formData.unlimited && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="daysAllowed" className="text-right">
                  Jours autorisés
                </Label>
                <Input
                  id="daysAllowed"
                  name="daysAllowed"
                  type="number"
                  min="1"
                  value={formData.daysAllowed}
                  onChange={handleChange}
                  className="col-span-3"
                  required={!formData.unlimited}
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carryOver" className="text-right">
                Report autorisé
              </Label>
              <div className="col-span-3">
                <Switch
                  id="carryOver"
                  checked={formData.carryOver}
                  onCheckedChange={(checked) => handleSwitchChange("carryOver", checked)}
                />
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

