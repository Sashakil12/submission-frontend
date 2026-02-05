import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  Filter,
  Sparkles,
} from 'lucide-react';
import { getJobs } from '../services/job.service';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Skeleton, CardSkeleton } from '../components/common/Skeleton';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { jobs } = await getJobs({ search });
      setJobs(jobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find AI/ML Jobs</h1>
          <p className="text-gray-600">Discover opportunities that match your skills</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs by title or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
            />
          </div>
          <Button variant="secondary" className="md:w-auto">
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
            ) : jobs.length === 0 ? (
              <Card className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No jobs found</p>
              </Card>
            ) : (
              jobs.map((job, i) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    hover
                    onClick={() => setSelectedJob(job)}
                    className={selectedJob?._id === job._id ? 'ring-2 ring-primary-500' : ''}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600">{job.companyName}</p>
                      </div>
                      <Badge variant="primary">Active</Badge>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      {job.techStack?.slice(0, 4).map((tech, j) => (
                        <Badge key={j} variant="default">{tech}</Badge>
                      ))}
                      {job.techStack?.length > 4 && (
                        <Badge variant="default">+{job.techStack.length - 4}</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Deadline: {formatDate(job.deadline)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.applicationsCount || 0} applications
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedJob ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                    <p className="text-gray-600">{selectedJob.companyName}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Deadline</p>
                        <p className="text-sm">{formatDate(selectedJob.deadline)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">Remote / Hybrid</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.techStack?.map((tech, i) => (
                        <Badge key={i} variant="primary">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  <Button className="w-full" size="lg">
                    <Sparkles size={18} className="mr-2" />
                    Apply Now
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <Card className="text-center py-12">
                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Select a job to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
