import BannerCard from "../home/BannerCard"


const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 py-40 w-full">
        <div className="md:w-1/2 space-y-8 h-full">
            <h2 className="text-5xl font-bold leading-snug text-black">Buy and Sell your books
            <span className="text-blue-700"> for the Best Prices</span></h2>
            <p className="md:w-4/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, voluptates.</p>
            <div>
                <input type="search" placeholder="Search for books" name="search" id="search" className="p-2 rounded-s-sm outline-none"/>
                <button className="bg-blue-700 text-white py-2 px-6 font-medium hover:bg-black transition-all ease-in duration-200">Search</button>
            </div>
        </div>
        <div>
            <BannerCard />
        </div>
      </div>
    </div>
  )
}

export default Banner
