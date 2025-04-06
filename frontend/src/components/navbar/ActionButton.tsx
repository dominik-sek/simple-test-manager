import { IconType } from 'react-icons/lib';

interface ActionButtonProps {
  name: string;
  color: string;
  iconColor: string;
  icon: IconType;
  onClick: () => void;
}
export default function ActionButton(props: ActionButtonProps) {
  const buttonColor = props.color + ' /20';
  const iconColor = props.iconColor;
  return (
    <button onClick={props.onClick} className={`w-10 h-10 p-2 flex items-center justify-center rounded-xl ${buttonColor} cursor-pointer hover:opacity-70 transition-all duration-200 ease-in-out`}>
      <props.icon className={iconColor} size={25}  />
    </button>
  )
  
}
