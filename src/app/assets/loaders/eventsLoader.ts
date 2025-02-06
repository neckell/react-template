import day1Data from '../events/day1.json'
import day2Data from '../events/day2.json'

export interface Band {
  band: string
  time: string
}

export interface DaySchedule {
  [key: string]: Band[]  // Dynamic stage names as keys
}

export const loadDaySchedule = (day: 1 | 2): DaySchedule => {
  return day === 1 ? day1Data : day2Data
}

export const getStages = (schedule: DaySchedule): string[] => {
  return Object.keys(schedule)
}
