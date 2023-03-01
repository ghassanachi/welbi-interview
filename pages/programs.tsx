import Button from '#/components/button'
import Layout from '#/components/layout'
import { SearchBar } from '#/components/searchBar'
import { Program, Resident } from '#/utils/welbi'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import cx from 'classnames'
import useSWR from 'swr'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { fetcher } from '#/utils/api'
import Avatar from '#/components/avatar'

const information: {
  label: string
  key: keyof Program
  format?: (value: any) => string | number | React.ReactElement
}[] = [
  {
    label: 'Location',
    key: 'location',
  },
  {
    label: 'Tags',
    key: 'tags',
    format: (values: string[]) => (values.length ? values.join(', ') : 'None'),
  },
  {
    label: 'Dimention',
    key: 'dimention',
    format: (value?: string) => (value ? value : 'N/A'),
  },
  {
    label: 'Facilitator',
    key: 'facilitators',
    format: (values: string[]) => (values.length ? values.join(', ') : 'None'),
  },
  {
    label: 'Levels Of Care',
    key: 'levelOfCare',
    format: (values: string[]) => (values.length ? values.join(', ') : 'None'),
  },
  {
    label: 'Hobbies',
    key: 'hobbies',
    format: (values: string[]) => (values.length ? values.join(', ') : 'None'),
  },
]

// NOTE: Since the server might have a different TZ than the client, there is a potential issue
// where the SSR generated page might not match. The fix would be to determine the client TZ
// and then use that information to generate the proper timezone. This seems a little overkill
// for this assement, so I am leaving this as is.
function getTime(start: Date, end: Date) {
  let startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  let endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  return `${startTime} - ${endTime}`.toLowerCase()
}

function ProgramCard({ program, residents }: { program: Program; residents: Map<number, Resident> }) {
  let start = new Date(program.start)
  let end = new Date(program.end)
  return (
    <div className="flex flex-col justify-between overflow-hidden bg-white border rounded-lg drop-shadow-md">
      <div className="flex items-center justify-between px-6 py-2 bg-blue-100">
        <h3 className="text-base font-bold text-gray-900 leading-6">{program.name}</h3>
        <div className="text-right">
          <h5 className="text-sm font-semibold text-gray-600">{start.toLocaleDateString('en-US')} </h5>
          <h6 className="text-xs font-bold text-gray-500">{program.allDay ? 'All day' : getTime(start, end)}</h6>
        </div>
      </div>
      <div className="px-6">
        <dl className="grid grid-cols-12">
          {information.map((info, idx) => (
            <div key={info.key} className={cx('py-2 col-span-6', idx % 2 === 1 ? 'text-right' : '')}>
              <dt className="text-sm font-medium text-gray-500">{info.label}</dt>
              <dd className="text-sm font-semibold text-gray-900 col-span-2">
                {info.format ? info.format(program[info.key]) : (program[info.key] as string | number)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-wrap px-6 py-2 overflow-hidden bg-gray-100 -space-x-1">
        {program.attendance
          .map((a) => residents.get(a.residentId))
          .map((resident) => (
            <Avatar key={resident?.id} firstName={resident?.firstName} lastName={resident?.lastName} />
          ))}
      </div>
    </div>
  )
}

function ProgramList({ programs, residents }: { programs: Program[] | undefined; residents: Map<number, Resident> }) {
  if (!programs) return <h4 className="text-red-600">Could not retrieve programs</h4>

  if (programs.length === 0) return <h4>No programs Found</h4>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} residents={residents} />
      ))}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const programsPromise = fetcher('/api/programs', {}, session?.token)
  const residentsPromise = fetcher('/api/residents', {}, session?.token)
  const [residents, programs] = await Promise.all([residentsPromise, programsPromise])
  return {
    props: {
      fallback: {
        '/api/programs': programs,
        '/api/residents': residents,
      },
    },
  }
}

export default function Programs() {
  const { data: programs } = useSWR<Program[]>('/api/programs')
  const { data: residentsResult } = useSWR<Resident[]>('/api/residents')

  const [search, setSearch] = useState('')
  const filtered = useMemo(() => programs?.filter((program) => program.name.includes(search)) ?? [], [programs, search])
  const residents = useMemo(
    () =>
      (residentsResult ?? []).reduce((map, resident) => {
        map.set(resident.id, resident)
        return map
      }, new Map<number, Resident>()),
    [residentsResult]
  )

  return (
    <Layout>
      <div className="flex flex-row mb-8 gap-4">
        <SearchBar
          className="flex-1"
          id="program-search"
          placeholder="Search for Programs"
          onChange={(event) => setSearch(event.target.value)}
        />
        <Link href="/programs/create" className="flex items-center">
          <Button disabled={true}>Create Program</Button>
        </Link>
      </div>
      <ProgramList programs={filtered} residents={residents} />
    </Layout>
  )
}
