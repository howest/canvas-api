const apiCourse = (function apiCourse()
{
    let statusTasks = ['offer', 'claim', 'conclude'];

    /**
     * Get the information of a course
     * @param courseID
     * @returns {*}
     */
    function getCourse(courseID)
    {
        return api.get('courses/' + courseID);
    }

    /**
     * List users in a course
     * @param courseID
     * @returns Promise
     */
    function getCourseUsers(courseID)
    {
        return api.get('courses/' + courseID + '/users' + '?per_page=50');
    }

    /**
     * Update the status of a course
     * @param courseID
     * @param task
     * @returns Promise | bool
     */
    function updateCourseStatus(courseID, task)
    {
        if (statusTasks.indexOf(task) >= 0) {
            if (courseID) {
                let data = {'course[event]': task};
                return updateCourse(courseID, data)
            }
        }

        return false;
    }

    /**
     * Set the end date of a course
     * @param courseID
     * @param date string 2021-01-31T01:00Z
     * @param ended bool
     * @returns Promise
     */
    function setCourseEnd(courseID, date, ended)
    {
        let data = new FormData();
        data.append("course[end_at]", date);
        data.append("course[restrict_enrollments_to_course_dates]", ended);

        return updateCourse(courseID, data);
    }

    /**
     * Update the settings of a course
     * @param courseID
     * @param data
     * @returns Promise
     */
    function updateCourse(courseID, data)
    {
        return api.put('courses/' + courseID, data);
    }

    return {
        getCourse: getCourse,
        getCourseUsers: getCourseUsers,
        updateCourseStatus: updateCourseStatus,
        updateCourse: updateCourse,
        setCourseEnd: setCourseEnd
    };

})();


