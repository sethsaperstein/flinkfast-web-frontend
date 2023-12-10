export interface Job {
    name: string,
    version: number,
    createdUTCISO: string,
    state: string,
    targetState: string
}

export interface DeleteJobData {
    name: string
    version: number
}

export interface Jobs {
    jobs: Job[]
}