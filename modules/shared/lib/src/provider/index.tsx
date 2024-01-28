import { ClientProvider } from './query';

type Props = {
  children: React.ReactNode;
};

export function AppProvider({ children }: Props) {
  return <ClientProvider>{children}</ClientProvider>;
}
