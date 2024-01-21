export interface PendingMembers {
    members: [Member];
}

export interface Member {
    id: string;
    email: string;
    name?: string;
}
export interface Members {
    members: [Member]
}