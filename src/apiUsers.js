const apiUsers = (function apiUsers()
{
    /**
     * Get a list of users with information matching certain term
     * @param accountID
     * @param term
     * @returns {Promise}
     */
    function searchUser(accountID, term)
    {
        return api.get('accounts/' + accountID + '/users?search_term=' + term);
    }

    return {
        searchUser: searchUser
    }
})();
