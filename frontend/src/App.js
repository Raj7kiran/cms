import './App.css';
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Routes, Route, Fragment } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
// import Report from './screens/ReporScreen';
import LoginScreen from './screens/LoginScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import AddUserScreen from './screens/AddUserScreen';
import ServiceListScreen from './screens/ServiceListScreen'
import AddServicesScreen from './screens/AddServicesScreen'
import ProfileScreen from './screens/ProfileScreen'
import FrequencyListScreen from './screens/FrequencyListScreen'
import FrequencyAddScreen from './screens/FrequencyAddScreen'
import SaleListScreen from './screens/SaleListScreen'
import SaleAddScreen from './screens/SaleAddScreen'



function App() {
  return (
    <>
      <Router>
      <NavBar/>
        <Container>
          <Routes>
              <Route path='/' element={<LoginScreen />} exact />
              <Route path='/home' element={<HomeScreen />} exact />
              <Route path='/profile' element={<ProfileScreen />} exact />
              <Route path='/users' element={<UserListScreen />} exact />
              <Route path='/user/:id/edit' element={<UserEditScreen />} exact />
              <Route path='/users/add' element={<AddUserScreen />} exact />
              <Route path='/services' element={<ServiceListScreen />} exact />
              <Route path='/services/add' element={<AddServicesScreen />} exact />
              <Route path='/frequency' element={<FrequencyListScreen />} exact />
              <Route path='/frequency/add' element={<FrequencyAddScreen />} exact />
              <Route path='/sale' element={<SaleListScreen />} exact />
              <Route path='/sale/add' element={<SaleAddScreen />} exact />
              {/*<Route path='/reports' element={<Report />} exact />*/}
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
