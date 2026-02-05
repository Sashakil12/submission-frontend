import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  TrendingUp,
  Plus,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getMyPostedJobs } from '../services/job.service';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { CardSkeleton } from '../components/common/Skeleton';

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const fetchPostedJobs = async () => {
    try {
      const { jobs: postedJobs } = await getMyPostedJobs();
      setJobs(postedJobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Active Jobs', value: jobs.filter(j => j.status === 'active').length, icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Applications', value: jobs.reduce((acc, j) => acc + (j.applicationsCount || 0), 0), icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'AI Matches', value: jobs.length * 3, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Posted Jobs</h2>
          <Link to="/jobs/create">
            <Button>
              <Plus size={18} className="mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : jobs.length === 0 ? (
          <Card className="text-center py-12">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
            <p className="text-gray-500 mb-6">Start by posting your first AI/ML job opening</p>
            <Link to="/jobs/create">
              <Button>
                <Plus size={18} className="mr-2" />
                Post a Job
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.companyName}</p>
                    </div>
                    <Badge variant={job.status === 'active' ? 'success' : 'default'}>
                      {job.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.techStack?.slice(0, 3).map((tech, j) => (
                      <Badge key={j} variant="primary">{tech}</Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {job.applicationsCount || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <Link to={`/jobs/${job._id}/applications`}>
                      <Button variant="ghost" size="sm">
                        View
                        <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
