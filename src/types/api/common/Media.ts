import { CommonApi } from "./CommonApi";

type ProviderMetadata = {
    [key: string]: any;
}

interface MediaFormat {
    ext: `.${string}`;
    url: string;
    hash: string;
    mime: `${string}/${string}`;
    name: string;
    path?: string;
    size: number;
    width: number;
    height: number;
    sizeInBytes: number;
    provider_metadata?: ProviderMetadata
}

interface MediaFormats {
    thumbnail: MediaFormat;
}

export interface Media extends CommonApi {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats: MediaFormats;
    hash: MediaFormat['hash'];
    ext: MediaFormat['ext'];
    mime: MediaFormat['mime'];
    size: MediaFormat['size'];
    url: MediaFormat['url'];
    previewUrl?: string;
    provider: string;
    provider_metadata: ProviderMetadata
}