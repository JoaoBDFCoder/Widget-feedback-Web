import { feedBackType, feedBackTypes } from ".."
import { CloseButton } from "../../CloseButton"

interface FeedBackTypeStepProps {
  onFeedBackTypeChange: (type: feedBackType) => void;
}

export function FeedBackTypeStep({ onFeedBackTypeChange }: FeedBackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu FeedBack</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedBackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              onClick={() => onFeedBackTypeChange(key as feedBackType)}
              type="button"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          )
        })}
      </div>

    </>
  )
}