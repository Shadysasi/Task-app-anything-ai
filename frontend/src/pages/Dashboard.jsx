import { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Plus, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userInfo));
    fetchTasks();
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks',err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const { data } = await API.post('/tasks', { title: newTask });
      setTasks([data, ...tasks]); 
      setNewTask('');
    } catch (err) {
      alert('Error adding task',err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Deletion failed";
      alert(`Error: ${errorMsg}`);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Project Workspace</h1>
          <p className="text-gray-500 mb-6 text-sm">
            Logged in as: <span className="font-semibold text-indigo-600 capitalize">{user.role}</span>
          </p>
          
          <form onSubmit={addTask} className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What's the next step?"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md active:scale-95"
            >
              <Plus className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading your workspace...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <CheckCircle className="h-12 w-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No tasks found. Start by creating one!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task._id} 
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-xs text-gray-400">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {user.role === 'admin' ? (
                  <button 
                    onClick={() => handleDeleteTask(task._id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete Task"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                ) : (
                  <div className="p-2 text-gray-300 cursor-not-allowed" title="Admin only">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;