export default function SearchInput({
  onSearchChange,
  searchword,
}: PropsHandler) {
  const handleSubmit = (eve: React.FormEvent<HTMLFormElement>) => {
    eve.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Meditation hours this week:
        <input
          className="inputValue"
          type="number"
          value={searchword}
          onChange={onSearchChange}
        ></input>
      </label>
    </form>
  );
}
