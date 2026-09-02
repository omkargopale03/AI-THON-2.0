export default function FormInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  icon: Icon,
  options = [],
  rows = 3,
  className = '',
  helperText,
}) {
  const isSelect = type === 'select'
  const isTextarea = type === 'textarea'

  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="text-xs font-semibold font-mono tracking-wide text-slate-300 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-cyan-400 font-bold">*</span>}
          </span>
          {helperText && <span className="text-[10px] text-slate-500 font-normal">{helperText}</span>}
        </label>
      )}

      <div className="relative rounded-xl group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {isSelect ? (
          <select
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full rounded-xl bg-[#0c1022]/90 border text-slate-100 text-sm font-sans focus:outline-none transition-all duration-200 cursor-pointer ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-8 py-2.5 ${
              error
                ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                : 'border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
            }`}
          >
            <option value="" disabled className="bg-[#0c1022] text-slate-500">
              {placeholder || 'Select an option...'}
            </option>
            {options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt
              const lbl = typeof opt === 'object' ? opt.label : opt
              return (
                <option key={val} value={val} className="bg-[#0c1022] text-slate-100 py-1">
                  {lbl}
                </option>
              )
            })}
          </select>
        ) : isTextarea ? (
          <textarea
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            className={`w-full rounded-xl bg-[#0c1022]/90 border text-slate-100 placeholder:text-slate-500 text-sm font-sans focus:outline-none transition-all duration-200 resize-none ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 py-2.5 ${
              error
                ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                : 'border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
            }`}
          />
        ) : (
          <input
            type={type}
            id={id || name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={`w-full rounded-xl bg-[#0c1022]/90 border text-slate-100 placeholder:text-slate-500 text-sm font-sans focus:outline-none transition-all duration-200 ${
              Icon ? 'pl-10' : 'pl-3.5'
            } pr-3.5 py-2.5 ${
              error
                ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                : 'border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)]'
            }`}
          />
        )}
      </div>

      {error && (
        <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1 mt-0.5 animate-fadeIn">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
