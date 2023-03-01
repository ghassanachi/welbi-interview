import Button from '#/components/button'
import Layout from '#/components/layout'
import { SearchBar } from '#/components/searchBar'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import cx from 'classnames'
import { Attendance, Resident } from '#/utils/welbi'
import useSWR from 'swr'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { fetcher } from '#/utils/api'

const getAge = (birthDate: Date) => Math.floor((new Date().getTime() - birthDate.getTime()) / 3.15576e10)

const information: {
  label: string
  key: keyof Resident
  format?: (value: any) => string | number
}[] = [
  {
    label: 'Preferred Name',
    key: 'preferredName',
    format: (value?: string) => value ?? 'N/A',
  },
  {
    label: 'Level of Care',
    key: 'levelOfCare',
  },
  {
    label: 'Status',
    key: 'status',
  },
  {
    label: 'Ambulation',
    key: 'ambulation',
  },
  {
    label: 'Birth Date',
    key: 'birthDate',
    format: (value: string) => new Date(value).toLocaleDateString('en-US'),
  },
  {
    label: 'Move in Date',
    key: 'moveInDate',
    format: (value: string) => new Date(value).toLocaleDateString('en-US'),
  },
  {
    label: 'Room',
    key: 'room',
    format: (value?: string) => (!!value ? value : 'N/A'),
  },
  {
    label: 'Programs Count',
    key: 'attendance',
    format: (values: Attendance[]) => values.filter((x) => x.status !== 'Declined').length,
  },
]

function ResidentCard({ resident }: { resident: Resident }) {
  const dob = new Date(resident.birthDate)

  return (
    <div className="overflow-hidden bg-white border rounded-lg drop-shadow-md">
      <div className="flex items-center justify-between px-6 py-2 bg-blue-100">
        <h3 className="text-base font-bold text-gray-900 leading-6">{resident.name}</h3>
        <h5 className="font-semibold text-gray-800">
          {getAge(dob)}
          <span className="pl-1 text-sm text-gray-500">y/o</span>
        </h5>
      </div>
      <div className="px-6">
        <dl className="grid grid-cols-12">
          {information.map((info, idx) => (
            <div key={info.key} className={cx('py-2 col-span-6', idx % 2 === 1 ? 'text-right' : '')}>
              <dt className="text-sm font-medium text-gray-500">{info.label}</dt>
              <dd className="text-sm font-semibold text-gray-900 col-span-2">
                {info.format ? info.format(resident[info.key]) : (resident[info.key] as string | number)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function ResidentList({ residents }: { residents: Resident[] | undefined }) {
  if (!residents) return <h4 className="text-red-600">Could not retrieve residents data</h4>

  if (residents.length === 0) return <h4>No Residents Found</h4>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {residents.map((resident) => (
        <ResidentCard key={resident.id} resident={resident} />
      ))}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)
  const residents = await fetcher('/api/residents', {}, session?.token)
  return {
    props: {
      fallback: {
        '/api/residents': residents,
      },
    },
  }
}

export default function Residents() {
  const { data } = useSWR<Resident[]>('/api/residents')
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => data?.filter((resident) => resident.name.includes(search)) ?? [], [data, search])

  return (
    <Layout>
      <div className="flex flex-row mb-8 gap-8">
        <SearchBar
          className="flex-1"
          id="residents-search"
          placeholder="Search for Residents"
          onChange={(event) => setSearch(event.target.value)}
        />
        <Link href="/residents/create" className="flex items-center">
          <Button disabled={true}>Add Resident</Button>
        </Link>
      </div>
      <ResidentList residents={filtered} />
    </Layout>
  )
}
