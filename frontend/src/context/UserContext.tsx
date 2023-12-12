import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserType {
  userId: string;
  userName: string;
}

interface IUserContextType {
  currentUser: UserType | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  handleLogout: () => void;
}

interface UserProviderType {
  children: ReactNode;
}

export const UserContext = createContext<IUserContextType>(
  {} as IUserContextType
);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: UserProviderType) => {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    setCurrentUser(undefined);
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
