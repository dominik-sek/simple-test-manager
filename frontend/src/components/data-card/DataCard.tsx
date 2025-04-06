import { Link } from 'react-router';

interface DataCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function DataCard(props: DataCardProps) {
  return (

    <div className=" w-64 h-64 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-4">
      <h1 className="text-2xl font-bold text-slate-700">{props.title}</h1>
      <p className="text-slate-500">{props.description}</p>
      <Link to={props.href} className="mt-4 flex items-center justify-center w-full h-10 bg-palette-green text-white rounded-md hover:bg-palette-green/80 transition-all duration-200 ease-in-out">
        <span className="text-sm font-bold">View</span>
        <img src={props.icon} alt="icon" className="ml-2" width={20} height={20} />
      </Link>
    </div>
  )
}
