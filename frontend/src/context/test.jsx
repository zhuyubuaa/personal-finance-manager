// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import axios from "axios";
// // import {useRouter} from "next/router";
// import {ReactNode, createContext, useContext, useEffect, useState} from "react";
// import {useRouter} from "next/router";

// export interface IUserContext {
//   currentUser: UserType | undefined;
//   setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
//   handleLogout: () => void;
//   token: string | undefined;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// }

// export const UserContext = createContext<IUserContext>({} as IUserContext);

// interface UserProviderType {
//   children: ReactNode;
// }

// export const useUserContext = () => useContext(UserContext);

// export const UserContextProvider = ({children}: UserProviderType) => {
//   const [currentUser, setCurrentUser] = useState<UserType | undefined>();
//   const [token, setToken] = useState<string | undefined>();
//   const router = useRouter();

// //   useEffect(() => {
// //     const queryToken = router.query.token;
// //     if (queryToken) {
// //       Cookies.set("token", `${queryToken}`);
// //       const decode: any = jwtDecode(`${queryToken}`);
// //       setCurrentUser(decode);
// //       router.replace("/");
// //       console.log("router replaced")
// //     }
// //   }, [token]);

// //   useEffect(() => {
// //     const token = Cookies.get("token");
// //     if (token) {
// //       const decode: any = jwtDecode(token);
// //       setCurrentUser(decode);
// //     }
// //   }, [token]);

// //   useEffect(() => {
// //     if (Cookies.get("token")) {
// //       setToken(Cookies.get("token"));
// //     }
// //   }, [router.pathname]);

//   function handleLogout() {
//     setCurrentUser(undefined);
//     Cookies.remove("token");
//   }

//   return (
//     <UserContext.Provider
//       value={{currentUser, setCurrentUser, handleLogout, token}}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
