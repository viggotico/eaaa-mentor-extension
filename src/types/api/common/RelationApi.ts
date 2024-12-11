type RelationManyShortHand = string[];
interface RelationManyLongHand {
    documentId: string;
    position?: {
        before?: string;
        after?: string;
        start?: boolean;
        end?: boolean;
    }
}

export type RelationSingle = string | undefined;
export interface RelationMany {
    connect: RelationManyShortHand | RelationManyLongHand[];
    disconnect: RelationManyShortHand | RelationManyLongHand[];
    set: RelationManyShortHand | RelationManyLongHand[];
}