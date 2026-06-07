import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Services/api';
import { toast } from 'react-toastify';

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
};

type Props = {
  editTask?: Task | null;
  onCancelEdit?: () => void;
};

export default function TaskForm({ editTask, onCancelEdit }: Props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(editTask?.title || '');
  const [description, setDescription] = useState(editTask?.description || '');
  const [status, setStatus] = useState(editTask?.status || 'Todo');
  const [priority, setPriority] = useState(editTask?.priority || 'Low');
  const [dueDate, setDueDate] = useState(editTask?.dueDate || '');

  const submit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    try {
      if (editTask) {
        await api.put(`/${editTask._id}`, {
          title,
          description,
          status,
          priority,
          dueDate,
        });

        toast.success('Task updated');

        if (onCancelEdit) {
          onCancelEdit();
        }

        window.location.reload();
      } else {
        await api.post('/', {
          title,
          description,
          status,
          priority,
          dueDate,
        });

        toast.success('Task created');

        setTitle('');
        setDescription('');
        setStatus('Todo');
        setPriority('Low');
        setDueDate('');

        navigate('/');
      }
    } catch {
      toast.error(editTask ? 'Error updating task' : 'Error creating task');
    }
  };

  return (
    <div
  style={{
    background: 'white',
    borderRadius: '24px',
    padding: '35px',
    boxShadow: '0 10px 40px rgba(0,0,0,.08)',
    marginBottom: '30px',
  }}
>
      <h2
  style={{
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '30px',
  }}
>
        {editTask ? 'Edit Task' : 'New Task'}
      </h2>

      <form
        style={{
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
}}
        onSubmit={submit}
      >
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={inputStyle}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={inputStyle}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          {editTask ? 'Update Task' : 'Add Task'}
        </button>

        {editTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={cancelStyle}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
const inputStyle = {
  width: '100%',
  padding: '15px',
  border: '1px solid #dbe3ee',
  borderRadius: '14px',
  outline: 'none',
  background: '#f8fafc',
  fontSize: '15px',
};

const buttonStyle = {
  background: '#4f46e5',
  color: 'white',
  border: 'none',
  padding: '15px 22px',
  borderRadius: '14px',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '15px',
};

const cancelStyle = {
  background: '#f1f5f9',
  color: '#475569',
  border: 'none',
  padding: '15px 22px',
  borderRadius: '14px',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '15px',
};