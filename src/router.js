import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {

	if (!store.state.user.isAuthenticated) {
		next();
		return true;
	}

	next('/');
}

const ifAuthenticated = (to, from, next) => {

	if (store.state.user.isAuthenticated) {
		next();
		return true;
	}

	router.push({ path: '/login', query: { redirect: to.path } });
}

let router = new Router({
	mode: 'history',
	hash: false,
	routes: [
		{
			path: '/',
			name: 'AnimalsPage',
			component: () => import('./components/pages/AnimalsPage')
		},
		{
			path: '/login',
			name: 'LoginPage',
			component: () => import('./components/pages/LoginPage'),
			beforeEnter: ifNotAuthenticated
		},
		{
			path: '/admin',
			name: 'AdminPage',
			component: () => import('./components/pages/AdminPage'),
			beforeEnter: ifAuthenticated
		},
		{
			path: '/nyttdyr',
			name: 'SubmitAnimalPage',
			component: () => import('./components/pages/SubmitAnimalPage'),
			beforeEnter: ifAuthenticated
		},
		{
			path: '/endrepassord',
			name: 'ChangePasswordPage',
			component: () => import('./components/pages/ChangePasswordPage'),
			beforeEnter: ifAuthenticated
		},
		{
			path: '/stem',
			name: 'AdminVotePage',
			component: () => import('./components/pages/AdminVotePage'),
			beforeEnter: ifAuthenticated
		}
	]
});

export default router;	