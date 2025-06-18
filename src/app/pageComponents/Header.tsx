type HeaderProps = {
  title: string;
  isMainPage: boolean;
  setIsMainPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ title, isMainPage, setIsMainPage }: HeaderProps) => {
  return (
    <nav className="flex justify-between items-center">
      <h1
        className="text-3xl sm:text-5xl font-semibold cursor-pointer"
        onClick={() => setIsMainPage(true)}
      >
        {title}
      </h1>
      <p
        className="cursor-pointer p-3 sm:p-5 pr-0 text-sm sm:text-base"
        onClick={() => setIsMainPage((prev) => !prev)}
      >
        {isMainPage ? "Completed tasks" : "Go back"}
      </p>
    </nav>
  );
};

export default Header;
