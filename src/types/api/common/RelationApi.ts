type RelationManyShortHand = string[];
interface RelationManyLongHand {
    id: string | number;
    position?: {
        before?: string | number;
        after?: string | number;
        start?: boolean;
        end?: boolean;
    }
}

export type RelationSingle = string | number | undefined;
export interface RelationMany {
    connect: RelationManyShortHand | RelationManyLongHand[];
    disconnect: RelationManyShortHand | RelationManyLongHand[];
    set: RelationManyShortHand | RelationManyLongHand[];
}