
import { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const useCheckUserAuthentication = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { setLoggedUser, setCart, setBalance, findUserByIndex } = userContext;

  const checkAuthentication = useMemo(() => {
    return () => {
      const logged = localStorage.getItem('isAuthenticated');
      if (logged !== null) {
        const dataStoraged = JSON.parse(logged);
        const user = findUserByIndex(Number(dataStoraged.index));
        if (user !== null && dataStoraged.username === user?.username) {
          setLoggedUser(user);
          if (user.cart) {
            setCart(user.cart);
          }
          if (user.balance !== undefined) {
            setBalance(user.balance);
          }
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
  }, [navigate, setLoggedUser, setCart, setBalance, findUserByIndex]);

  return checkAuthentication;
};

export default useCheckUserAuthentication;
