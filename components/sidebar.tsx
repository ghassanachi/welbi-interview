import { ClipboardDocumentIcon, UsersIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import cx from 'classnames'
import { useRouter } from 'next/router'

const routes = [
  {
    href: '/residents',
    name: 'Residents',
    icon: UsersIcon,
  },
  {
    href: '/programs',
    name: 'Programs',
    icon: ClipboardDocumentIcon,
  },
]

export default function Sidebar() {
  const { pathname } = useRouter()

  return (
    <div className="fixed inset-y-0 flex flex-col w-48">
      <div className="flex flex-col flex-grow rounded-r-2xl">
        <div className="flex flex-col justify-start flex-grow px-4 align-middle">
          <div className="flex items-center flex-shrink-0 h-16">
            <Link href="/">
              <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} priority />
            </Link>
          </div>
          <nav className="flex flex-col mt-5 gap-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cx(
                  pathname.startsWith(route.href) ? 'bg-blue-300' : 'hover:bg-blue-100',
                  'flex p-2 w-full rounded-md'
                )}
              >
                <route.icon className="w-6 h-6 mr-2" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
