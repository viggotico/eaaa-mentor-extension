export interface CommonApi {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}

export interface CommonApiComponent {
    id: number;
}

export type CommonApiIgnore =
| 'id'
| 'documentId'
| 'createdAt'
| 'updatedAt'
| 'publishedAt';