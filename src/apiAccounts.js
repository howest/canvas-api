const apiAccount = (function apiAccount()
{
    /**
     * @returns Promise
     */
    function getAccounts()
    {
        return api.get('accounts');
    }

    return {
        getAccounts: getAccounts
    };
})();