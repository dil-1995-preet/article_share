// import config from 'config';
import {
    authHeader
} from '../helpers';

export const userService = {
    login,
    register,
    addArticle,
    deleteArticle,
    editArticle,
    addComment,
    deleteComment,
    deleteFromFavorateArticles,
    addToFavorateArticles
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                email: email,
                password: password
            }
        })
    };

    return fetch(`https://conduit.productionready.io/api/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    return fetch(`https://conduit.productionready.io/api/users`, requestOptions).then(handleResponse);
}

function addArticle(article) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
        body: JSON.stringify(article)
    };

    return fetch(`https://conduit.productionready.io/api/articles`, requestOptions).then(handleResponse);
}

function addComment(comment, slug) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
        body: JSON.stringify(comment)
    };

    return fetch(`https://conduit.productionready.io/api/articles/` + slug + "/comments", requestOptions).then(handleResponse);
}

function editArticle(article, slug) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
        body: JSON.stringify(article)
    };

    return fetch(`https://conduit.productionready.io/api/articles/` + slug, requestOptions).then(handleResponse);
}

function deleteArticle(slug) {
    const requestOptions = {
        method: 'Delete',
        headers: {
            'Authorization': authHeader()
        }
    };

    return fetch(`https://conduit.productionready.io/api/articles/` + slug, requestOptions).then(handleResponse);
}

function deleteComment(slug, commentid) {
    const requestOptions = {
        method: 'Delete',
        headers: {
            'Authorization': authHeader()
        }
    };

    return fetch(`https://conduit.productionready.io/api/articles/` + slug + "/comments/" + commentid, requestOptions).then(handleResponse);
}

function addToFavorateArticles(slug) {
    const requestOptions = {
        method: 'Post',
        headers: {
            'Authorization': authHeader()
        }
    };

    return fetch(`https://conduit.productionready.io/api/articles/` + slug + "/favorite", requestOptions).then(handleResponse);
}

function deleteFromFavorateArticles(slug) {
    const requestOptions = {
        method: 'Delete',
        headers: {
            'Authorization': authHeader()
        }
    };

    return fetch(`https://conduit.productionready.io/api/articles/` + slug + "/favorite", requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}