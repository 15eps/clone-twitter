import { LogoutIcon, UserCircleIcon, HomeIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Logo from  '../logo.svg'

const links = [
    { link: '/', icon: <HomeIcon className="w-6"/>, name: 'Home' },
    { link: '/profile', icon: <UserCircleIcon className="w-6"/>, name: 'Profile' }
]


export function Menu({avatar, username,logout}) {

    return (
        <div className="md:w-[200px] flex flex-col items-center p-4 border-r border-silver">
            <nav className="h-full flex flex-col justify-around items-center">
                <div>
                    <img src={Logo} className="w-8"/>
                </div>
                <div className="flex flex-col items-start">
                    {links.map(item => 
                    (
                        <Link key={item.link} to={item.link} className={`hover:opacity-100 ${window.location.pathname === item.link ? "opacity-100" : "opacity-60"} flex p-4 space-x-3 `}>
                            {item.icon}
                            <span className="d-none md:inline">{item.name}</span>
                        </Link>
                    )
                    )}
                    <a onClick={logout} className="hover:opacity-100 opacity-60 flex p-4 space-x-3">
                    <LogoutIcon className="w-6"/>
                            <span className="d-none md:inline">Logout</span>
                    </a>
                   
                </div>
                <div className="flex flex-col justify-center">
                    <Link to={`/${username}`}>
                    <img alt={username} className="w-12 h-12 rounded-full object-cover" src={avatar}/>                  
                    </Link>
                </div>
            </nav>
        </div>
    )
}
