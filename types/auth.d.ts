export interface AuthContextType {
    user: AuthType | null;
    isLoading: boolean;
    isError: boolean;
    isAuthenticated: boolean;
}

export interface AuthType {
    name: string;
    phoneNumber: string;
}
