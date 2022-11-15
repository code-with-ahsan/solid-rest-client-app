import { Component, ComponentProps } from "solid-js";

interface IconButtonProps extends ComponentProps<any> {
  onClick: (event: MouseEvent) => void;
  label: string;
  icon: string;
  type?: "reset" | "submit" | "button";
}

const IconButton: Component<IconButtonProps> = ({
  onClick,
  label,
  icon,
  type,
}) => {
  return (
    <button
      onclick={onClick}
      role="button"
      type={type || "button"}
      title={label}
      class="w-6 h-6 flex transition-all ease-in-out duration-100 hover:scale-125 items-center justify-center text-white bg-purple-600 border border-purple-600 rounded-full hover:bg-purple-700 active:text-white focus:outline-none focus:ring"
    >
      <span class="sr-only">{label}</span>
      <ion-icon name={icon}></ion-icon>
    </button>
  );
};

export default IconButton;
