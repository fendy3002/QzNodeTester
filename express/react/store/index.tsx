import auth from './auth';
export default () => {
    return {
        authStore: new auth(),
    };
}