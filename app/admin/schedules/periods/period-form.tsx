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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useCompany } from "@/contexts/company-context"

interface PeriodFormProps {
  isOpen: boolean
  onClose: () => void
  period?: {
    id: number
    description: string
    startDate: string
    endDate: string
    company?: string
  }
}

export function PeriodForm({ isOpen, onClose, period }: PeriodFormProps) {
  const { selectedCompany } = useCompany()

  // Fonction pour convertir une date au format DD/MM/YYYY en objet Date
  function parseDate(dateString: string): Date {
    if (!dateString) return new Date()
    const [day, month, year] = dateString.split("/").map(Number)
    return new Date(year, month - 1, day)
  }

  // Fonction pour formater une date en DD/MM/YYYY
  function formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy")
  }

  const [formData, setFormData] = useState({
    description: period?.description || "",
    startDate: period ? parseDate(period.startDate) : new Date(),
    endDate: period ? parseDate(period.endDate) : new Date(),
    company: period?.company || selectedCompany || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, startDate: date }))
    }
  }

  const handleEndDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, endDate: date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici, vous implémenteriez la logique pour sauvegarder les données
    const dataToSave = {
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
    }
    console.log("Données du formulaire:", dataToSave)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{period ? "Modifier la période" : "Ajouter une période"}</DialogTitle>
          <DialogDescription>
            {period
              ? "Modifiez les détails de la période ci-dessous."
              : "Remplissez les informations pour ajouter une nouvelle période."}
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
              <Label htmlFor="startDate" className="text-right">
                Date début
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={handleStartDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                Date fin
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "PPP", { locale: fr })
                      ) : (
                        <span>Sélectionner une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={formData.endDate} onSelect={handleEndDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
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

