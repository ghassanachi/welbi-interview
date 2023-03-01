import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEventHandler } from "react";
import cx from 'classnames';

export function SearchBar({placeholder, id, onChange, className}: {placeholder: string, id: string, onChange: ChangeEventHandler<HTMLInputElement>, className: string}) {
    return <div className={cx("relative shadow-sm", className)}>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          name={id}
          id={id}
          className="block w-full h-full p-3 pl-6 pr-10 border-gray-300 rounded-full focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
}
