import { HiOutlineBell } from "react-icons/hi2";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";


export const navbarItems = [
  {
    name: 'Notifications', icon: HiOutlineBell, color: 'bg-palette-blue/20', onClick: () => { console.log('🐥')}, iconColor: 'text-palette-blue',
  },
  {
    name: 'Messages', icon: HiOutlineChatBubbleLeft, color: 'bg-palette-green/20', onClick: () => { }, iconColor: 'text-palette-green',
  },
  {
    name: 'Help', icon: HiOutlineQuestionMarkCircle, color: 'bg-palette-red/20', onClick: () => { }, iconColor: 'text-palette-red',
  },

]
