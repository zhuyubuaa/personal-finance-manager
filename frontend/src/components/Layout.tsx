import Header from "./Header";
import SideMenu from "./SideMenu";



export default function Layout({ children }: any): JSX.Element {
  return (
    <div className="layout">
      <SideMenu />
      <div className="main-body">
        <Header />
        {children}
      </div>
    </div>
  );
}
