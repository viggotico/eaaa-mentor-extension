import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { type NextRequest } from "next/server";
import { randomString } from "../StringUtils";
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
    UserLoginPostData,
    UserLoginRegisterResponse,
    UserPostData,
    UserRegisterPostData
} from "../../types/api";

const api: AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        `${process.env.BACKEND_URL}/api` :
        `${process.env.BACKEND_URL_LOCAL}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

const stringifyQuery = (obj: object | undefined) =>
    obj ? `${qs.stringify(obj, { encodeValuesOnly: true })}` : undefined;

const getQuery = (obj: object | undefined) => obj ? `?${stringifyQuery(obj)}&populate=*` : '?populate=*';

const parseFilters = (query: string) => {
    const filters = qs.parse(query);
    let obj: Record<string, Record<string, string>> = {};
    Object.entries(filters).forEach(([key, value]) => obj[key] = { '$eqi': `${value}` });
    return obj;
}

export class ApiBackend {
    private static verbose = true;
    private static getToken = (request: NextRequest) => request.cookies.get('token');
    private static removeToken = (request: NextRequest) => request.cookies.delete('token');
    private static setToken = (response: Response, token: string) => {
        const maxAge = 2592000; // 30 days
        const prod = process.env.NODE_ENV === 'production';
        const secure = prod ? '; Secure' : '';
        const httpOnly = prod ? '; HttpOnly' : '';
        return response.headers.set('Set-Cookie', `token=${token}; Max-Age=${maxAge}${secure}${httpOnly}`);
    }
    
    private static getAuthHeader = ({ request, token }: { request?: NextRequest, token?: string }) => {
        const tokenValue = token ?? (request ? this.getToken(request)?.value : undefined);
        return tokenValue ? ({ headers: { Authorization: `Bearer ${tokenValue}` } } as AxiosRequestConfig) : {};
    }

    private static getSelf = async ({ request, token }: { request?: NextRequest, token?: string }, query?: object) =>
        api.get<User>(`/users/me${getQuery(query)}`, this.getAuthHeader({ request, token })).then(res => res.data);
    
    private static getUsersAll = (type?: User['type']) =>
        (this.findDocuments<User[]>('/users', stringifyQuery(type ? { type } : undefined)) as unknown) as Promise<User[]>;

    private static getDocument = async <T>(endpoint: string, documentId: string, query?: object) =>
        api.get<ResponseApi<T>>(`${endpoint}/${documentId}${getQuery(query)}`).then(res => res.data);
    private static getDocuments = async <T>(endpoint: string, query?: object) =>
        api.get<ResponseApi<T>>(`${endpoint}${getQuery(query)}`).then(res => res.data);

    private static createDocument = async <T, TData>(request: NextRequest | undefined, endpoint: string, data?: Partial<TData>, query?: object) =>
        api.post<ResponseApi<T>>(`${endpoint}${getQuery(query)}`, { data }, this.getAuthHeader({ request })).then(res => res.data);

    private static updateDocument = async <T, TData>(request: NextRequest | undefined, endpoint: string, documentId: string, data?: Partial<TData>, query?: object) =>
        api.put<ResponseApi<T>>(`${endpoint}/${documentId}${getQuery(query)}`, { data }, this.getAuthHeader({ request })).then(res => res.data);

    private static updateDocuments = async <T, TData>(request: NextRequest | undefined, endpoint: string, documentIds: string[], data?: Partial<TData>[], query?: object) => {
        const promises: Promise<ResponseApi<T>>[] = [];
        for (let i = 0; i < documentIds.length; i++) promises.push(this.updateDocument<T, TData>(request, endpoint, documentIds[i], data?.[i], query));
        return Promise.all(promises);
    }

    private static deleteDocument = async <T>(request: NextRequest | undefined, endpoint: string, documentId: string, query?: object) =>
        api.delete<ResponseApi<T>>(`${endpoint}/${documentId}${getQuery(query)}`, this.getAuthHeader({ request })).then(res => res.data);

    private static deleteDocuments = async <T>(request: NextRequest | undefined, endpoint: string, documentIds: string[], query?: object) => {
        const promises: Promise<ResponseApi<T>>[] = [];
        for (const documentId of documentIds) promises.push(this.deleteDocument(request, endpoint, documentId, query));
        return Promise.all(promises);
    }

    private static findDocuments = async <T>(endpoint: string, query: string | undefined) =>
        this.getDocuments<T>(endpoint, query ? { filters: parseFilters(query) } : undefined);

    private static validationError = (message: string, reject?: (reason?: any) => void) => {
        reject?.(new Error(message));
        return false;
    }
    
    private static validateEmailExists = async (email: string) => {
        const existingUsers = await this.users.find(stringifyQuery({ email })!);
        if (existingUsers.length >= 1) return true;
        return false;
    }
    
    private static validateEmail = async (email: string, reject?: (reason?: any) => void, checkIfExists?: boolean) => {
        if (!email) return this.validationError('Invalid: email not defined.', reject);
        if (!email.includes('@') || !email.includes('.')) return this.validationError('Invalid email.', reject);
        if (email.includes(' ') || !email.includes('.')) return this.validationError('Invalid email: whitespace is not allowed.', reject);
        const emailExists = !checkIfExists ? false : await this.validateEmailExists(email);
        if (emailExists) return this.validationError('Email is already in use.', reject);
        return true;
    }
    
    private static validatePassword = (password: string | undefined, reject?: (reason?: any) => void) => {
        if (!password) return this.validationError('Invalid: password not defined.', reject);
        if (password.length < 6) return this.validationError('Password must be 6 or more characters.', reject);
        if (password.length > 50) return this.validationError('Password cannot exceed 50 characters.', reject);
        return true;
    }
    
    private static validatePasswords = (password: string | undefined, passwordOther: string | undefined, reject?: (reason?: any) => void) => {
        const validPassord = this.validatePassword(password, reject);
        if (!validPassord) return false;
        const validPassordOther = this.validatePassword(passwordOther, reject);
        if (!validPassordOther) return false;
        if (validPassord === validPassordOther) return true;
        else return this.validationError('The provided passwords are not the same.', reject);
    }
    
    private static validateName = (name: string, surname: string, reject?: (reason?: any) => void) => {
        if (!name) return this.validationError('Invalid: name not defined.', reject);
        if (!surname) return this.validationError('Invalid: surname not defined.', reject);
        if (name.trim().length < 2) return this.validationError('Name must be 2 or more characters.', reject);
        if (surname.trim().length < 2) return this.validationError('Surname must be 2 or more characters.', reject);
        return true;
    }

    private static wrapper = <T, TData>(endpoint: string) => ({
        get: (documentId: string) => this.getDocument<T>(endpoint, documentId),
        getAll: () => this.getDocuments<T[]>(endpoint),
        find: (query: string) => this.findDocuments<T[]>(endpoint, query),
        create: (request: NextRequest, data: Partial<TData>) => this.createDocument<T, TData>(request, endpoint, data),
        update: (request: NextRequest, documentId: string, data: Partial<TData>) => this.updateDocument<T, TData>(request, endpoint, documentId, data),
        delete: (request: NextRequest, documentId: string) => this.deleteDocument<T>(request, endpoint, documentId),
        bulkUpdate: (request: NextRequest, documentId: string[], data: Partial<TData>[]) => this.updateDocuments<T, TData>(request, endpoint, documentId, data),
        bulkDelete: (request: NextRequest, documentId: string[]) => this.deleteDocuments<T>(request, endpoint, documentId),
    });

    // methods

    static auth = {
        register: async (request: NextRequest, response: Response, data: UserRegisterPostData) => {
            return new Promise<User>(async (resolve, reject) => {
                try {
                    const validEmail = await this.validateEmail(data.email, reject, true);
                    const validPassword = this.validatePassword(data.password, reject);
                    const validName = this.validateName(data.name, data.surname, reject);
                    if (!validEmail || !validPassword || !validName) return;
                    const username = randomString();
                    return api.post<UserLoginRegisterResponse, AxiosResponse<UserLoginRegisterResponse>>('/auth/local/register', {
                        username: username.trim(),
                        email: data.email.trim(),
                        password: data.password
                    }).then(async (res) => {
                        if (this.verbose) console.log('registering as', res.data);
                        this.setToken(response, res.data.jwt);

                        const user = await this.getSelf({ token: res.data.jwt });
                        const newData = { ...data } as any;
                        delete data.password;
    
                        const newUser = await this.users.update(request, user.documentId, {
                            ...newData,
                            confirmed: true,
                            name: data.name?.trim(),
                            surname: data.surname?.trim(),
                            skills: data.skills?.trim(),
                            subject: data.subject?.trim(),
                        });

                        if (this.verbose) console.log('created a new user:', newUser);
                        resolve(newUser);
                    }).catch(err => reject(err));
                } catch (error) {
                    reject(error);
                }
            });
        },
        login: async (response: Response, email: string, password: string) => {
            return new Promise<User>(async (resolve, reject) => {
                const validEmail = await this.validateEmail(email, reject, true);
                const validPassword = this.validatePassword(password, reject);
                if (!validEmail || !validPassword) return;
                api.post<UserLoginRegisterResponse, AxiosResponse<UserLoginRegisterResponse>, UserLoginPostData>('/auth/local', { identifier: email.trim(), password: password.trim() })
                    .then(async (res) => {
                        if (this.verbose) console.log('logging in as', res.data);
                        this.setToken(response, res.data.jwt);
        
                        const user = await this.getSelf({ token: res.data.jwt });
                        resolve(user);
                    });
            });
        },
        loginAuto: async (request: NextRequest) => {
            const token = this.getToken(request);
            if (!token) return null;
            const user = await this.getSelf({ token: token.value });
            return user;
        },
        logout: async (request: NextRequest) => {
            if (this.verbose) console.log('logging out...');
            const token = this.getToken(request);
            if (!token) {
                if (this.verbose) console.error('user is already logged out!');
                return false;
            }
            this.removeToken(request);
            if (this.verbose) console.log('successfully logged out!');
            return true;
        },
        forgotPassword: async (email: string) => {
            return new Promise<void>(async (resolve, reject) => {
                const validEmail = await this.validateEmail(email, reject, true);
                if (!validEmail) return;
                api.post<void, AxiosResponse<void>>('/auth/forgot-password', { email })
                    .then((res) => {
                        if (this.verbose) console.log('password reset link sent to', `${email} if it exists!`);
                        resolve();
                    });
            });
        },
        resetPassword: async (code: string, password: string, passwordConfirmation: string) => {
            return new Promise<void>((resolve, reject) => {
                const validPasswords = this.validatePasswords(password, passwordConfirmation, reject);
                if (!validPasswords) return;
                
                api.post<void, AxiosResponse<void>>('/auth/reset-password', { code, password, passwordConfirmation })
                    .then((res) => {
                        if (this.verbose) console.log('password has been reset!');
                        resolve();
                    });
            });
        },
        changePassword: async (request: NextRequest, currentPassword: string, password: string, passwordConfirmation: string) => {
            return new Promise<void>(async (resolve, reject) => {
                const validPasswords = this.validatePasswords(password, passwordConfirmation, reject);
                if (!validPasswords) return;
                const token = this.getToken(request);
                if (!token) {
                    if (this.verbose) console.log('cannot change password due to invalid session.');
                    reject(new Error('Cannot change password due to invalid session.'));
                    return;
                }
                await api.post<void, AxiosResponse<void>>('/auth/change-password', { currentPassword, password, passwordConfirmation }, this.getAuthHeader({ request }))
                    .then((res) => {
                        if (this.verbose) console.log('password has been changed!');
                        resolve();
                        return;
                    }).catch(err => reject(err));
            });
        },
    }

    static users = {
        get: (documentId: string) => (this.getDocument<User>('/users', documentId) as unknown) as Promise<User>,
        getAll: () => this.getUsersAll(),
        find: (query: string) => (this.findDocuments<User[]>('/users', query) as unknown) as Promise<User[]>,
    
        getMentors: () => this.getUsersAll('Mentor'),
        getMentees: () => this.getUsersAll('Mentee'),
    
        update: (request: NextRequest, documentId: string, data: Partial<UserPostData>) =>
            (this.updateDocument<User, UserPostData>(request, '/users', documentId, data) as unknown) as Promise<User>,
        bulkUpdate: (request: NextRequest, documentId: string[], data: Partial<UserPostData>[]) =>
            (this.updateDocuments<User, UserPostData>(request, '/users', documentId, data) as unknown) as Promise<User[]>,
        bulkDelete: (request: NextRequest, documentId: string[]) =>
            (this.deleteDocuments<User>(request, '/users', documentId) as unknown) as Promise<User[]>,
    };

    static chats = this.wrapper<Chat, ChatPostData>('/chats');
    static chatMessages = this.wrapper<ChatMessage, ChatMessagePostData>('/chat-messages');
    static bookings = this.wrapper<Booking, BookingPostData>('/bookings');
}