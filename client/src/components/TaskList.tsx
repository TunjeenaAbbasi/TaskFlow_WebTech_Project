import { useEffect, useState } from 'react';
import { api } from '../Services/api';
import { toast } from 'react-toastify';
import TaskForm from './TaskForm';

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
};

const priorityColor: Record<string, string> = {
  High: '#ff4d6d',
  Medium: '#f4a942',
  Low: '#00d48a',
};

const statusColor: Record<string, string> = {
  Todo: '#94a3b8',
  'In Progress': '#6366f1',
  Done: '#10b981',
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/', {
        params: {
          activeOnly: hideCompleted,
        },
      });

      setTasks(res.data);
      setFetchError(null);
    } catch {
      setFetchError(
        'Unable to load tasks. The server may be offline.',
      );
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };

    void loadTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideCompleted]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  };

  const deleteSelected = async () => {
    const confirmed = window.confirm(
      `Delete ${selected.length} task(s)?`,
    );

    if (!confirmed) return;

    try {
      await api.delete('/bulk', {
        data: { ids: selected },
      });

      toast.success(`${selected.length} task(s) deleted`);

      setSelected([]);

      await fetchTasks();
    } catch {
      toast.error('Bulk delete failed');
    }
  };

  const deleteTask = async (id: string) => {
    const confirmed = window.confirm(
      'Delete this task?',
    );

    if (!confirmed) return;

    try {
      await api.delete(`/${id}`);

      toast.success('Task deleted');

      await fetchTasks();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '40px auto',
      }}
    >
      {editTask && (
        <TaskForm
          editTask={editTask}
          onCancelEdit={() => setEditTask(null)}
        />
      )}

      {/* Header */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '34px',
              marginBottom: '15px',
            }}
          >
            📋 My Tasks ({tasks.length})
          </h2>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={(e) =>
                setHideCompleted(e.target.checked)
              }
            />

            Hide Completed
          </label>
        </div>

        <button
          onClick={deleteSelected}
          disabled={!selected.length}
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '14px',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Delete Selected ({selected.length})
        </button>
      </div>

      {fetchError ? (
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <h3>Unable to load tasks</h3>

          <p
            style={{
              color: 'var(--text-muted)',
              marginTop: '10px',
            }}
          >
            The server may be offline.
          </p>

          <button
            onClick={() => {
              void fetchTasks();
            }}
            style={{
              marginTop: '20px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
          }}
        >
          {tasks.map((t) => (
            <div
              key={t._id}
              style={{
                background: 'var(--surface)',
                border: selected.includes(t._id)
                  ? '2px solid var(--accent)'
                  : '1px solid var(--border)',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                gap: '18px',
                alignItems: 'flex-start',
              }}
            >
              <input
                type="checkbox"
                checked={selected.includes(t._id)}
                onChange={() => toggle(t._id)}
              />

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    marginBottom: '10px',
                    fontSize: '24px',
                  }}
                >
                  {t.title}
                </h3>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    marginBottom: '18px',
                  }}
                >
                  {t.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '18px',
                    flexWrap: 'wrap',
                    fontWeight: 700,
                  }}
                >
                  <span
                    style={{
                      color:
                        priorityColor[t.priority],
                    }}
                  >
                    🔥 {t.priority}
                  </span>

                  <span
                    style={{
                      color: statusColor[t.status],
                    }}
                  >
                    📌 {t.status}
                  </span>

                  {t.dueDate && (
                    <span
                      style={{
                        color:
                          'var(--text-muted)',
                      }}
                    >
                      📅 {t.dueDate}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                }}
              >
                <button
                  onClick={() => setEditTask(t)}
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => {
                    void deleteTask(t._id);
                  }}
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 18px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
