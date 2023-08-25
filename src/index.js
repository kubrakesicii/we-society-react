import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login, {login as loginAction} from './pages/Login';
import Register, {register as registerAction} from './pages/Register';
import App from './App';
import Home , {loadArticles as loader} from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import UserProfile from './pages/UserProfile';
import Default from './layouts/Default';
import ArticleDetail from './pages/ArticleDetail';
import NewArticle from './components/NewArticle';
import FollowerList from './pages/FollowerList';
import FollowingList from './pages/FollowingList';
import NewArticleEditor from './components/NewArticleEditor';
import AuthRoute from './utils/AuthRoute';
import ReadingListArticles from './pages/ReadingListArticles';
import ProfileTabContent from './pages/ProfileTabContent';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Default />,
    children: [
      {
        path:'/login',
        element:<Login/>,
        action:loginAction
      },
      {
        path:'/register',
        element:<Register/>,
        action:registerAction
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
      // {  
      //   path:'/lists/',
      //   element:<ReadingListArticles/>
      // },
      {  
        path:'/article-detail/:id',
        element:<ArticleDetail/>
      },
      {  
        path:'/new-article',
        element:<AuthRoute><NewArticle/></AuthRoute>
      },
      {  
        path:'/new-article-editor',
        element:<NewArticleEditor/>
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
