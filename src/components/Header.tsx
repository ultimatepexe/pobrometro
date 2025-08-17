import { type JSX } from "react";
import CurrencyInput from "react-currency-input-field";

interface IHeaderProps {
  theme: "dark" | "white";
  toggleMode: () => void;
  converted: boolean;
  setConvert: () => void;
  value: number;
  setValue: (value: number) => void;
}

export default function Header(props: IHeaderProps): JSX.Element
{
  const mimg = props.theme === "dark" ? "moon.png" : "sun.png"

  return (
    <header className={`text-white max-w-[800px] min-w-[320px] justify-self-center p-[5px] font-semibold font-sans`}
    onKeyDown={(event) => {
        if (event.key === 'Enter') {
            props.setConvert();
        }
    }}>
      <img src="pobrometro-logo.png" alt="Pobrômetro" />
      <p className={`${props.theme === "dark" ? 'text-yellow-300' : 'text-black'} mb-2 transition-all duration-1000`}>
          Bem-vindo ao <strong>Pobrômetro</strong>, sua ferramenta definitiva para decifrar os mistérios dos números e descobrir o que realmente significam aqueles valores em reais no seu dia a dia! Aqui, transformamos cifras complicadas em comparações simples e divertidas, convertendo seu dinheiro em coisas que você entende – de cafezinhos a compras dos sonhos. Nosso objetivo? Te dar uma visão clara (ou pelo menos uma ilusão bem convincente) sobre como <em>seu suado dinheirinho</em> é gasto, investido ou, quem sabe, perdido no éter das contas e impostos. Prepare-se para rir, refletir e, talvez, chorar um pouco!
      </p>
      <div className="flex max-w-[800px] gap-1.5 m-1">
          <div className={`flex ${props.theme === "dark" ? 'flex-col bg-slate-900' : 'flex-col-reverse bg-white'} h-[40px] rounded-full p-0.5 m-0 transition-all duration-1000`}>
              <div className={`${props.theme === "dark" ? 'bg-slate-700' : 'bg-neutral-300'} w-[20px] rounded-full p-1 cursor-pointer transition-all duration-1000`} onClick={props.toggleMode}>
                  <img src={mimg} alt="Tema" />
              </div>
          </div>
          <div className={`flex items-center ${props.theme === "dark" ? 'bg-neutral-900' : 'bg-white'} transition-all duration-1000 w-full rounded-md p-2 focus-within:ring-2 ${props.theme === "dark" ? 'focus-within:ring-yellow-300' : 'focus-within:ring-blue-600'}`}>
              <p className={`${props.theme === "dark" ? 'text-white' : 'text-black'} mr-2`}>R$</p>
              <CurrencyInput
                  value={props.value}
                  onValueChange={(_value, _name, values) => props.setValue(values!.float !== null ? values!.float : 0)}
                  placeholder="0"
                  allowNegativeValue={false}
                  maxLength={17}
                  className="bg-transparent outline-none w-full"
                  style={{ color: props.theme === "dark" ? 'white' : 'black' }}
              />
          </div>
          <button className={`${props.theme === "dark" ? 'bg-yellow-400 text-black hover:bg-yellow-500 active:bg-yellow-600' : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'} p-2 rounded-md cursor-pointer active:scale-97 transition-transform`}
          onClick={props.setConvert}>
              CONVERTER
          </button>
      </div>
    </header>
  );
}