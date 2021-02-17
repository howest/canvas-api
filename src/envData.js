const lmsENV = (function lmsENV()
{
    function getCurrentCourse()
    {
        return ENV['context_asset_string'].split('course_').pop();
    }

    function getCurrentUser()
    {
        return ENV['current_user_id'];
    }

    function getCourseContext()
    {
        return ENV['course'];
    }

    function getCurrentRoles()
    {
        return ENV['current_user_roles'];
    }

    function getGroupCategories()
    {
        return ENV['group_categories'];
    }

    function getLang()
    {
        return ENV['LOCALE'];
    }

    function hasRole(r)
    {
        let result = false;
        let roles = getCurrentRoles();
        roles.forEach(function(role) {
            if (role == r) {
                result = true;
            }
        });

        return result;
    }

    function isTeacher()
    {
        return hasRole('teacher');
    }

    function isAdmin()
    {
        return hasRole('admin');
    }

    return {
        getCurrentCourse: getCurrentCourse,
        getCurrentUser: getCurrentUser,
        getCourseContext: getCourseContext,
        getGroupCategories: getGroupCategories,
        getLang: getLang,
        isTeacher: isTeacher,
        isAdmin: isAdmin
    };
})();

