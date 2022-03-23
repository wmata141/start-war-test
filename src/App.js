import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './modules/Login'
import UserList from './modules/UserList'
import FilmDetail from './modules/FilmDetail'
import PrivateRoute from './components/PrivateRoute';

const App = () => {  

  return (
    <BrowserRouter>      
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route exact path='/user-list' element={<UserList />} />
          <Route exact path='/film-detail' element={<FilmDetail />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
