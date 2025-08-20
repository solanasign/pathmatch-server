"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobSeekerApplications = exports.updateJobSeekerProfile = exports.getJobSeekerProfile = void 0;
const getJobSeekerProfile = async (req, res) => {
    try {
        const jobSeekerId = req.user?.id;
        if (!jobSeekerId) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Return mock profile data
        const profile = {
            id: jobSeekerId,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1234567890',
            location: 'New York, NY',
            skills: ['React', 'Node.js', 'TypeScript'],
            experience: '5 years',
            education: 'Bachelor\'s in Computer Science',
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
exports.getJobSeekerProfile = getJobSeekerProfile;
const updateJobSeekerProfile = async (req, res) => {
    try {
        const jobSeekerId = req.user?.id;
        const updateData = req.body;
        if (!jobSeekerId) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Return mock updated profile data
        const updatedProfile = {
            id: jobSeekerId,
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
exports.updateJobSeekerProfile = updateJobSeekerProfile;
const getJobSeekerApplications = async (req, res) => {
    try {
        const { id } = req.params;
        // Verify user owns this profile
        if (req.user?.id !== id) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Return mock applications data
        const applications = [
            {
                id: '1',
                job_seeker_id: id,
                job_id: 'job-1',
                cover_letter: 'I am excited to apply for this position...',
                status: 'submitted',
                created_at: new Date().toISOString(),
                jobs: {
                    title: 'Senior Software Engineer',
                    company: 'TechCorp Solutions',
                    location: 'Remote'
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
exports.getJobSeekerApplications = getJobSeekerApplications;
