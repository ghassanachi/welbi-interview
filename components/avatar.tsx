export default function Avatar({ firstName, lastName }: { firstName?: string; lastName?: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full ring-2 ring-white"
      title={`${firstName} ${lastName}`}
    >
      <span className="text-xs font-medium leading-none text-white">
        {firstName?.[0] ?? ''}
        {lastName?.[0] ?? ''}
      </span>
    </span>
  )
}
