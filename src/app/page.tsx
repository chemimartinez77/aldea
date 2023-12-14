import Image from 'next/image'

function HomePage() {
    return (
        <div className="flex h-screen flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4"> {/* Clases para tamaño de texto y negrita */}
                Bienvenid@ a la Aldea Lúdica
            </h1>
            <Image src='/logo.png' alt="Logo" width={500} height={500} />
        </div>
    )
}

export default HomePage