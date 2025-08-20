"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitOnboarding = exports.updateApplicationStatus = exports.submitApplication = exports.submitPublicApplication = void 0;
const email_service_1 = require("../services/email.service");
const submitPublicApplication = async (req, res) => {
    try {
        const { job_title, applicant_name, applicant_email, cover_letter, phone } = req.body;
        const resumeFile = req.file;
        // Validate required fields
        if (!applicant_name || !applicant_email || !job_title) {
            res.status(400).json({ message: 'Name, email, and job title are required' });
            return;
        }
        // Create application data object
        const applicationData = {
            job_title,
            applicant_name,
            applicant_email,
            cover_letter: cover_letter || '',
            phone: phone || '',
            resume_uploaded: !!resumeFile,
            resume_filename: resumeFile?.originalname || '',
            submitted_at: new Date().toISOString(),
            status: 'submitted'
        };
        console.log('Public application received:', applicationData);
        // Send auto-responder email to applicant
        try {
            await (0, email_service_1.sendAutoResponderEmail)(applicant_email, applicant_name, job_title);
        }
        catch (emailError) {
            console.error('Failed to send auto-responder email:', emailError);
            // Don't fail the application submission if email fails
        }
        // Send notification email to PATHMATCH team
        try {
            await (0, email_service_1.sendNotificationEmail)(applicant_name, applicant_email, job_title, cover_letter, resumeFile);
        }
        catch (emailError) {
            console.error('Failed to send notification email:', emailError);
            // Don't fail the application submission if email fails
        }
        res.status(201).json({
            message: 'Application submitted successfully. Check your email for confirmation.',
            application: applicationData
        });
    }
    catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({ message: 'Application submission failed. Please try again.' });
    }
};
exports.submitPublicApplication = submitPublicApplication;
const submitApplication = async (req, res) => {
    try {
        const { job_id, cover_letter, applicant_name, applicant_email, job_title } = req.body;
        const jobSeekerId = req.user?.id;
        if (!jobSeekerId) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }
        // Create application data
        const applicationData = {
            id: Date.now().toString(),
            job_id,
            job_seeker_id: jobSeekerId,
            cover_letter: cover_letter || '',
            applicant_name,
            applicant_email,
            job_title,
            submitted_at: new Date().toISOString(),
            status: 'submitted'
        };
        // Send auto-responder email to applicant
        try {
            await (0, email_service_1.sendAutoResponderEmail)(applicant_email, applicant_name, job_title);
        }
        catch (emailError) {
            console.error('Failed to send auto-responder email:', emailError);
            // Don't fail the application submission if email fails
        }
        // Send notification email to PATHMATCH team
        try {
            await (0, email_service_1.sendNotificationEmail)(applicant_name, applicant_email, job_title, cover_letter);
        }
        catch (emailError) {
            console.error('Failed to send notification email:', emailError);
            // Don't fail the application submission if email fails
        }
        res.status(201).json({
            ...applicationData,
            message: 'Application submitted successfully. Check your email for confirmation.'
        });
    }
    catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({ message: 'Application submission failed. Please try again.' });
    }
};
exports.submitApplication = submitApplication;
const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // For now, just return a success response
        // In a real implementation, you'd update the application in a database
        const updatedApplication = {
            id,
            status,
            updated_at: new Date().toISOString()
        };
        res.json({
            message: 'Application status updated successfully',
            application: updatedApplication
        });
    }
    catch (error) {
        console.error('Application status update error:', error);
        res.status(500).json({ message: 'Failed to update application status' });
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
// Onboarding submission (no auth required for now)
const submitOnboarding = async (req, res) => {
    try {
        const { email, firstName, middle, lastName, suffix, preferred, dob, state } = req.body || {};
        if (!email || !dob || !state) {
            res.status(400).json({ message: 'Email, date of birth and state are required' });
            return;
        }
        try {
            await (0, email_service_1.sendOnboardingEmail)({ email, firstName, middle, lastName, suffix, preferred, dob, state });
        }
        catch (err) {
            console.error('Failed to send onboarding email:', err);
        }
        res.status(201).json({ message: 'Onboarding submitted successfully' });
    }
    catch (error) {
        console.error('Onboarding submission error:', error);
        res.status(500).json({ message: 'Onboarding submission failed' });
    }
};
exports.submitOnboarding = submitOnboarding;
