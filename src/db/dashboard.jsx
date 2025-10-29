import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <section>
      {/* Top Navigation */}
      <section className="flex justify-between items-center border-b border-gray-200 p-4">
        {/* Left - Nav Links */}
        <ul className="flex gap-10 items-center">
          <Link to="dashboard"></Link>
          <Link to="/event">event</Link>
          <Link to={""}>players</Link>
        </ul>

        {/* Right - Profile */}
        <div className="flex items-center gap-3">
          <div className="rounded-full shadow-md w-12 h-12 border border-gray-300 overflow-hidden">
            <img
              src="/images/cysictap.jpg"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="capitalize font-medium text-gray-700">metamask</p>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="p-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center w-full lg:w-2/3">
          {/* Box 1 */}
          <div className=" rounded-md shadow-md p-6 flex flex-col justify-between h-[30vh] w-full hover:shadow-lg transition">
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold capitalize">Total Events</p>
              <p className="text-lg font-medium">42</p>
              <p className="text-lg font-medium text-emerald-600">
                +5 since last month
              </p>
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>

          {/* Box 2 */}
          <div className=" rounded-md shadow-md p-6 flex flex-col justify-between h-[30vh] w-full hover:shadow-lg transition">
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold capitalize">
                Active Players
              </p>
              <p className="text-lg font-medium">+2,350</p>
              <p className="text-lg font-medium text-emerald-600">
                +1800% since last month
              </p>
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>

          {/* Box 3 */}
          <div className=" rounded-md shadow-md p-6 flex flex-col justify-between h-[30vh] w-full hover:shadow-lg transition">
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold capitalize">
                Rewards Distributed
              </p>
              <p className="text-lg font-medium">12.2 ETH</p>
              <p className="text-lg font-medium text-emerald-600">
                +19% from last month
              </p>
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>

          {/* Box 4 */}
          <div className=" rounded-md shadow-md p-6 flex flex-col justify-between h-[30vh] w-full hover:shadow-lg transition">
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold capitalize">
                Engagement Rate
              </p>
              <p className="text-lg font-medium">+57.3%</p>
              <p className="text-lg font-medium text-emerald-600">
                +5 since last month
              </p>
            </div>
            <div>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section>
        {/* create event */}
        <section>
          <div>
            <div className="w-full flex justify-end p-6">
              <button className="w-36 cursor-pointer h-12 rounded-md  bg-sky-600 text-white font-medium capitalize italic hover:text-white  hover:bg-blue-800 ">
                create tournament
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
