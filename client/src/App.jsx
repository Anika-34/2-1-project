import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useAsyncError } from "react-router-dom";
import HomePage from './routes/homepage'; // Ensure the import names match the file exports
import LoginPage from './routes/loginPage';
import UpdateUserInfo from './routes/updateUserInfo';
import ShowUserInfo from './routes/showUserInfo';
import AddUserInfo from './routes/addUserInfo';
import SearchUserInfo from './routes/searchUserInfo';
import RouteDetails from './routes/routeDetails';
import SearchTrainInfo from './routes/searchTrainInfo';
import ReviewPage from './routes/reviewPage';
import BookTrain from './routes/bookTrain';
import BookSeat from './routes/bookSeat';
import TicketBooking from './routes/ticketBooking';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from './components/NavBar';
import NavBar2 from './components/NavBar2';
import './components/App.css';
import { AppProvider } from './components/AppContext';

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [name1, setName1]= useState("prof");
    const [id1, setId1]= useState(0);
    const setAuth = boolean => {
        setAuthenticated(boolean);
        setName1(localStorage.getItem("name"));
        setId1(localStorage.getItem("userId"));
        console.log("....."+ id1+".........."+name1+".........."+isAuthenticated+"..........");
    
      }

    useEffect(() => {
        const isAuth = async () => {
            try {
                const response = await fetch("http://localhost:3001/is-verify", {
                    method: "GET",
                    headers: { jwt_token: localStorage.getItem("token") || "" }

                });
                const parseRes = await response.json();
                setAuthenticated(parseRes === true);
            } catch (error) {
                console.error(error);
            }
        };

        isAuth();
    }, []);

    console.log(isAuthenticated+"....................");
    return (
        <div className="container">
            <AppProvider>
            <Router>
                <NavBar isAuthenticated= {isAuthenticated} name1={name1} id1= {id1}/>
                <Routes>
                    <Route path="/" element={ <HomePage />} />
                    <Route path="/users/login" element={<LoginPage setAuth= {setAuth}/>} />
                    <Route path="/users/:id/update" element={<UpdateUserInfo />} />
                    <Route path="/users/:id" element={<ShowUserInfo />} />
                    <Route path="/users" element={<AddUserInfo />} />
                    <Route path="/search" element={<SearchUserInfo />} />
                    <Route path="/trains" element={<SearchTrainInfo />} />
                    <Route path="/train/:id" element={<RouteDetails />} />
                    <Route path="/booking/train/search" element={<BookTrain />} />
                    <Route path="/review" element={<ReviewPage />} />
                    <Route path="/bookseat" element={<BookSeat />} />
                    <Route path="/booking/ticket" element={<TicketBooking />} />
                </Routes>
            </Router>
            </AppProvider>
        </div>
    );
};

export default App;
