import SideMenu from "./SideMenu";

export default function Layout({ children }: any): JSX.Element {
  return (
    <div className="layout">
      <SideMenu />
      <div className="main-body">{children}</div>
    </div>
  );
}
