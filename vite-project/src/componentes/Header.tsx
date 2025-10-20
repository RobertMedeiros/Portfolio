import { useState } from 'react';
import upArrowIcon from '../assets/up-arrow.png'; // 1. Importe a imagem

function Header() {

    // Estado para controlar se a tela de boas-vindas está visível
    const [showPage, setShowPage] = useState(false);

    function GatilhoShowPage() {
        const minhaIntro = document.getElementById('intro') as HTMLElement;
        const meuBackground = document.getElementById('background') as HTMLElement;

        minhaIntro.classList.add("animate-fade-out");
        meuBackground.classList.add("body");
        

        setTimeout(() => {
            setShowPage(true);
        }, 5000)
  
    }

    return (
        <div id='background' className='bg-zinc-900 relative h-screen w-full overflow-hidden'>
            {/* Camadas de estrelas para o background animado */}
            <div className="stars"></div>
            <div className="stars2"></div>
            <div className="stars3"></div>

            {!showPage && (
                <div id='intro' className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 id="welcome-message" className="animate-fade-up animate-duration-[900ms] animate-delay-[600ms] animate-ease-out animate-normal text-5xl font-bold text-white">
                        Bem-vindo!
                    </h1>
                    <h3 className='animate-fade-up animate-duration-[900ms] animate-delay-[3000ms] animate-ease-out animate-normal text-3xl font-bold text-white mt-6'>
                        Aperte para ver o portfólio
                    </h3>
                    <div className='animate-fade-in mt-10'>
                        <button className='border-3 border-solid border-white rounded-full mt-8 cursor-pointer animate-bounce' onClick={GatilhoShowPage}>
                            <img src={upArrowIcon} alt="Chama o portfólio" className='w-12 h-12'/>
                        </button>
                    </div>
                </div>
            )}

            {showPage && (
                <main id='principal' className="animate-fade-up animate-duration-900 animate-delay-300 animate-ease-out animate-fill-both">
                    <div className='grid grid-cols-1 md:grid-cols-5 gap-4 flex items-center justify-center absolute inset-0'>
                        <div className='md:col-span-3 md:col-start-2'>
                            <h1 className='text-white'>CADE ESSA DIV CARALHO</h1>
                        </div>
                    </div>
                </main>
            )}
        </div>
    )
}

export default Header;