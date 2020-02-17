const api = (function api()
{
    function get(url)
    {
        return recFetch(getBaseUrl() + url, getRequestOpts('GET'));
    }

    function post(url, data)
    {
        return recFetch(getBaseUrl() + url, getRequestOpts('POST', data));
    }

    function put(url, data)
    {
        return recFetch(getBaseUrl() + url, getRequestOpts('PUT', data));
    }

    function getBaseUrl()
    {
        return window.location['origin'] + '/api/v1/';
    }

    /**
     * Set the options of a request
     * @param method
     * @param data
     * @returns {{method: string, headers: Headers, credentials: string}}
     */
    function getRequestOpts(method, data = null)
    {
        let headers = new Headers();
        headers.append('Accept',  'application/json');
        headers.append('X-CSRF-Token', getCsrfToken());

        let opts = {
            method: method,
            headers: headers,
            credentials: 'same-origin'
        };

        if (data != null) {
            opts.body = data;
        }

        return opts;
    }

    /**
     * Fetch a resource and handle paging recursively
     * @param url
     * @param opts
     * @param result
     * @returns {Promise}
     */
    function recFetch(url, opts, result = [])
    {
        return new Promise(function(resolve, reject) {
            fetch(url, opts).then(function(response) {
                getResponse(response).then(function(res) {
                    result = result.concat(res);
                    let nextPage = getNextPage(response);
                    if (nextPage && nextPage != null) {
                        recFetch(nextPage, opts, result).then(resolve).catch(reject);
                    } else {
                        resolve(result);
                    }
                }).catch(function(error) {
                    reject(error);
                });
            }).catch(function(error) {
                reject(error);
            });
        });
    }

    /**
     * Get the link to the next page
     * @param rawResponse
     * @returns {number|boolean}
     */
    function getNextPage(rawResponse)
    {
        let linksInfo = rawResponse.headers.get('Link');
        if (linksInfo) {
            let links = linksInfo.split(/,/);
            let nextPage = null;
            links.forEach(function(link) {
                if (link) {
                    let next = link.split(/<(.*?)>; rel="next"$/);
                    if (next.length > 1) {
                        nextPage = next[1];
                    }
                }
            });

            if (nextPage) {
                return nextPage;
            }
        }

        return false;
    }

    /**
     * Parse the response
     * @param rawResponse
     * @returns {Object}
     */
    function getResponse(rawResponse)
    {
        return rawResponse.text()
            .then(function(rawText) {
                let text = rawText.replace('while(1);', '');
                return JSON.parse(text);
            });
    }

    /**
     * Get the csrf token from the document cookies
     * @returns {string}
     */
    function getCsrfToken() {
        let csrf = '';
        let csrfRegex = new RegExp('^_csrf_token=(.*)$');
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            let match = csrfRegex.exec(cookie);
            if (match) {
                csrf = decodeURIComponent(match[1]);
                break;
            }
        }

        return csrf;
    }

    return {
        get: get,
        post: post,
        put: put
    }
})();
