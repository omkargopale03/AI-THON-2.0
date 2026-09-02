import { CheckIcon } from './Icons'

export default function RegistrationProgress({ currentStep, steps, onStepClick }) {
  return (
    <div className="w-full mb-8 lg:mb-12">
      <div className="relative flex items-center justify-between">
        {/* Background Track Line */}
        <div className="absolute left-6 right-6 top-5 -translate-y-1/2 h-[2px] bg-slate-800 -z-0" />

        {/* Active Progress Fill Line */}
        <div
          className="absolute left-6 top-5 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out -z-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{
            width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 48px * ${
              (currentStep - 1) / (steps.length - 1)
            })`,
          }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep
          const isActive = step.number === currentStep
          const isPending = step.number > currentStep

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative z-10 group"
            >
              {/* Circular Step Badge */}
              <button
                type="button"
                disabled={isPending}
                onClick={() => isCompleted && onStepClick && onStepClick(step.number)}
                aria-label={`Step ${step.number}: ${step.title}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] cursor-pointer hover:scale-105'
                    : isActive
                    ? 'bg-[#070b18] text-cyan-400 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.7)] ring-4 ring-cyan-500/20'
                    : 'bg-[#0f121e] text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                {isCompleted ? (
                  <CheckIcon className="w-5 h-5 text-black" />
                ) : (
                  <span>{step.number}</span>
                )}
              </button>

              {/* Step Labels */}
              <div className="mt-3 text-center">
                <span
                  className={`block text-[10px] font-mono tracking-widest uppercase ${
                    isActive
                      ? 'text-cyan-400 font-bold drop-shadow-[0_0_4px_rgba(6,182,212,0.4)]'
                      : isCompleted
                      ? 'text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  STEP {step.number}
                </span>
                <span
                  className={`hidden sm:block text-xs font-medium tracking-tight mt-0.5 max-w-[130px] ${
                    isActive
                      ? 'text-white font-semibold'
                      : isCompleted
                      ? 'text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
