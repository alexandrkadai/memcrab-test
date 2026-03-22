interface InputProps {
  inputPlaceholder: string;
  inputValue: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

export default function Input({
  inputPlaceholder,
  inputValue,
  onChange,
  min,
  max,
}: InputProps) {
  return (
    <input
      value={inputValue}
      placeholder={inputPlaceholder}
      type='number'
      min={min}
      max={max}
      onChange={onChange}
    />
  );
}
