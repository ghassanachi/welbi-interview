export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props
  return (
    <button
      className="inline-flex items-center px-6 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-full text-medium shadow-sm transition-all ease-in-out duration-500 hover:drop-shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  )
}
