import Account from '../components/Account';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ShoppingCart from '../components/ShoppingCart';
import UserAuth from './UserAuth';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, user } = UserAuth();

  if (Component === LoginForm || Component === RegisterForm)
  {
    if (isAuthenticated)
    {
      return <div>
                <h1 className='text-center m-5'>Už si prihlásený.</h1>
            </div>;
    } else
    {
      return <Component {...rest} />;
    }
  }

  if (Component === ShoppingCart || Component == Account)
  {
    if (isAuthenticated)
    {
      return <Component {...rest} />;
    }
    else
    {
      return <div>
                <h1 className='text-center m-5'>Musíš sa prihlásiť.</h1>
            </div>;
    }
  }

  if (isAuthenticated && user.role === 'admin') {
    return <Component {...rest} />;
  } 
  else {

    return <div>
            <h1 className='text-center m-5 fw-bold'>Chyba!</h1>
            <h2 className='text-center m-5'>Na túto akciu nemáš povolenie!</h2>
          </div>;
  }
};

export default ProtectedRoute;