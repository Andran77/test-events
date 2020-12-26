export interface DayEvents {
    id: number;
    date: string;
    name: string;
    type: 'fiesta' | 'sessions' | 'other';
    budget?: number;
    address?: string;
    note?: string;
    time?: string
}

// export interface Fiesta {
//     id: number;
//     date: string;
//     name: string;
//     type: 'fiesta';
//     budget: number;
// }

// export interface Sessions {
//     id: number;
//     date: string;
//     name: string;
//     type: 'sessions';
//     address: string;
//     time: string
// }

// export interface Other {
//     id: number;
//     date: string;
//     name: string;
//     type: 'sessions';
//     note: string
// }
