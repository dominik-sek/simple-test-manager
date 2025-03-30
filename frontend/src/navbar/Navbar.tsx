import {Breadcrumbs} from "../components/shared/Breadcrumbs.tsx";

export const Navbar = () =>{

    return (
        <nav className="border min-h-20 w-full flex justify-between p-5 bg-amber-100">
            <Breadcrumbs />

            <div className="flex gap-10">
                <div>search</div>
                <div>icons</div>
            </div>
        </nav>
    )
}

