'use client'

export const randomString = () => (Math.random() + 1).toString(36).substring(2);
export const getHomeUrl = () => process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_FRONTEND_URL_LOCAL : process.env.NEXT_PUBLIC_FRONTEND_URL;