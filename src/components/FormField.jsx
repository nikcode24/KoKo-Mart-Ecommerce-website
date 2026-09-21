import { useId } from 'react'

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
  required = false,
  hint,
}) {
  const id = useId()
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        className={`form-input${error ? ' has-error' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="form-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}