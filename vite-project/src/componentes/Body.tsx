import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import upArrowIcon from '../assets/up-arrow.png'; // 1. Importe a imagem
import { IoMdStar } from "react-icons/io";
import flaskIcon from '../assets/flask-icon.png'
import miumsPetshop from '../assets/Miums.jpeg'
import pixelVerse from '../assets/PixelVerse.jpeg'

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
    }, 1000)

  }

  return (
    <>
      {/* 1. Container do fundo fixo */}
      <div className='fixed top-0 left-0 w-full h-full bg-zinc-900 -z-10'>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* 2. Container do conteúdo que vai rolar */}
      <div id='background' className={`relative w-full ${!showPage ? 'h-screen' : ''}`}>
        {/* Camadas de estrelas para o background animado */}
        {!showPage && (
          <div id='intro' className="absolute inset-0 flex flex-col text-center items-center justify-center">
            <h1 id="welcome-message" className="animate-fade-up animate-duration-[900ms] animate-delay-[600ms] animate-ease-out animate-normal text-5xl font-bold text-white">
              Bem-vindo!
            </h1>
            <h3 className='animate-fade-up animate-duration-[900ms] animate-delay-[600ms] animate-ease-out animate-normal text-3xl font-bold text-white mt-6'>
              Aperte para ver o portfólio
            </h3>
            <div className='animate-fade-in mt-10'>
              <button className='border-3 border-solid border-white rounded-full mt-8 cursor-pointer animate-bounce' onClick={GatilhoShowPage}>
                <img src={upArrowIcon} alt="Chama o portfólio" className='w-12 h-12' />
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
    </>
  )
}

// --- Componentes de Exemplo para o Conteúdo ---
// A tipagem do retorno como JSX.Element é uma boa prática.

