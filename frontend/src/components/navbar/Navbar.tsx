import ActionButton from './ActionButton';
import SearchInput from './SearchInput';
import { navbarItems } from './navbar-items';
import Profile from './Profile';

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
      
      <select className='w-48 bg-white'>

      </select>

      <Profile />

    </nav>
  );
}
