import React, { createContext, useReducer, ReactNode } from 'react';
import { TaskAction, TaskState } from '../types/interface';


interface TaskContextType {
    state: TaskState;
    dispatch: React.Dispatch<TaskAction>;
}

const defaultValue: TaskContextType = {
    state: {
        tasks: [],
        isOpen: false,
        isOpenEdit: false,
        editTaskId: 0,
    },

    dispatch: () => { }
};

export const TaskContext = createContext<TaskContextType>(defaultValue);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            title: action.payload.title !== undefined ? action.payload.title : task.title,
                            subTitle: action.payload.subTitle !== undefined ? action.payload.subTitle : task.subTitle,
                            date: action.payload.date !== undefined ? action.payload.date : task.date
                        };
                    }
                    return task;
                })
            };
        case 'TOGGLE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
        case 'SET_IS_OPEN':
            return {
                ...state,
                isOpen: action.payload,
            };
        case 'SET_IS_OPEN_EDIT':
            return {
                ...state,
                isOpenEdit: action.payload.isOpenEdit,
                editTaskId: action.payload.editTaskId,
            };
        default:
            return state;
    }
};

interface TaskProviderProps {
    children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
    const [state, dispatch] = useReducer(taskReducer, defaultValue.state);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};
