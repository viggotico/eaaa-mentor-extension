import axios, { AxiosInstance, AxiosResponse } from "axios";
import qs from 'qs';

import {
    Booking,
    BookingPostData,
    Chat,
    ChatMessage,
    ChatMessagePostData,
    ChatPostData,
    ResponseApi,
    User,
    UserPostData,
    UserRegisterPostData
} from "../../types/api";

const api: AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/v1` :
        `${process.env.NEXT_PUBLIC_FRONTEND_URL_LOCAL}/api/v1`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

const getQuery = (obj: object | undefined) =>
    obj ? `?${qs.stringify(obj, { encodeValuesOnly: true })}` : '';

const parseFilters = <T>(filters: T & {}) => {
    let obj: Record<string, Record<string, string>> = {};
    Object.entries(filters).forEach(([key, value]) => obj[key] = { '$eqi': `${value}` });
    return obj;
}

export class ApiFrontend {
    static currentUser: User | null;
    static verbose = true;

    private static getUsersAll = (type?: User['type']) =>
        (this.findDocuments<User[], UserPostData>('/users', { type }) as unknown) as Promise<User[]>;

    private static getDocument = async <T>(endpoint: string, documentId: string, query?: object) =>
        api.get<ResponseApi<T>>(`${endpoint}/${documentId}${getQuery(query)}`).then(res => res.data);
    private static getDocuments = async <T>(endpoint: string, query?: object, find?: boolean) =>
        api.get<ResponseApi<T>>(`${endpoint}${find ? '/find' : ''}${getQuery(query)}`).then(res => res.data);

    private static createDocument = async <T, TData>(endpoint: string, data?: Partial<TData>, query?: object) =>
        api.post<ResponseApi<T>>(`${endpoint}${getQuery(query)}`, data).then(res => res.data);

    private static updateDocument = async <T, TData>(endpoint: string, documentId: string, data?: Partial<TData>, query?: object) =>
        api.put<ResponseApi<T>>(`${endpoint}/${documentId}${getQuery(query)}`, data).then(res => res.data);

    private static updateDocuments = async <T, TData>(endpoint: string, documentIds: string[], data?: Partial<TData>[], query?: object) => {
        const promises: Promise<ResponseApi<T>>[] = [];
        for (let i = 0; i < documentIds.length; i++) promises.push(this.updateDocument<T, TData>(endpoint, documentIds[i], data?.[i], query));
        return Promise.all(promises);
    }

    private static deleteDocument = async <T>(endpoint: string, documentId: string, query?: object) =>
        api.delete<ResponseApi<T>>(`${endpoint}/${documentId}${getQuery(query)}`).then(res => res.data);

    private static deleteDocuments = async <T>(endpoint: string, documentIds: string[], query?: object) => {
        const promises: Promise<ResponseApi<T>>[] = [];
        for (const documentId of documentIds) promises.push(this.deleteDocument(endpoint, documentId, query));
        return Promise.all(promises);
    }

    private static findDocuments = async <T, TFilter>(endpoint: string, filters: Partial<TFilter> & {}) =>
        this.getDocuments<T>(endpoint, { filters: parseFilters(filters) }, true);

    private static wrapper = <T, TData>(endpoint: string) => ({
        get: (documentId: string) => this.getDocument<T>(endpoint, documentId),
        getAll: () => this.getDocuments<T[]>(endpoint),
        find: (filters: Partial<TData>) => this.findDocuments<T[], TData>(endpoint, filters),
        create: (data: Partial<TData>) => this.createDocument<T, TData>(endpoint, data),
        update: (documentId: string, data: Partial<TData>) => this.updateDocument<T, TData>(endpoint, documentId, data),
        delete: (documentId: string) => this.deleteDocument<T>(endpoint, documentId),
        bulkUpdate: (documentId: string[], data: Partial<TData>[]) => this.updateDocuments<T, TData>(endpoint, documentId, data),
        bulkDelete: (documentId: string[]) => this.deleteDocuments<T>(endpoint, documentId),
    });

    // methods

    static auth = {
        register: async (data: UserRegisterPostData) => api.post<User>('/auth/register', data).then(res => res.data),
        login: async (email: string, password: string) => api.post<User>('/auth/login', { email, password }).then(res => res.data),
        loginAuto: async () => api.get<User>('/auth/session').then(res => res.data),
        logout: async () => {
            const canLogout = api.get<boolean>('/auth/logout').then(res => res.data);
            if (!canLogout) return false;
            this.currentUser = null;
            return true;
        },
        forgotPassword: async (email: string) =>
            api.post<void, AxiosResponse<void>>('/auth/forgot-password', { email })
                .then((res) => this.verbose ? alert(`Password reset link sent to ${email}`) : undefined),
        resetPassword: async (code: string, password: string, passwordConfirmation: string) =>
            api.post<void, AxiosResponse<void>>('/auth/reset-password', { code, password, passwordConfirmation })
                .then((res) => this.verbose ? alert('Password has been reset!') : undefined),
        changePassword: async (currentPassword: string, password: string, passwordConfirmation: string) => {
            return new Promise<void>(async (resolve, reject) => {
                if (!this.currentUser) {
                    if (this.verbose) alert('cannot change password due to invalid session.');
                    return;
                }
                await api.post<void, AxiosResponse<void>>('/auth/change-password', { currentPassword, password, passwordConfirmation })
                    .then((res) => {
                        if (this.verbose) alert('password has been changed!');
                        resolve();
                    }).catch(err => reject(err));
            });
        },
    }

    static users = {
        get: (documentId: string) => (this.getDocument<User>('/users', documentId) as unknown) as Promise<User>,
        getAll: () => this.getUsersAll(),
        find: (filters: Partial<UserPostData>) => (this.findDocuments<User[], UserPostData>('/users', filters) as unknown) as Promise<User[]>,
    
        getMentors: () => this.getUsersAll('Mentor'),
        getMentees: () => this.getUsersAll('Mentee'),
    
        update: (documentId: string, data: Partial<UserPostData>) =>
            (this.updateDocument<User, UserPostData>('/users', documentId, data) as unknown) as Promise<User>,
        bulkUpdate: (documentId: string[], data: Partial<UserPostData>[]) =>
            (this.updateDocuments<User, UserPostData>('/users', documentId, data) as unknown) as Promise<User[]>,
        bulkDelete: (documentId: string[]) =>
            (this.deleteDocuments<User>('/users', documentId) as unknown) as Promise<User[]>,
    }

    static chats = this.wrapper<Chat, ChatPostData>('/chats');
    static chatMessages = this.wrapper<ChatMessage, ChatMessagePostData>('/chat-messages');
    static bookings = this.wrapper<Booking, BookingPostData>('/bookings');
}