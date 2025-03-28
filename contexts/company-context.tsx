"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type CompanyContextType = {
  selectedCompany: string
  selectedSubsidiary: string
  setSelectedCompany: (company: string) => void
  setSelectedSubsidiary: (subsidiary: string) => void
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<string>("")

  return (
    <CompanyContext.Provider
      value={{
        selectedCompany,
        selectedSubsidiary,
        setSelectedCompany,
        setSelectedSubsidiary,
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}

export function useCompany() {
  const context = useContext(CompanyContext)
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider")
  }
  return context
}

