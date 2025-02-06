export const API_BASE_URL = "http://localhost:3001"

export enum Scenarios {
  NORTE = "Escenario Norte",
  SUR = "Escenario Sur",
  MONTANA = "Escenario de Montaña",
  PARAGUAY = "Escenario Paraguay",
  BOOMERANG = "Escenario Boomerang",
  CASITA_BLUES = "La Casita del Blues",
  HANGAR = "Hangar Club",
}

// Type for event entries
export interface EventEntry {
  band: string
  time: string
}

// Type for the full day schedule
export type DaySchedule = {
  [key in Scenarios]: EventEntry[]
}
