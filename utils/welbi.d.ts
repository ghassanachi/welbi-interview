import Hobbies from './hobbies'

export type LevelOfCare = 'INDEPENDENT' | 'MEMORY' | 'ASSISTED' | 'LONGTERM'
export type Status = 'HERE' | 'LOA' | 'HOSPITAL' | 'ISOLATION'
type Ambulation = 'CANE' | 'NOLIMITATIONS' | 'WALKER' | 'WHEELCHAIR'

export type Attendance = {
  programId: number
  residentId: number
  status: 'Active' | 'Declined' | 'Passive'
}

export type Resident = {
  id: number
  name: string
  firstName: string
  lastName: string
  preferredName: string
  status: Status
  room: string
  levelOfCare: LevelOfCare
  ambulation: Ambulation
  birthDate: string
  moveInDate: string
  attendance: Attendance[]
}

export type Recurrence = {
  byMonth: number
  interval: number
  frequency: 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'DAILY'
  byMonthday: 5
}

export type Program = {
  id: number
  parentId: number | null
  name: string
  location: string
  allDay: boolean
  start: string
  end: string
  tags: string[]
  dimention: string
  facilitators: string[]
  levelOfCare: LevelOfCare[]
  hobbies: (typeof Hobbies)[number]
  recurrence: Recurrence | null
  isRepeated: boolean
  attendance: Attendance[]
}

export type User = {
  id: number
  token: string
  email: string
  url: string | null
  starts: number
  submissions: number
  firstStart: string
  firstSubmission: string
  lastSubmission: string
}
