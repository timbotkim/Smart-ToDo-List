import React, { useState } from 'react';

const TaskFilterSort = ({ setFilter, setSort }) => {
    const [filter, setFilterState] = useState({ category: '', priority: '', status: '' });
    const [sort, setSortState] = useState('');

    const handleFilterChange = (e) => {
        setFilterState({ ...filter, [e.target.name]: e.target.value });
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleSortChange = (e) => {
        setSortState(e.target.value);
        setSort(e.target.value);
    };

    return (
        <div>
            <select name="category" value={filter.category} onChange={handleFilterChange}>
                <option value="">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
            </select>
            <select name="priority" value={filter.priority} onChange={handleFilterChange}>
                <option value="">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select name="status" value={filter.status} onChange={handleFilterChange}>
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Incomplete">Incomplete</option>
            </select>
            <select value={sort} onChange={handleSortChange}>
                <option value="">Sort By</option>
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
};

export default TaskFilterSort;
