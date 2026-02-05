import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { createJob } from '../services/job.service';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const techStackOptions = [
  'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras',
  'JavaScript', 'React', 'Node.js', 'TypeScript', 'SQL',
  'AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes',
  'Computer Vision', 'NLP', 'LLM', 'RAG', 'MLOps',
];

const CreateJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    techStack: [],
    deadline: '',
  });

  const handleTechToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createJob(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-600">AI will generate a perfect job description for you</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Job Details', 'Tech Stack', 'Review'].map((label, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step > i + 1 ? 'bg-green-500 text-white' :
                  step === i + 1 ? 'bg-primary-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                {i < 2 && (
                  <div className={`w-full h-1 mx-2 rounded ${
                    step > i + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {['Job Details', 'Tech Stack', 'Review'].map((label, i) => (
              <span key={i} className="text-sm text-gray-500">{label}</span>
            ))}
          </div>
        </div>

        <Card>
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Input
                  label="Job Title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior ML Engineer"
                  required
                  icon={Briefcase}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                    required
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.title || !formData.deadline}
                  >
                    Next: Select Tech Stack
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Required Tech Stack</h3>
                  <p className="text-sm text-gray-500">AI will match talents based on these skills</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {techStackOptions.map((tech, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleTechToggle(tech)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        formData.techStack.includes(tech)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>

                {formData.techStack.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-primary-50 border border-primary-200">
                    <p className="text-sm font-medium text-primary-800 mb-2">
                      <Sparkles size={16} className="inline mr-1" />
                      AI will generate a job description for:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.techStack.map((tech, i) => (
                        <span key={i} className="text-sm text-primary-700">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={formData.techStack.length === 0}
                  >
                    Next: Review
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Review Job Posting</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-sm text-gray-500 mb-1">Job Title</p>
                      <p className="font-medium text-gray-900">{formData.title}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-sm text-gray-500 mb-1">Deadline</p>
                      <p className="font-medium text-gray-900">
                        {new Date(formData.deadline).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50">
                      <p className="text-sm text-gray-500 mb-2">Tech Stack ({formData.techStack.length} skills)</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.techStack.map((tech, i) => (
                          <span key={i} className="px-2 py-1 rounded-lg bg-primary-100 text-primary-700 text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 mb-6">
                  <p className="text-sm text-gray-700">
                    <Sparkles size={16} className="inline mr-2 text-primary-500" />
                    AI will automatically generate a professional job description based on the job title and tech stack you selected.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="secondary" onClick={() => setStep(2)}>
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </Button>
                  <Button type="submit" loading={loading}>
                    <Sparkles size={18} className="mr-2" />
                    Create Job with AI
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateJob;
