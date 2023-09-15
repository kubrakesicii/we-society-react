import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import UserProfile from './pages/UserProfile';
import Default from './layouts/Default';
import ArticleDetail from './pages/ArticleDetail';
import NewArticle from './components/NewArticle';
import FollowerList from './pages/FollowerList';
import FollowingList from './pages/FollowingList';
import AuthRoute from './utils/authRoute';
import ReadingListArticles from './pages/ReadingListArticles';
import ProfileTabContent from './pages/ProfileTabContent';
import SearchResult from './pages/SearchResult';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Default />,
    children: [
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {  
        path:'/home',
        element:<Home/>
      },
      {  
        path:'/user-profile/:userProfileId',
        element:<UserProfile/>
      },
      {  
        path:'/follower/:userProfileId',
        element:<FollowerList/>
      },
      {  
        path:'/following/:userProfileId',
        element:<FollowingList/>
      },
      {  
        path:'/article-detail/:id',
        element:<ArticleDetail/>
      },
      {  
        path:'/new-article',
        element:<AuthRoute><NewArticle/></AuthRoute>
      },
      {  
        path:'/search',
        element:<SearchResult/>
      },
      {
        path:'/user-profile/:userProfileId',
        element:<UserProfile />,
        children: [
          {
            path:'/user-profile/:userProfileId/tabs',
            element:<ProfileTabContent/>
          },
          {  
            path:'/user-profile/:userProfileId/followers',
            element:<FollowerList/>
          },
          {  
            path:'/user-profile/:userProfileId/followings',
            element:<FollowingList/>
          },
          {  
            path:'/user-profile/:userProfileId/lists/:readingListId/:name',
            element:<ReadingListArticles/>
          },
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
