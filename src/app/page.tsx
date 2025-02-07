
export default function Home() {
  return (

    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <ul className="mt-4 space-y-2">
          <div className="list-component">
            <div className="departure-port">
              <label htmlFor="departure-port" className="block mb-2 font-medium">
                Departure Port
              </label>
              <input
                type="text"
                id="departure-port"
                placeholder="Any Port"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="cruiseline mt-4">
              <label htmlFor="cruiseline" className="block mb-2 font-medium">
                Cruiseline
              </label>
              <input
                type="text"
                id="cruiseline"
                placeholder="Any Ship"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-gray-200 p-4">

      </div>
    </div>
  );
}
