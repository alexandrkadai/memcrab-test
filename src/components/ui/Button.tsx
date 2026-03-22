interface ButtonProps {
  buttonText: string;
  buttonAction: () => void;
}
export default function Button({ buttonText, buttonAction }: ButtonProps) {
  return <button onClick={buttonAction}>{buttonText}</button>;
}
