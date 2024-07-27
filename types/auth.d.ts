import type { UserType } from 'models/user/user';

export interface AuthContextType {
    user: UserType | null;
    isLoading: boolean;
    isError: boolean;
    isAuthenticated: boolean;
    refetchAuth: () => void;
}
