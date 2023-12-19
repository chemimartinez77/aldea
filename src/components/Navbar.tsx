"use client"

import Link from 'next/link'
import Image from 'next/image'
import { signIn, useSession, signOut } from 'next-auth/react'
import { addUserIfNotExist } from '../utils/supabase-utils'
import { useEffect } from 'react'

function Navbar() {

    const { data: session } = useSession()

    useEffect(() => {
        // Asegúrese de que el usuario está definido y que tanto el email como el name son strings no vacíos.
        if (session?.user?.email && typeof session.user.email === 'string' &&
            session?.user?.name && typeof session.user.name === 'string') {
            addUserIfNotExist(session.user.email, session.user.name);
        }
    }, [session])

    return (
        <nav className='bg-slate-900 flex items-center py-3 justify-between px-24 text-white'>
            <div className="flex items-center gap-4"> {/* Agregado contenedor flex con gap */}
            <Image src='/logo.png' alt="Logo" width={40} height={40} className='rounded-full cursor-pointer' />
                <Link href="/" legacyBehavior>
                    <a className="text-xl font-bold">Aldea Lúdica</a>
                </Link>
                {session?.user && ( // Solo mostrar si el usuario ha iniciado sesión
                    <Link href="/userdata" legacyBehavior>
                        <a className="hover:text-sky-400 transition duration-300 ease-in-out cursor-pointer">Datos de usuario</a>
                    </Link>
                )}
                {session?.user && ( // Solo mostrar si el usuario ha iniciado sesión
                    <Link href="/partidas" legacyBehavior>
                        <a className="hover:text-sky-400 transition duration-300 ease-in-out cursor-pointer">Partidas</a>
                    </Link>
                )}
            </div>
            {session?.user ? (
                <div className='flex gap-x-2 items-center'>
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