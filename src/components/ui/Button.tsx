import classes from "./Button.module.css";

interface ButtonProps {
  name: string;
  onClick?: () => void;
}

const Button = ({ name, onClick }: ButtonProps) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