function InicioContent(): JSX.Element {
  return (
    <>
      <div className="p-10 bg-zinc-800/50 rounded-lg">
        <h2 className="text-3xl font-bold text-white roboto">Olá! eu sou Robert 👋</h2>
        <p className="text-left text-gray-400 mt-2 roboto">Tenho 23 anos, sou graduando em Sistemas para Internet pelo IFRN, mais especificamente no 4° período. Sou desenvolvedor web, mais focado em frontend, mas sempre estou aberto para aprender novas áreas de desenvolvimento. Me apaixonei por programação em 2024 e desde então tem sido muito gratificante aprender mais e mais sobre. Inclusive, esse portfólio mesmo já é uma demonstração da minha criatividade e vontade de desenvolver experiências únicas para os usuários, não tenha medo de explorar!</p>
      </div>
      <br />
      <div className='p-10 bg-zinc-800/50 rounded-lg'>
        <h2 className='text-3xl font-bold text-white roboto'>Minhas Stacks 🛠️</h2>
        <h2 className='text-white text-xl roboto mt-3 text-center'>Linguagens</h2>
        <div className='rounded-lg mt-5'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='group flex flex-col border-b md:border-r border-white items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>Typescript</h3>
            </div>
            <div className='group flex flex-col border-b md:border-r border-white items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>Javascript</h3>
            </div>
            <div className='group flex flex-col border-b border-white items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>Python</h3>
            </div>
          </div>
          <br />
          <h2 className='text-white text-xl roboto mt-3 text-center'>Frameworks</h2>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='group flex flex-col border-b border-white md:border-r items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>React</h3>
            </div>
            <div className='group flex flex-col border-b border-white md:border-r items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>Angular</h3>
            </div>
            <div className='group flex flex-col border-b border-white items-center gap-2'>
              <img src={flaskIcon} alt="" className='h-15 w-15 rounded-lg mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>Flask</h3>
            </div>
          </div>
          <br />
          <h2 className='text-white text-xl roboto mt-3 text-center'>Bibliotecas</h2>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='group flex flex-col border-b border-white md:border-r items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>Bootstrap</h3>
            </div>
            <div className='group flex flex-col border-b border-white md:border-r items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>TailwindCSS</h3>
            </div>
            <div className='group flex flex-col border-b border-white items-center gap-2'>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/primeng/primeng-original.svg" alt="" className='h-15 w-15 mt-3' />
              <div className='flex mb-2'>
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
                <IoMdStar className='inline text-yellow-300 h-5 w-5' />
              </div>
              <h3 className='text-lg roboto font-bold text-center mt-3 text-white opacity-0 invisible transition-discrete duration-300 ease-in-out group-hover:opacity-100 group-hover:visible'>PrimeNG</h3>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-5 ml-8 mr-8 md:ml-0 md:mr-0 mb-10 mt-10 bottom-0'>
        <div className='md:col-span-3 md:col-start-2 md:col-end-5'>
          <div className='rounded-lg '>
            <h2 className='text-white text-xl roboto mt-3 text-center'>Este portfólio foi feito usando as tecnologias abaixo.</h2>
            <div className='grid grid-cols-1 md:grid-cols-3'>
              <div className='flex flex-col items-center rounded-sm transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-700 mt-5 border-b border-white md:border-b-0'>
                <a href="https://react.dev/" target='_blank' className='cursor-pointer p-2'>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className='h-15 w-15' />
                </a>
              </div>
              <div className='flex flex-col items-center rounded-sm transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-700 mt-5 border-b border-white md:border-b-0'>
                <a href="https://tailwindcss.com/" target='_blank' className='cursor-pointer p-2'>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="TailwindCSS" className='h-15 w-15' />
                </a>
              </div>
              <div className='flex flex-col items-center rounded-sm transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-zinc-700 mt-5 border-b border-white md:border-b-0'>
                <a href="https://vite.dev/" target='_blank' className='cursor-pointer p-2'>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite" className='h-15 w-15' />
                </a>
              </div>
            </div>
          </div>
          <br />
          <div className='text-white text-lg roboto mt-3 text-center'>
            <p>
              Feito por ⚜️
              <a href="https://github.com/RobertMedeiros" className='underline' target='_blank'>RobertMedeiros</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function TrabalhoContent(): JSX.Element {
  return (
    <div className="text-center p-10 bg-zinc-800/50 rounded-lg">
      <h2 className='text-3xl font-bold text-white roboto'>Minhas Experiências</h2>
      <p className="text-gray-400 mt-2 roboto text-lg">Atualmente ainda não possuo experiências no mercado de trabalho de TI... Me indica aí na sua empresa 😁🤩</p>
    </div>
  );
}

function ProjetosContent(): JSX.Element {
  return (
    <>
      <div className="text-center p-10 bg-zinc-800/50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white roboto">Meus Projetos 📌</h2>
        <p className="text-gray-400 mt-2 mb-2 roboto">Estes são alguns projetos pessoais que eu fiz e sempre vou estar alimentando mais essa lista.</p>
      </div>
      <div className='flex flex-col grid grid-col-1 md:grid-cols-5 mt-5 gap-4'>
        <div className='col-span-2 bg-zinc-800/50 rounded-xl overflow-hidden shadow-lg transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105'>
          <img src={miumsPetshop} alt="MiumsPetshop" className='w-full h-40 object-cover' />
          <div className='p-5'>
            <h3 className='text-white text-xl font-bold roboto'>Mium's Petshop</h3>
            <p className='text-gray-400 mt-2 roboto'>Este projeto é uma single page que desenvolvi sem nenhum framework, o intuito foi apenas começar meus estudos de TailwindCSS</p>
          </div>
          <button className='p-3 bg-zinc-700 m-5 rounded-full hover:bg-zinc-600'>
            <a href="https://miums-petshop.vercel.app/" target='_blank' className='text-white'>Visitar Projeto</a>
          </button>
        </div>
        <div className='col-span-2 bg-zinc-800/50 rounded-xl overflow-hidden shadow-lg transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105'>
          <img src={pixelVerse} alt="PixelVerse" className='w-full h-40 object-cover' />
          <div className='p-5'>
            <h3 className='text-white text-xl font-bold roboto'>PixelVerse</h3>
            <p className='text-gray-400 mt-2 roboto'>Este projeto foi uma landing page para uma empresa do instagram. Apesar de ser apenas uma landing page, por ser mais familiarizado com Angular na época, optei por usá-lo com Bootstrap.</p>
          </div>
          <button className='p-3 bg-zinc-700 m-5 rounded-full hover:bg-zinc-600'>
            <a href="https://pixelverse-five.vercel.app/" target='_blank' className='text-white'>Visitar Projeto</a>
          </button>
        </div>
      </div>
    </>
  );
}

export default Body;