import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faXTwitter, faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { type JSX } from "react";

interface IFooterProps {
  theme: "dark" | "white",
}

export default function Footer(props: IFooterProps): JSX.Element {
    return (
      <>
        <footer className={`flex flex-col gap-1 items-center transition-colors duration-1000 mb-2
        ${props.theme === "dark" ? 'text-yellow-300' : 'text-black'} text-center max-w-[800px] justify-self-center font-semibold`}>
          <p className="col-span-3">
            O <a href="https://pobrometro.pexe.dev" target="_blank" className="hover:underline"><strong>Pobrômetro</strong></a> é um site de conversão criado apenas para diversão. Os valores são baseados no preço médio dos itens e não refletem cotações oficiais ou precisas.
          </p>
          <div className="flex gap-1">
            <a href="https://youtube.com/@ultimatepexe" target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="https://x.com/ultimatepexe" target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a>
            <a href="https://discord.gg/papahardware" target="_blank"><FontAwesomeIcon icon={faDiscord} /></a>
            <a href="https://github.com/ultimatepexe" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </footer>
      </>
    );
}