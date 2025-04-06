export default function SearchInput() {
  return (
    <input 
      type="text"
      placeholder="Search..."
      className="h-10 w-full rounded-md bg-white px-4 text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-palette-green/50"
      onFocus={(e) => e.target.placeholder = ''}
      onBlur={(e) => e.target.placeholder = 'Search...'}
      onChange={(e) => console.log(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('Searching for:', e.currentTarget.value);
        }
      }}
    />
  )
}
