"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, CalendarIcon, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { HolidayForm } from "../calendar/holiday-form"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getDay,
} from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useCompany } from "@/contexts/company-context"

// Données d'exemple pour les jours fériés
const allHolidays = [
  {
    id: 1,
    name: "Jour de l'an",
    date: new Date(2025, 0, 1),
    type: "national",
    color: "#FF5733",
    company: "PRINTSECURE",
  },
  {
    id: 2,
    name: "Fête du travail",
    date: new Date(2025, 4, 1),
    type: "national",
    color: "#FF5733",
    company: "PRINTSECURE",
  },
  {
    id: 3,
    name: "Fête de l'indépendance",
    date: new Date(2025, 2, 20),
    type: "national",
    color: "#FF5733",
    company: "PRINTSECURE",
  },
  {
    id: 4,
    name: "Aïd El Fitr",
    date: new Date(2025, 3, 10),
    type: "religious",
    color: "#33A8FF",
    company: "PRINTSECURE",
  },
  {
    id: 5,
    name: "Aïd El Idha",
    date: new Date(2025, 6, 17),
    type: "religious",
    color: "#33A8FF",
    company: "PRINTSECURE",
  },
  {
    id: 6,
    name: "Journée de l'entreprise",
    date: new Date(2025, 8, 15),
    type: "company",
    color: "#33FF57",
    company: "PRINTSECURE",
  },
  { id: 7, name: "Noël", date: new Date(2025, 11, 25), type: "national", color: "#FF5733", company: "PRINTSECURE" },
  {
    id: 8,
    name: "Nouvel An Islamique",
    date: new Date(2025, 6, 29),
    type: "religious",
    color: "#33A8FF",
    company: "PRINTSECURE",
  },
  {
    id: 9,
    name: "Journée de la République",
    date: new Date(2025, 6, 25),
    type: "national",
    color: "#FF5733",
    company: "TRUSTLINK",
  },
  {
    id: 10,
    name: "Journée des Martyrs",
    date: new Date(2025, 3, 9),
    type: "national",
    color: "#FF5733",
    company: "TRUSTLINK",
  },
  {
    id: 11,
    name: "Journée de la Femme",
    date: new Date(2025, 7, 13),
    type: "national",
    color: "#FF5733",
    company: "TRUSTLINK",
  },
  { id: 12, name: "Mouloud", date: new Date(2025, 9, 5), type: "religious", color: "#33A8FF", company: "TRUSTLINK" },
]

export default function HolidaysPage() {
  const { selectedCompany } = useCompany()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isHolidayFormOpen, setIsHolidayFormOpen] = useState(false)
  const [selectedHoliday, setSelectedHoliday] = useState<(typeof allHolidays)[0] | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [holidays, setHolidays] = useState(allHolidays)

  // Filtrer les jours fériés en fonction de la société sélectionnée
  useEffect(() => {
    if (selectedCompany) {
      setHolidays(allHolidays.filter((holiday) => holiday.company === selectedCompany))
    } else {
      setHolidays(allHolidays)
    }
  }, [selectedCompany])

  // Navigation du calendrier
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  // Obtenir les jours du mois actuel
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Obtenir le premier jour de la semaine (0 = dimanche, 1 = lundi, etc.)
  const startDay = getDay(monthStart)

  // Fonction pour déterminer si une date est un jour férié
  const getHolidayForDate = (date: Date) => {
    return holidays.find((holiday) => isSameDay(holiday.date, date))
  }

  // Gestionnaires pour les formulaires de jours fériés
  const handleAddHoliday = (date?: Date) => {
    setSelectedHoliday(undefined)
    setIsHolidayFormOpen(true)
    if (date) {
      setSelectedDate(date)
    }
  }

  const handleEditHoliday = (holiday: (typeof holidays)[0]) => {
    setSelectedHoliday(holiday)
    setIsHolidayFormOpen(true)
  }

  const handleCloseHolidayForm = () => {
    setIsHolidayFormOpen(false)
    setSelectedHoliday(undefined)
    setSelectedDate(null)
  }

  // Créer un tableau pour représenter les semaines du mois
  const createCalendarDays = () => {
    const days = []
    let day = 0

    // Ajouter des jours vides pour le début du mois
    for (let i = 0; i < startDay; i++) {
      days.push(null)
      day++
    }

    // Ajouter les jours du mois
    for (const date of daysInMonth) {
      days.push(date)
      day++
    }

    // Ajouter des jours vides pour compléter la dernière semaine
    while (day % 7 !== 0) {
      days.push(null)
      day++
    }

    return days
  }

  const calendarDays = createCalendarDays()

  // Diviser les jours en semaines
  const weeks = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  return (
    <div className="space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Gestion des jours fériés
          {selectedCompany && ` - ${selectedCompany}`}
        </h2>
        <Button onClick={() => handleAddHoliday()}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un jour férié
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="bg-indigo-50 p-3 rounded-full">
            <CalendarIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total jours fériés</p>
            <p className="text-2xl font-bold">{holidays.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="bg-red-50 p-3 rounded-full">
            <CalendarIcon className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Jours nationaux</p>
            <p className="text-2xl font-bold">{holidays.filter((h) => h.type === "national").length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-full">
            <CalendarIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Jours religieux</p>
            <p className="text-2xl font-bold">{holidays.filter((h) => h.type === "religious").length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-full">
            <CalendarIcon className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Jours d'entreprise</p>
            <p className="text-2xl font-bold">{holidays.filter((h) => h.type === "company").length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="md:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Calendrier des jours fériés</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-lg font-medium">{format(currentMonth, "MMMM yyyy", { locale: fr })}</div>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-7 bg-muted/50 text-center text-sm font-medium">
                <div className="p-2">Dim</div>
                <div className="p-2">Lun</div>
                <div className="p-2">Mar</div>
                <div className="p-2">Mer</div>
                <div className="p-2">Jeu</div>
                <div className="p-2">Ven</div>
                <div className="p-2">Sam</div>
              </div>
              <div className="divide-y">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 divide-x">
                    {week.map((day, dayIndex) => {
                      const holiday = day ? getHolidayForDate(day) : null
                      return (
                        <div
                          key={dayIndex}
                          className={cn(
                            "min-h-[100px] p-2 relative",
                            day && !isSameMonth(day, currentMonth) && "text-muted-foreground",
                            holiday && "bg-muted/20 cursor-pointer hover:bg-muted/30",
                          )}
                          onClick={() => day && handleAddHoliday(day)}
                        >
                          {day ? (
                            <>
                              <div className="text-right">{format(day, "d")}</div>
                              {holiday && (
                                <div
                                  className="mt-1 p-1 rounded text-xs font-medium"
                                  style={{ backgroundColor: holiday.color, color: "white" }}
                                >
                                  {holiday.name}
                                </div>
                              )}
                            </>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Légende</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#FF5733] hover:bg-[#FF5733]">Jours fériés nationaux</Badge>
                <Badge className="bg-[#33A8FF] hover:bg-[#33A8FF]">Jours fériés religieux</Badge>
                <Badge className="bg-[#33FF57] hover:bg-[#33FF57]">Jours fériés d'entreprise</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Liste des jours fériés</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: holiday.color }}></div>
                        <span className="font-medium">{holiday.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{format(holiday.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditHoliday(holiday)}>
                          <Edit className="h-4 w-4" />
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
      </div>

      {/* Formulaire modal pour ajouter/modifier un jour férié */}
      <HolidayForm
        isOpen={isHolidayFormOpen}
        onClose={handleCloseHolidayForm}
        holiday={selectedHoliday}
        initialDate={selectedDate || undefined}
      />
    </div>
  )
}

