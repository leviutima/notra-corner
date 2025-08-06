import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type VerificationCodeContextType = {
  userIdCode: string | undefined;
  emailCode: {} | undefined;
  setUserIdCode: Dispatch<SetStateAction<string | undefined>>;
  setEmailCode: Dispatch<SetStateAction<{} | undefined>>;
};

const VerificationCodeContext = createContext<
  VerificationCodeContextType | undefined
>(undefined);

export function VerificationCodeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userIdCode, setUserIdCode] = useState<string | undefined>(undefined);
  const [emailCode, setEmailCode] = useState<{} | undefined>(undefined);

  return (
    <VerificationCodeContext.Provider
      value={{
        emailCode,
        userIdCode,
        setUserIdCode,
        setEmailCode,
      }}
    >
      {children}
    </VerificationCodeContext.Provider>
  );
}

export function useVerificationCode() {
  const context = useContext(VerificationCodeContext);
  if (context === undefined) {
    throw new Error(
      "useVerificationCode must be used within a ChangeSearchProvider"
    );
  }
  return context;
}
