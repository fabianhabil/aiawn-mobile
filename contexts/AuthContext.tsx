import type { UserType } from 'models/user/user';
import {
    createContext,
    useContext,
    type FC,
    type PropsWithChildren
} from 'react';
import { useQuery } from 'react-query';
import { AuthContextType } from 'types/auth';
import { getItem } from 'utils/AsyncStorage';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data, isLoading, isError, refetch } = useQuery<UserType | null>({
        queryKey: ['user-data'],
        queryFn: async () => {
            const user: UserType | null = await getItem('user-data');
            return user;
        }
    });

    const isAuthenticated = Boolean(data);

    return (
        <AuthContext.Provider
            value={{
                user: data ?? null,
                isLoading,
                isError,
                isAuthenticated,
                refetchAuth: refetch
            }}
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
