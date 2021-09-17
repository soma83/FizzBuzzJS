import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';

export const NotFoundAsync = Loadable({
  loader: () => import('../components/notFound/NotFound'),
  loading: Loading
});

export const HomeAsync = Loadable({
  loader: () => import('./home'),
  loading: Loading
});

export const AboutAsync = Loadable({
  loader: () => import('./about'),
  loading: Loading
});

export const FizzBuzzAsync = Loadable({
  loader: () => import('./fizzbuzz/FizzBuzz'),
  loading: Loading
});
