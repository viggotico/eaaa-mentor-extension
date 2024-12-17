import axios, { AxiosInstance, AxiosResponse } from "axios";
import qs from 'qs';

import {
    Booking,
    BookingPostData,
    Chat,
    ChatMessage,
    ChatMessagePostData,
    ChatPostData,
    Media,
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
        'Accept': 'application/json',
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

    private static getDocument = async <T>(endpoint: string, id: string | number, query?: object) =>
        api.get<ResponseApi<T>>(`${endpoint}/${id}${getQuery(query)}`).then(res => res.data);
    private static getDocuments = async <T>(endpoint: string, query?: object, find?: boolean) =>
        api.get<ResponseApi<T>>(`${endpoint}${find ? '/find' : ''}${getQuery(query)}`).then(res => res.data);

    private static createDocument = async <T, TData>(endpoint: string, data?: Partial<TData>, query?: object) =>
        api.post<ResponseApi<T>>(`${endpoint}${getQuery(query)}`, data).then(res => res.data);

    private static updateDocument = async <T, TData>(endpoint: string, id: string | number, data?: Partial<TData>, query?: object) =>
        api.put<ResponseApi<T>>(`${endpoint}/${id}${getQuery(query)}`, data).then(res => res.data);

    private static updateDocuments = async <T, TData>(endpoint: string, ids: (string | number)[], data?: Partial<TData>[], query?: object) => {
        const promises: Promise<ResponseApi<T>>[] = [];
        for (let i = 0; i < ids.length; i++) promises.push(this.updateDocument<T, TData>(endpoint, ids[i], data?.[i], query));
        return Promise.all(promises);
    }

    private static deleteDocument = async <T>(endpoint: string, id: string | number, query?: object) =>
        api.delete<ResponseApi<T>>(`${endpoint}/${id}${getQuery(query)}`).then(res => res.data);

    private static deleteDocuments = async <T>(endpoint: string, ids: (string | number)[], query?: object) => {
        const promises: Promise<ResponseApi<T>>[] = [];
        for (const id of ids) promises.push(this.deleteDocument(endpoint, id, query));
        return Promise.all(promises);
    }

    private static findDocuments = async <T, TFilter>(endpoint: string, filters: Partial<TFilter> & {}) =>
        this.getDocuments<T>(endpoint, { filters: parseFilters(filters) }, true);

    private static wrapper = <T, TData>(endpoint: string) => ({
        get: (id: string | number) => this.getDocument<T>(endpoint, id),
        getAll: () => this.getDocuments<T[]>(endpoint),
        find: (filters: Partial<TData>) => this.findDocuments<T[], TData>(endpoint, filters),
        create: (data: Partial<TData>) => this.createDocument<T, TData>(endpoint, data),
        update: (id: string | number, data: Partial<TData>) => this.updateDocument<T, TData>(endpoint, id, data),
        delete: (id: string | number) => this.deleteDocument<T>(endpoint, id),
        bulkUpdate: (id: (string | number)[], data: Partial<TData>[]) => this.updateDocuments<T, TData>(endpoint, id, data),
        bulkDelete: (id: (string | number)[]) => this.deleteDocuments<T>(endpoint, id),
    });

    // methods

    static auth = {
        register: async (data: Partial<UserRegisterPostData>) => api.post<User>('/auth/register', data).then(res => this.currentUser = res.data),
        login: async (email: string, password: string) => api.post<User>('/auth/login', { email, password }).then(res => this.currentUser = res.data),
        loginAuto: async () => {
            try {
                const user = await api.get<User>('/auth/session').then(res => this.currentUser = res.data);
                return user;
            } catch (e) { }
        },
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

    static upload = {
        uids: { user: 'plugin::users-permissions.user' },
        field: { user: 'avatar' },
        entryFileFormData: async (formData: FormData) =>
            await api.post<Media[], AxiosResponse<Media[]>>('/upload', formData, {
                headers: {
                    'Accept': 'multipart/form-data',
                    'Content-Type': 'multipart/form-data'
                },
            }).then(res => res.data),
        entryFile: async (file: Blob, entryUid: 'plugin::users-permissions.user', entryId: string | number, field: string) =>
            await api.post<Media[], AxiosResponse<Media[]>>('/upload/file', { file, entryUid, entryId, field }).then(res => res.data),
    }

    static users = {
        get: (id: string | number) => (this.getDocument<User>('/users', id) as unknown) as Promise<User>,
        getAll: () => this.getUsersAll(),
        find: (filters: Partial<UserPostData>) => (this.findDocuments<User[], UserPostData>('/users', filters) as unknown) as Promise<User[]>,
    
        getMentors: () => this.getUsersAll('Mentor'),
        getMentees: () => this.getUsersAll('Mentee'),
    
        update: (id: string | number, data: Partial<UserPostData>) =>
            (this.updateDocument<User, UserPostData>('/users', id, data) as unknown) as Promise<User>,
        bulkUpdate: (id: (string | number)[], data: Partial<UserPostData>[]) =>
            (this.updateDocuments<User, UserPostData>('/users', id, data) as unknown) as Promise<User[]>,
        bulkDelete: (id: (string | number)[]) =>
            (this.deleteDocuments<User>('/users', id) as unknown) as Promise<User[]>,
    }

    static chats = this.wrapper<Chat, ChatPostData>('/chats');
    static chatMessages = this.wrapper<ChatMessage, ChatMessagePostData>('/chat-messages');
    static bookings = this.wrapper<Booking, BookingPostData>('/bookings');
}