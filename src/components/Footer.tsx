// Footer.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faXTwitter, faGithub, faDiscord, faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { type JSX, useState } from "react";

interface IFooterProps {
  theme: "dark" | "white",
}

export default function Footer(props: IFooterProps): JSX.Element {
  const [showOverlay, setShowOverlay] = useState(false);

  const donationOptions = [
        {
            type: "Bitcoin",
            address: "bc1qmh986vxdvdkcrrfak4rekfgz79r66m6h5t0gre",
            qrCode: null
        },
        {
            type: "Ethereum",
            address: "0xc3199f64369AfE268a58565cE53107bA27a20E29",
            qrCode: null
        },
        {
            type: "Lightning Network",
            address: "sourketchup25@walletofsatoshi.com",
            qrCode: "lightning.png"
        }
  ];

  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <>
      <footer className={`mb-1 grid grid-cols-3 grid-rows-4 gap-y-4 transition-all duration-1000
      ${props.theme === "dark" ? 'text-yellow-300' : 'text-black'} text-center max-w-[800px] justify-self-center font-semibold`}>
        <p className="col-span-3 text-center text-2xl">
            Créditos
        </p>

        <div className="h-0.5 text-2xl">
            PEXE
            <div className="justify-center mt-1">
                <a href="https://youtube.com/@ultimatepexe" target='_blank'><FontAwesomeIcon icon={faYoutube} /></a>
                <a href="https://x.com/ultimatepexe" target='_blank'><FontAwesomeIcon icon={faXTwitter} /></a>
                <br />
                <a href="https://discord.gg/papahardware" target='_blank'><FontAwesomeIcon icon={faDiscord} /></a>
                <a href="https://github.com/ultimatepexe" target='_blank'><FontAwesomeIcon icon={faGithub} /></a>
            </div>
        </div>
        <button 
            onClick={() => setShowOverlay(true)}
            className={`${props.theme === "dark" ? 'text-black bg-yellow-300 hover:bg-yellow-400' : 'text-white bg-blue-600 hover:bg-blue-700'} rounded-md font-semibold cursor-pointer row-span-2 scale-75 text-2xl`}
        >
            <FontAwesomeIcon icon={faBitcoin} />
            DONATE
        </button>
        <div className="h-0.5 text-2xl break-all">
            PapaHardware
            <div className="justify-center mt-1 h-0.5">
                <a href="https://youtube.com/@papahardware" target='_blank'><FontAwesomeIcon icon={faYoutube} /></a>
                <a href="https://x.com/papahardware" target='_blank'><FontAwesomeIcon icon={faXTwitter} /></a>
                <br />
                <a href="https://discord.gg/papahardware" target='_blank'><FontAwesomeIcon icon={faDiscord} /></a>
                <a href="https://papahardware.com" target='_blank'><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
            </div>
        </div>

        <p className="col-span-3 sm:mt-4">
        O <a href="https://pobrometro.pexe.dev" target="_blank" className="hover:underline"><strong>Pobrômetro</strong></a> é um site de conversão criado apenas para diversão. Os valores são baseados no preço médio dos itens e não refletem cotações oficiais ou precisas.
        </p>
    </footer>

    {/*O CODIGO ABAIXO FOI FEITO PELO GROK.*/}

    {/* Overlay */}
    {showOverlay && (
      <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowOverlay(false)}
      >
          <div 
              className={`${props.theme === "dark" ? 'bg-yellow-300 text-black' : 'bg-white text-black'} p-6 rounded-lg shadow-lg max-w-md w-full`}
              onClick={e => e.stopPropagation()}
          >
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Donate Crypto</h3>
                  <button 
                      onClick={() => setShowOverlay(false)}
                      className="text-2xl cursor-pointer"
                  >
                      <FontAwesomeIcon icon={faTimes} />
                  </button>
              </div>

              {/* Seleção de opções */}
              <div className="flex gap-2 mb-4">
                  {donationOptions.map((option, index) => (
                      <button
                          key={index}
                          onClick={() => setSelectedOption(index)}
                          className={`px-3 py-1 rounded cursor-pointer ${
                              selectedOption === index 
                                  ? `${props.theme === "dark" ? 'bg-black text-yellow-300' : 'bg-blue-600 text-white'}`
                                  : 'bg-gray-200 text-black'
                          }`}
                      >
                          {option.type}
                      </button>
                  ))}
              </div>

              {/* Endereço */}
              <p className="break-all mb-4 font-mono text-sm">
                  {donationOptions[selectedOption].address}
              </p>

              {/* QR Code (somente para Lightning Network) */}
              {donationOptions[selectedOption].qrCode && (
                  <div className="mb-4 flex justify-center">
                      <img 
                          src={donationOptions[selectedOption].qrCode}
                          alt={`QR Code for ${donationOptions[selectedOption].type}`}
                          className="w-64 h-64 object-contain"
                      />
                  </div>
              )}

              {/* Botão de copiar */}
              <button
                  onClick={() => {
                      navigator.clipboard.writeText(donationOptions[selectedOption].address);
                      alert('Endereço copiado para a área de transferência!');
                  }}
                  className={`${props.theme === "dark" ? 'bg-black text-yellow-300' : 'bg-blue-600 text-white'} px-4 py-2 rounded hover:opacity-95 w-full cursor-pointer`}
              >
                  Copiar Endereço
              </button>
          </div>
        </div>
      )}
    </>
  );
}