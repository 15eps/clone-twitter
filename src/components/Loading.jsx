import logo from '../logo.svg'

export default function Loading(){
    return(
        <div className="h-full flex justify-center items-center">
            <img className='animate-pulse w-20' src={logo} />
        </div>
    )
}