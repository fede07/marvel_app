const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
        <p className="mt-2 text-white">Loading...</p>
    </div>
  )
}

export default Loader
