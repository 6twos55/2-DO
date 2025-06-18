type FooterProps = {
  todosLength: number;
};

const Footer = ({ todosLength }: FooterProps) => {
  return (
    <footer className="flex justify-between items-center">
      <p className="text-sm sm:text-base">
        {todosLength} {todosLength === 1 ? "task" : "tasks"} left
      </p>
      <p className="text-sm sm:text-base">&copy;2-DO 2025</p>
    </footer>
  );
};

export default Footer;
