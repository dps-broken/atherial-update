// assets/js/careers.js (Updated & Corrected Code)

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('application-modal');
    const modalTitle = document.getElementById('modal-job-title');
    const applicationForm = document.getElementById('application-form');
    const positionSelect = document.getElementById('positionTitle');
    const submitBtn = document.getElementById('submit-btn');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const applyBtns = document.querySelectorAll('.apply-btn');

    const API_BASE_URL = 'https://lms-kcpr.onrender.com';

    const fetchAndPopulatePositions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/public/positions`);
            if (!response.ok) {
                throw new Error('Could not load internship positions.');
            }
            const positions = await response.json();
            
            positionSelect.innerHTML = '<option value="">Select Position...</option>'; 

            positions.forEach(pos => {
                const option = document.createElement('option');
                option.value = pos.title;
                option.textContent = pos.title;
                positionSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching positions:', error);
        }
    };

    // --- Functionality 2: Modal Control ---
    const openModal = (jobTitle) => {
        modalTitle.textContent = `Apply for ${jobTitle}`;
        
        const optionExists = [...positionSelect.options].some(option => option.value === jobTitle);

        if (jobTitle === 'Internship Program' || !optionExists) {
            positionSelect.value = '';
        } else {
            positionSelect.value = jobTitle;
        }

        // CHANGED: Use classList to add 'active' class, matching the CSS
        modal.classList.add('active');
    };

    const closeModal = () => {
        // CHANGED: Use classList to remove 'active' class, matching the CSS
        modal.classList.remove('active');
        applicationForm.reset(); 
    };

    applyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const jobTitle = btn.getAttribute('data-job-title');
            openModal(jobTitle);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close modal if the outer overlay (not the content) is clicked
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Functionality 3: Handle Form Submission ---
    applicationForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            mobileNumber: document.getElementById('mobileNumber').value,
            positionTitle: document.getElementById('positionTitle').value,
            collegeName: document.getElementById('collegeName').value,
            skills: document.getElementById('skills').value,
            address: document.getElementById('address').value,
            resumeUrl: document.getElementById('resumeUrl').value,
            coverLetter: document.getElementById('coverLetter').value,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/public/internship/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Application submission failed.');
            }

            alert('Application Submitted Successfully! We will get back to you soon.');
            closeModal();

        } catch (error) {
            alert(`An error occurred: ${error.message}`);
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    fetchAndPopulatePositions();
});