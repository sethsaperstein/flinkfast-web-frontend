export interface Invite {
    email: string
}

export interface Invites {
    emails: [string];
}

export interface Member {
    email: string;
    name?: string;
}
export interface Members {
    members: [Member]
}