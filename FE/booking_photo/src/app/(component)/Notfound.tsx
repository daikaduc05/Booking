import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h2 className="text-4xl font-bold text-red-500 mb-4">404</h2>
        <p className="text-lg text-gray-600 mb-6">Could not find the requested resource</p>
        <Link href="/">
          <a className="text-blue-600 hover:text-blue-800 font-medium text-lg">
            Return Home
          </a>
        </Link>
      </div>
    </div>
  )
}
