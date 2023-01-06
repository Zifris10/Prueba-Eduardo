export interface AdminsInterface {
    id: string;
    userId: string;
    deleted: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface InquiryInterface {
    id: string;
    name: string;
    createdBy: string;
    deleted?: number;
    deletedBy?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInterface {
    id: string;
    name: string;
    email: string;
    password: string;
    deleted: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface QuestionsInterface {
    id: string;
    question: string;
    inquiryId: string;
    responses: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface WhereUpdateDataInterface {
    where: {
        id?: string;
        deleted?: number;
    }
}