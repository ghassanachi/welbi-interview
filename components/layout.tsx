import Sidebar from '#/components/sidebar'
import { Menu, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline'
import { Fragment, ReactElement } from 'react'

export default function Layout({ children }: { children: ReactElement | ReactElement[] }) {
  return (
    <div className="h-full">
      <Sidebar />
      <div className="flex flex-col h-full ml-48">
        <div className="flex items-center justify-end h-16 py-2 pr-4">
          <Menu as="div" className="relative z-10 inline-block text-left">
            <Menu.Button className="w-10 h-10 p-2 border-gray-200 rounded-full hover:bg-gray-300">
              <UserIcon />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-1 bg-white border shadow-lg origin-top-right divide-y divide-gray-100 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-1.5">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-blue-300' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <main className="flex flex-col flex-1 min-h-full p-8 bg-gray-100 rounded-2xl">{children}</main>
      </div>
    </div>
  )
}
