import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../loading";

interface ScreeshotButtonProps {
  screenshot: string | null;
  onScreeshot: (screeshot: string | null) => void;
}

export function ScreeshotButton({ screenshot, onScreeshot }: ScreeshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreeshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!); // ! confirma que o HTML nunca vai ser nulo
    const base64image = canvas.toDataURL('image/png'); // vai tirar o print da pagina e vai converter para uma imagem png no formato base64(formato de texto que representa uma imagem) para ser enviada para o banco de dados no BackEnd
    onScreeshot(base64image);

    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreeshot(null)}
        style={{
          backgroundImage: `url(${screenshot}`,
          backgroundPosition: 'right Bottom',
          backgroundSize: 50
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreeshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6 text-zinc-100" />}
    </button>
  )
}