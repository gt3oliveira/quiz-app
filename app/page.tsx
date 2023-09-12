import Image from "next/image";
import mapa from '@/assets/images/mapa-70.png'
import logo from '@/assets/images/logo-quiz.png'
import { Link } from "@nextui-org/link";

export default function Home() {
	return (
		<main className="flex h-[100vh] bg-[var(--background-color)]">
			<div className={`
				flex flex-col w-[50vw] items-center justify-center px-2
				overflow-hidden				
			`}>
				<Image 
					src={logo}
					alt="Logo Quiz"
					quality={100}
					className="w-[620px]"
				/>

				<h1 className="text-[var(--gray-100)] text-3xl font-bold mt-4 mb-12 text-center">
					Acerte as perguntas de diversas variedades do mapa do Brasil
				</h1>

				<Link className={`
					w-[30vw] bg-[var(--gray-100)]	py-2 rounded-lg text-[var(--background-color)]
					transition-all duration-300									
					hover:bg-[var(--gray-100)] hover:text-white hover:scale-105
					`}
					href={'/quiz'}
				>
					<span className="w-full text-center text-xl font-bold">COMEÇAR !!</span>
				</Link>
			</div>

			<div className={`
				flex flex-col justify-center items-center
				overflow-hidden w-[50vw]
			`}>
				<Image 
					src={mapa}
					alt="Mapa do Brasil"
					quality={100}
					className="w-full"
				/>
			</div>
		</main>		
	);
}
