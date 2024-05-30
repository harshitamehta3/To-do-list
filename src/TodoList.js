// src/TodoList.js
import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, { text: taskInput, completed: false, id: Date.now() }]);
            setTaskInput('');
        }
    };

    const handleRemoveTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleToggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'asc') return a.text.localeCompare(b.text);
        return b.text.localeCompare(a.text);
    });

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <div className="input-section">
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Enter a new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="controls">
                <label>
                    Filter:
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </label>
                <label>
                    Sort:
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <ul>
                {sortedTasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <span onClick={() => handleToggleTaskCompletion(task.id)}>
                            {task.text}
                        </span>
                        <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;

