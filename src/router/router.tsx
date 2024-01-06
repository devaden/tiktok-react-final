import {createBrowserRouter } from "react-router-dom"
import Home from "../views/Home/Home";
import Layout from "../layouts/Layout/Layout";
import ChallengeManager from "../views/ChallengeManager/ChallengeManager";
import ChallengeActiveQuestionPage from "../views/ChallengeActiveQuestionPage/ChallengeActiveQuestionPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path:"manager/:id",
          element:<ChallengeManager/>
        },
        {
          path:"active-question",
          element:<ChallengeActiveQuestionPage/>
        }
      ]
    }
  ]);