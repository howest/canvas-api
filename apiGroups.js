const apiGroups = (function apiGroups()
{
    /**
     * List the groups of a course
     * @param courseID
     * @returns {Promise}
     */
    function getGroups(courseID)
    {
        return api.get('courses/' + courseID + '/groups' + '?per_page=50');
    }

    /**
     * Update the members of a group
     * @param groupID
     * @param userIDs
     * @returns {Promise}
     */
    function editGroupMembers(groupID, userIDs)
    {
        let formData = new FormData();
        if (userIDs && userIDs.length > 0) {
            userIDs.forEach(function(userID) {
                formData.append("members[]", userID);
            });

            return api.put('groups/' + groupID, formData);
        }

        return false;
    }

    /**
     * Add a user to a group
     * @param groupID
     * @param userID
     * @returns {Promise}
     */
    function addGroupMember(groupID, userID)
    {
        let data = new URLSearchParams('user_id=' + userID);
        return api.post('groups/' + groupID + '/memberships', data);
    }

    return {
        getGroups: getGroups,
        editGroupMembers: editGroupMembers,
        addGroupMember: addGroupMember
    };
})();
