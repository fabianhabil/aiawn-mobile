import {
    createContext,
    useContext,
    type FC,
    type PropsWithChildren
} from 'react';
import { useQuery } from 'react-query';
import { AuthContextType, AuthType } from 'types/auth';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data, isLoading, isError } = useQuery<AuthType | null>({
        queryKey: ['user-data'],
        queryFn: () => {
            return null;
        }
    });

    const isAuthenticated = Boolean(data);

    return (
        <AuthContext.Provider
            value={{ user: data ?? null, isLoading, isError, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'Make sure the component is wrapped by AuthContext Provider'
        );
    }

    return context;
};
