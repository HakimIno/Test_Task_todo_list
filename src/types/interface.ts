

export interface Task {
    id: number;
    title: string;
    subTitle: string;
    date: string;
    completed?: boolean;
}

export interface TaskState {
    tasks: Task[];
    isOpen: boolean;
    isOpenEdit: boolean,
    editTaskId: number
}

export interface TaskAction {
    type: string;
    payload: any;
}