import Header from "./Header";

export default function Layout({ children }: any): JSX.Element {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
}
