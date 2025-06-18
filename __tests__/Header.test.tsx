import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/app/pageComponents/Header";

// GET BY

describe("Header", () => {
  it("should render a heading in page by text content", () => {
    render(
      <Header title={"My Title"} isMainPage={true} setIsMainPage={() => true} />
    );
    const heading = screen.getByRole("heading", { name: "My Title" });
    expect(heading).toBeInTheDocument();
  });
});

// it("should render a heading with a specific title", () => {
//   render(<Header title={"My Title"} isMainPage={true} setIsMainPage={() => true} />);
//   expect(screen.getByTitle("Pets")).toBeInTheDocument();
// });

// // FIND BY - async

// it("should render a heading in page by text content", async () => {
//   render(<Header title={"My Title"} isMainPage={true} setIsMainPage={() => true} />);
//   expect(await screen.findByText("Cats")).toBeInTheDocument();
// });

// // QUERY BY - returns null if no elements match instead of error

// it("should'nt render a header with specified text", () => {
//   render(<Header title={"My Title"} isMainPage={true} setIsMainPage={() => true} />);
//   expect(screen.queryByText(/header/i)).not.toBeInTheDocument();
// });

// // GET ALL

// it("should render two headings in the file", async () => {
//   render(<Header title={"My Title"} isMainPage={true} setIsMainPage={() => true} />);
//   const headingDocuments = screen.getAllByRole("heading");
//   expect(headingDocuments.length).toBe(2);
// });
