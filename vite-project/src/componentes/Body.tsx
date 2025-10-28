import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import upArrowIcon from '../assets/up-arrow.png'; // 1. Importe a imagem

// 1. Definindo o tipo para cada item da navegação
type Tab = {
  id: string;
  label: string;
  content: ReactNode; // ReactNode é um tipo flexível que aceita JSX, strings, etc.
};

// --- Defina aqui os seus itens do menu e o conteúdo de cada seção ---
const tabs: Tab[] = [ // 2. Tipando o array como um array de 'Tab'
  { id: "inicio", label: "início", content: <InicioContent /> },
  { id: "trabalho", label: "trabalho", content: <TrabalhoContent /> },
  { id: "projetos", label: "projetos", content: <ProjetosContent /> },
];

function Body() {

    // Estado para controlar se a tela de boas-vindas está visível
    const [showPage, setShowPage] = useState(false);
    
    // 3. Tipando o estado. Ele sempre será um objeto do tipo 'Tab'.
    const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

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
                    <h3 className='animate-fade-up animate-duration-[900ms] animate-delay-[2000ms] animate-ease-out animate-normal text-3xl font-bold text-white mt-6'>
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
                <div className="w-full max-w-4xl mx-auto p-8 animate-fade-up animate-duration-900 animate-delay-300 animate-ease-out animate-fill-both">
                    {/* Container da Navegação */}
                    <nav className="mb-12">
                        <ul className="flex items-center justify-center gap-6 md:gap-8">
                        {tabs.map((tab) => (
                            <li
                            key={tab.id}
                            onClick={() => setSelectedTab(tab)}
                            className="relative cursor-pointer px-3 py-2 text-sm md:text-base font-medium text-gray-300 transition hover:text-white"
                            >
                            {/* Texto do Item */}
                            {tab.label}
                            
                            {/* O Sublinhado Animado */}
                            {tab.id === selectedTab.id && (
                                <motion.div
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                layoutId="underline"
                                />
                            )}
                            </li>
                        ))}
                        </ul>
                    </nav>

                    {/* Container do Conteúdo com Animação */}
                    <main>
                        <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTab.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {selectedTab.content}
                        </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            )}
        </div>
    )
}

// --- Componentes de Exemplo para o Conteúdo ---
// A tipagem do retorno como JSX.Element é uma boa prática.

function InicioContent(): JSX.Element {
  return (
    <div className="text-center p-10 bg-zinc-800/50 rounded-lg">
      <h2 className="text-3xl font-bold text-white">Bem-vindo ao Meu Portfólio</h2>
      <p className="text-gray-400 mt-2">Sou um desenvolvedor apaixonado por criar experiências incríveis.</p>
    </div>
  );
}

function TrabalhoContent(): JSX.Element {
  return (
    <div className="text-center p-10 bg-zinc-800/50 rounded-lg">
      <h2 className="text-3xl font-bold text-white">Minha Experiência</h2>
      <p className="text-gray-400 mt-2">Aqui estão alguns dos lugares onde trabalhei.</p>
    </div>
  );
}

function ProjetosContent(): JSX.Element {
  return (
    <div className="text-center p-10 bg-zinc-800/50 rounded-lg">
      <h2 className="text-3xl font-bold text-white">Meus Projetos</h2>
      <p className="text-gray-400 mt-2">Confira os projetos que construí.</p>
    </div>
  );
}

export default Body;