import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Clock, Building2, CheckCircle, Clock4, AlertCircle } from 'lucide-react';
import { getMyApplications } from '../services/application.service';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { CardSkeleton } from '../components/common/Skeleton';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { applications } = await getMyApplications();
      setApplications(applications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setError('Failed to load your applications. Please try again.');
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reviewed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
      default:
        return <Clock4 size={16} className="text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'reviewed':
        return <Badge variant="primary">Reviewed</Badge>;
      case 'pending':
      default:
        return <Badge variant="default">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track your job applications</p>
        </motion.div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <div className="flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
          ) : applications.length === 0 ? (
            <Card className="text-center py-12">
              <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
              <p className="text-gray-500">You haven't applied to any jobs yet. Browse jobs to start applying!</p>
            </Card>
          ) : (
            applications.map((application, i) => (
              <motion.div
                key={application._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card hover>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.jobId?.title || 'Job Title Unavailable'}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <Building2 size={16} />
                        <span>{application.jobId?.companyName || 'Company Unavailable'}</span>
                      </div>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {application.talentSkills?.slice(0, 4).map((skill, j) => (
                      <Badge key={j} variant="default">{skill}</Badge>
                    ))}
                    {application.talentSkills?.length > 4 && (
                      <Badge variant="default">+{application.talentSkills.length - 4}</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Applied on: {formatDate(application.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(application.status)}
                      Status: {application.status || 'pending'}
                    </span>
                    {application.jobId?.deadline && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Deadline: {formatDate(application.jobId.deadline)}
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
