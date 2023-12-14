"use client"

import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession, signOut } from 'next-auth/react'

function Navbar() {

    const { data: session } = useSession()

    return (
        <nav className='bg-slate-900 flex items-center py-3 justify-between px-24 text-white'>
            <div className="flex items-center gap-4"> {/* Agregado contenedor flex con gap */}
            <Image src='/logo.png' alt="Logo" width={40} height={40} className='rounded-full cursor-pointer' />
                <Link href="/">
                    <h1>
                        Aldea Lúdica
                    </h1>
                </Link>
                <Link href="/userdata">
                    Datos de usuario
                </Link>
            </div>
            {session?.user ? (
                <div className='flex gap-x-2 items-center'>
                    <Link href="/partidas">
                        Partidas
                    </Link>
                    <p>{session.user.name} {session.user.email}</p>
                    {session.user.image && (
                        <Image src={session.user.image} alt="User Image" width={40} height={40} className='rounded-full cursor-pointer' />
                    )}
                    <button
                        onClick={async () => {
                            await signOut({
                                callbackUrl: "/"
                            })
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <button onClick={() => signIn()} className='bg-sky-400 px-3 py-2 rounded'>
                    Sign In
                </button>
            )}
        </nav>
    )
}

export default Navbar