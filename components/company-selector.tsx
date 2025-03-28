"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les sociétés et filiales
const companies = [
  { id: 1, name: "PRINTSECURE" },
  { id: 2, name: "TRUSTLINK" },
]

const subsidiaries = {
  PRINTSECURE: [
    { id: 1, name: "Mghira" },
    { id: 2, name: "Tunis Centre" },
    { id: 3, name: "Sfax" },
  ],
  TRUSTLINK: [
    { id: 4, name: "Sousse" },
    { id: 5, name: "Bizerte" },
  ],
}

export function CompanySelector() {
  const { selectedCompany, selectedSubsidiary, setSelectedCompany, setSelectedSubsidiary } = useCompany()
  const [availableSubsidiaries, setAvailableSubsidiaries] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    if (selectedCompany) {
      setAvailableSubsidiaries(subsidiaries[selectedCompany as keyof typeof subsidiaries] || [])
      if (!subsidiaries[selectedCompany as keyof typeof subsidiaries]?.some((s) => s.name === selectedSubsidiary)) {
        setSelectedSubsidiary("")
      }
    } else {
      setAvailableSubsidiaries([])
      setSelectedSubsidiary("")
    }
  }, [selectedCompany, selectedSubsidiary, setSelectedSubsidiary])

  return (
    <div className="flex items-center gap-4 bg-gray-100 px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Société</span>
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="h-8 w-[180px] bg-white">
            <SelectValue placeholder="Choisir" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.name}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Filiale</span>
        <Select value={selectedSubsidiary} onValueChange={setSelectedSubsidiary} disabled={!selectedCompany}>
          <SelectTrigger className="h-8 w-[180px] bg-white">
            <SelectValue placeholder="Choisir" />
          </SelectTrigger>
          <SelectContent>
            {availableSubsidiaries.map((subsidiary) => (
              <SelectItem key={subsidiary.id} value={subsidiary.name}>
                {subsidiary.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

