export interface GetDataFromDatabaseInterface {
    attributes?: string[];
    order?: [[string, string]]
    where?: {
        email?: string;
        deleted?: number;
        userId?: string;
        id?: string;
        inquiryId?: string;
    },
    limit?: number;
    offset?: number;
}

export interface WhereUpdateDataFromDatabaseInterface {
    where: {
        id?: string;
        deleted?: number;
    }
}