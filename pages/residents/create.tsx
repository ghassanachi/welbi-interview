import Layout from '#/components/layout'
import hobbies from '#/utils/hobbies'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment } from 'react'

export default function CreateResident() {
  return (
    <Layout>
      <div>
        <div>
          <div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 leading-6">Add Resident</h3>
            </div>
          </div>
          <div className="mt-5">
            <form action="#" className="border border-gray-300 rounded-lg shadow-sm" method="POST">
              <div className="px-4 py-5 bg-white rounded-t-lg sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="level-of-care" className="block text-sm font-medium text-gray-700">
                      Level Of Care
                    </label>
                    <select
                      id="level-of-care"
                      name="level-of-care"
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Assisted Living</option>
                      <option>Long Term Care</option>
                      <option>Memory Care</option>
                      <option>Independent</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      placeholder="MM/DD/YYYY"
                      type="text"
                      name="dob"
                      id="dob"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="move-in-date" className="block text-sm font-medium text-gray-700">
                      Move in Date
                    </label>
                    <input
                      placeholder="MM/DD/YYYY"
                      type="text"
                      name="move-in-date"
                      id="move-in-date"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="relative col-span-6 sm:col-span-4">
                    <Listbox defaultValue={[]} multiple>
                      <Listbox.Label className="block text-sm font-medium text-gray-700">Hobbies</Listbox.Label>
                      <Listbox.Button className="relative block w-full py-2 pl-3 pr-10 mt-1 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {({ value }) => (
                          <>
                            <span>{value.length ? value.join(', ') : 'None'}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            </span>
                          </>
                        )}
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white shadow-lg max-h-60 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {hobbies.map((hobby) => (
                            <Listbox.Option
                              key={hobby}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-blue-400 text-white' : 'text-gray-900'
                                }`
                              }
                              value={hobby}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {hobby}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? 'text-white' : 'text-teal-600'
                                      }`}
                                    >
                                      <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </Listbox>
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <label htmlFor="room-number" className="block text-sm font-medium text-gray-700">
                      Room Number
                    </label>
                    <input
                      type="number"
                      name="room-number"
                      id="room-number"
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right rounded-b-lg bg-blue-50 sm:px-6">
                <Link
                  href="/residents"
                  className="inline-flex justify-center px-4 py-2 mr-6 text-sm font-medium bg-white border border-transparent rounded-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
