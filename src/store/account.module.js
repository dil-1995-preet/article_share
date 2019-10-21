import {
    userService
} from '../services';
import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? {
    status: {
        loggedIn: true
    },
    user
} : {
    status: {},
    user: null
};

const actions = {
    login({
        dispatch,
        commit
    }, {
        email,
        password
    }) {
        commit('loginRequest', {
            email
        });

        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    logout({
        commit
    }) {
        userService.logout();
        commit('logout');
    },
    register({
        dispatch,
        commit
    }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    addArticle({
        dispatch,
        commit
    }, article) {
        commit('addArticleRequest', article);
        userService.addArticle(article)
            .then(
                article => {
                    commit('registerSuccess', article);
                    router.push('/allarticles');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    editArticle({
        dispatch,
        commit
    }, params) {
        commit('editArticleRequest', params);
        userService.editArticle(params.article, params.slug)
            .then(
                params => {
                    commit('registerSuccess', params);
                    router.push('/allarticles');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    deleteArticle({
        dispatch,
        commit
    }, slug) {
        commit('deleteArticleRequest', slug);
        userService.deleteArticle(slug)
            .then(
                slug => {
                    commit('registerSuccess', slug);
                    router.push('/allarticles');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    addComment({
        dispatch,
        commit
    }, params) {
        commit('addCommentRequest', params);
        userService.addComment(params.comment, params.slug)
            .then(
                params => {
                    commit('registerSuccess', params);
                    router.push('/allarticles');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    deleteComment({
        dispatch,
        commit
    }, params) {
        commit('deleteCommentRequest', params);
        userService.deleteComment(params.slug, params.commentid)
            .then(
                params => {
                    commit('registerSuccess', params);
                    router.push('/allarticles');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    addToFavorateArticles({
        dispatch,
        commit
    }, params) {
        commit('addToFavorateArticlesRequest', params);
        userService.addToFavorateArticles(params)
            .then(
                params => {
                    commit('registerSuccess', params);
                    router.push('/myfavorticles');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
    deleteFromFavorateArticles({
        dispatch,
        commit
    }, params) {
        commit('deleteFromFavorateArticlesRequest', params);
        userService.deleteFromFavorateArticles(params)
            .then(
                params => {
                    commit('registerSuccess', params);
                    // router.push('/allarticles');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {
                            root: true
                        });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {
                        root: true
                    });
                }
            );
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = {
            loggingIn: true
        };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = {
            loggedIn: true
        };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = {
            registering: true
        };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};