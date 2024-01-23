const Footer = () => {
    return (
      <div className="bg-purple-700 py-10 px-8 md:px-10">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl sm:text-3xl text-white font-bold tracking-tight cursor-pointer">
            RoomRover
          </span>
          <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer text-sm sm:text-base hover:underline">
              Privacy Policy
            </p>
            <p className="cursor-pointer text-sm sm:text-base hover:underline">
              Terms of Service
            </p>
          </span>
        </div>
      </div>
    );
}

export default Footer;