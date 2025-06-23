const Filter = () => {
  return (
    <div className="w-full flex justify-center py-4">
      <input
        type="text"
        placeholder="Search fonts..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default Filter;