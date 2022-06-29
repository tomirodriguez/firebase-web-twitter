import {
  ChangeEvent,
  FC,
  HTMLInputTypeAttribute,
  useRef,
  useState,
} from 'react';
import { ERROR } from '../../../colors';
import { INPUT_MAX_LENGTH } from '../../../constants/index';

type Props = {
  label: string;
  hideLabel?: boolean;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
  value: string;
  autocomplete?: boolean;
  required?: boolean;
  maxLength?: number;
  error: string;
  forceError: boolean;
};

export const InputField: FC<Props> = ({
  label,
  placeholder = '',
  hideLabel = true,
  type = 'text',
  onChange,
  value: forcedValue,
  autocomplete = true,
  required = false,
  maxLength = INPUT_MAX_LENGTH,
  forceError = false,
  error = '',
}) => {
  const id = label.replace(/\s/g, '').toLowerCase();
  const [selected, setSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [firstInput, setFirstInput] = useState(!forceError);

  const handleFocus = () => {
    setSelected(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  const handleBlur = () => {
    if (firstInput) setFirstInput(false);
  };

  const showError = error !== '' && (!firstInput || forceError);

  return (
    <div className="w-full relative focus-within:text-primary-blue">
      <label htmlFor={id} hidden={hideLabel}>
        {label}
      </label>
      <div
        className={`relative border ${
          showError ? 'border-error' : 'border-card-dark'
        } rounded-md flex items-center group`}
      >
        <span
          className={`absolute top-3 left-3 text-md transition-all text-secondary-text group-focus-within:text-primary-blue group-focus-within:scale-90 group-focus-within:-translate-x-2 group-focus-within:-translate-y-2 group-focus-within:text-sm ${
            forcedValue.length > 0
              ? 'scale-90 text-primary-blue -translate-x-2 -translate-y-2 text-sm'
              : ''
          }`}
          style={{ color: showError ? ERROR : '' }}
        >
          {placeholder}
        </span>
        {selected && (
          <span className="hidden absolute top-2 right-3 text-xs text-secondary-text group-focus-within:block">
            {forcedValue.length}/{maxLength}
          </span>
        )}
        <input
          ref={inputRef}
          onChange={handleChange}
          className="outline-none bg-transparent w-full px-4 text-md text-white focus:border-primary-blue h-18 z-10"
          id={id}
          name={id}
          type={type}
          value={forcedValue}
          aria-errormessage="error-message"
          aria-invalid={showError}
          aria-placeholder={placeholder}
          autoComplete={autocomplete ? 'on' : 'off'}
          required={required}
          maxLength={maxLength}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </div>
      {showError && (
        <p id="error-message" className="mt-1 text-error text-xs text-right">
          {error}
        </p>
      )}
    </div>
  );
};
