import { getItem, setItem } from '../../storage';

const registerLogoutListener = (cb, namespace, persistKey, history) => {
  const logoutListenerKey = `${namespace}.${persistKey || 'logout-listener-registered'}`;
  const isListenerListening = getItem(logoutListenerKey);

  const resetListenerRegister = () => {
    setItem(logoutListenerKey, null);
  };

  if (!isListenerListening) {
    // The history.listen resets itself after a page refresh, so we need to fire it again by resetting the flag.
    window.addEventListener('beforeunload', resetListenerRegister);

    const unlisten = history.listen(location => {
      const isLogout = location.pathname === '/';

      if (isLogout) {
        cb();
        resetListenerRegister();
        window.removeEventListener('beforeunload', resetListenerRegister);
        unlisten();
      }
    });

    setItem(logoutListenerKey, true);
  }
};

export default registerLogoutListener;
