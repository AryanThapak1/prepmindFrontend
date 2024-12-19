const MiniProfile = ({ title, text, isEditing, onChange }) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm font-medium leading-6 text-white">
        {title}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={onChange}
            className="w-full p-2 border rounded-md focus:ring-2 bg-transparent focus:ring-teal-500"
          />
        ) : (
          text
        )}
      </dd>
    </div>
  );
};

export default MiniProfile;
