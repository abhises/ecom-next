interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-w-[1920] mx-auto xl:px-20 md:px-2 px-4">{children}</div>
  );
};

export default Container;
