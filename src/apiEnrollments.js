const apiEnrollments = (function apiEnrollments()
{
    /**
     * Create a new enrollment
     * @param courseID
     * @param userID
     * @param role
     * @param status
     * @returns {Promise}
     */
    function createEnrollment(courseID, userID, role, status)
    {
        let formData = new FormData();
        formData.append("enrollment[user_id]", userID);
        formData.append("enrollment[type]", role);
        formData.append("enrollment[enrollment_state]", status);

        return api.post('courses/' + courseID + '/enrollments', formData);
    }

    return {
        createEnrollment: createEnrollment
    }
})();