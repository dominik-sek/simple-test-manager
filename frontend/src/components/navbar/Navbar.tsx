import ActionButton from './ActionButton';
import SearchInput from './SearchInput';
import { navbarItems } from './navbar-items';

export default function Navbar() {


  return (
    <nav className="h-14 sticky top-0 left-0 w-full flex items-center justify-between px-14 py-10 gap-10 backdrop-blur-2xl">

      <div className='flex items-center gap-10 w-full'>
        <SearchInput />
        <div className='flex gap-5 items-center justify-center'>

          {navbarItems.map((item, index) => (
            <ActionButton key={index} name={item.name} color={item.color} icon={item.icon} onClick={item.onClick} iconColor={item.iconColor} />
          ))}

        </div>

      </div>

        <div className='h-10 w-[1px] bg-slate-300'></div>

      <div className='flex items-center justify-center gap-5 min-w-48'>
        API username
        <button className='h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-palette-green/20 transition-all duration-200 ease-in-out'>
          <span className='text-sm text-slate-700 font-bold'>A</span>
        </button>
      </div>

    </nav>
  );
}
