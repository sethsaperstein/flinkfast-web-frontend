export interface Session {
    id: string,
    status: "RUNNING" | "PENDING",
}

export interface SqlData {
    sql: string,
}
