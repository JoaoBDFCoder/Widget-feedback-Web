import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { useState } from "react";

import bugImageUrl from '../../images/bug.svg';
import ideaImageUrl from '../../images/idea.svg';
import thoughtImageUrl from '../../images/thought.svg';
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feedBackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada'
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de uma nuvem de pensamento'
    },
  },
};

export type feedBackType = keyof typeof feedBackTypes /* Usando a Tipagem do TypeScript para definir o tipo de FeddBack amarrando as informações e não deixando passar dados errados */

/* Object.entries(feddBackTypes) => 
Retorna um array de arrays nesse formato
[
  ['Bug', {...}],
  ['Idea', {...}],
  ['Thought', {...}],
]*/

export function WidgetForm() {
  const [feedBackType, setFeedBackType] = useState<feedBackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false);

  function handleRestartFeedback() { // Limpa o estado do feedBackType voltando para a primeira tela
    setFeedbackSend(false);
    setFeedBackType(null);
  }
  
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      
      { feedbackSend ? (
        <FeedBackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          {!feedBackType ? (
        <FeedBackTypeStep onFeedBackTypeChange={setFeedBackType} />
      ) : (
        <FeedBackContentStep 
          feedBackType={feedBackType} // Passando para o component FeedBackContentStep as propriedades
          onFeedbackRestartRequested={handleRestartFeedback} // Passando para o component FeedBackContentStep as propriedades
          onFeedbackSend={() => setFeedbackSend(true)}
        />
      )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥ por <a className="underline underline-offset-1" href="https://www.linkedin.com/in/jo%C3%A3o-batista-6509511ab/">João Batista</a>
      </footer>
    </div>
  );
}