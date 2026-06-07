type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
};

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
}