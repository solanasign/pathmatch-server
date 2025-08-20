"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobApplications = exports.getEmployerJobs = exports.updateEmployerProfile = exports.getEmployerProfile = void 0;
const getEmployerProfile = async (req, res) => {
    try {
        const employerId = req.user?.id;
        if (!employerId) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Return mock profile data
        const profile = {
            id: employerId,
            company_name: 'TechCorp Solutions',
            first_name: 'Jane',
            last_name: 'Smith',
            email: 'jane.smith@techcorp.com',
            phone: '+1234567890',
            company_size: '50-100',
            industry: 'Technology',
            location: 'San Francisco, CA',
            created_at: new Date().toISOString()
        };
        res.json({
            message: 'Profile retrieved successfully',
            profile
        });
    }
    catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Failed to retrieve profile' });
    }
};
exports.getEmployerProfile = getEmployerProfile;
const updateEmployerProfile = async (req, res) => {
    try {
        const employerId = req.user?.id;
        const updateData = req.body;
        if (!employerId) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Return mock updated profile data
        const updatedProfile = {
            id: employerId,
            ...updateData,
            updated_at: new Date().toISOString()
        };
        res.json({
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    }
    catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};
exports.updateEmployerProfile = updateEmployerProfile;
const getEmployerJobs = async (req, res) => {
    try {
        const { id } = req.params;
        // Verify user owns this profile
        if (req.user?.id !== id) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Return mock jobs data
        const jobs = [
            {
                id: '1',
                title: 'Senior Software Engineer',
                description: 'We are seeking a talented Senior Software Engineer...',
                requirements: ['React', 'Node.js', 'TypeScript'],
                salary: '$80,000 - $120,000',
                location: 'Remote',
                jobType: 'Full-time',
                employer_id: id,
                created_at: new Date().toISOString(),
                status: 'active'
            }
        ];
        res.json({
            message: 'Jobs retrieved successfully',
            jobs
        });
    }
    catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({ message: 'Failed to retrieve jobs' });
    }
};
exports.getEmployerJobs = getEmployerJobs;
const getJobApplications = async (req, res) => {
    try {
        const { id, jobId } = req.params;
        // Verify user owns this profile
        if (req.user?.id !== id) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Return mock applications data
        const applications = [
            {
                id: '1',
                job_id: jobId,
                job_seeker_id: 'seeker-1',
                cover_letter: 'I am excited to apply for this position...',
                status: 'submitted',
                created_at: new Date().toISOString(),
                job_seekers: {
                    profiles: {
                        first_name: 'John',
                        last_name: 'Doe',
                        avatar_url: null
                    }
                }
            }
        ];
        res.json({
            message: 'Applications retrieved successfully',
            applications
        });
    }
    catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({ message: 'Failed to retrieve applications' });
    }
};
exports.getJobApplications = getJobApplications;
