"use client";
import { ReactNode, useEffect } from "react";
import KambazNavigation from "./navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Session from "./account/Session";

function KambazShell({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isPublicRoute =
    pathname === "/account" ||
    pathname.startsWith("/account/signin") ||
    pathname.startsWith("/account/signup");

  useEffect(() => {
    if (!currentUser && !isPublicRoute) {
      router.replace("/account/signin");
    }
  }, [currentUser, isPublicRoute, router]);

  if (!currentUser && !isPublicRoute) {
    return null;
  }

  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Provider store={store}>
      <Session>
        <KambazShell>{children}</KambazShell>
      </Session>
    </Provider>
  );
}
