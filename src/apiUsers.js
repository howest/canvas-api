const apiUsers = (function apiUsers()
{
    /**
     * Get a list of users with information matching certain term
     * @param term
     * @returns {Promise}
     */
    function searchUser(term)
    {
        return api.get('accounts/1/users?search_term=' + term);
    }

    return {
        searchUser: searchUser
    }
})();
