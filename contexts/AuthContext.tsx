import { createContext, ReactNode, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserGet, storageUserSave, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from '@storage/storageAuthToken';

export interface AuthContextDataProps {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
    isLoadingUserStorageData: boolean
}

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    const userAndTokenUpdate = async (userData: UserDTO, token: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);
    }

    const storageUserAndTokenSave = async (userData: UserDTO, token: string, refresh_token: string) => {
        try {
            setIsLoadingUserStorageData(true);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            await storageUserSave(userData);
            await storageAuthTokenSave({ token, refresh_token });

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const { data } = await api.post('/sessions', { email, password })

            if (data.user && data.token && data.refresh_token) {
                await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
                userAndTokenUpdate(data.user, data.token)
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    const signOut = async () => {
        try {
            setIsLoadingUserStorageData(true)

            setUser({} as UserDTO)
            await storageUserRemove()
            await storageAuthTokenRemove();

        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false)
        }
    }

    async function updateUserProfile(userUpdated: UserDTO) {
        try {
            setUser(userUpdated);
            await storageUserSave(userUpdated);
        } catch (error) {
            throw error;
        }
    }

    const loadUserData = async () => {
        try {
            const userLogged = await storageUserGet();
            const { token } = await storageAuthTokenGet();

            if (token && userLogged) {
                userAndTokenUpdate(userLogged, token);
            }
        } catch (error) {
            throw error
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        loadUserData()
    }, [])

    useEffect(() => {
        const subscribe = api.registerInterceptTokenManager(signOut);

        return () => {
            subscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, updateUserProfile, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    )
}