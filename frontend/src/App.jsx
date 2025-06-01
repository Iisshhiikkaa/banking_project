import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
// import DashBorad from './component/DashBorad';
import BranchSelector from './component/BranchSelector';
// import NewMember from './component/members/MemberList';/
import MemberList from './component/members/memberlist/MemberList';
import DashBoard from './component/DashBoard';
import NewMember from './component/members/newmembers/NewMember';
import Appstore from './utils/Appstore';
import { Provider } from 'react-redux';
import EditMemberInfo from './component/members/editMember/EditMemberInfo';
// import MemberBranchTransfer from './component/members/memberTransfer/MemberBranchTransfer';
import TransferMembershipForm from './component/members/memberTransfer/TransferMembershipForm';
import MemberListSearchForm from './component/members/memberlist/MemberListSearchForm';
import GroupAccountForm from './component/bank/newAccount/GroupAccountForm';
import BankAccountList from './component/bank/BankAccountList/BankAccountList';
import ChequeRegister from './component/bank/ChequeRegister';
import GroupReportPage from './component/members/groupReport/GroupReportPage';
import Reconsilition from './component/bank/recosilition.jsx/Reconsilition';
import SavingsAccountForm from './component/savings/SavingAccountForm';
import Transactions from './component/savings/Transactions';
import BankGroupReportPage from './component/bank/groupReport/BankGroupReportPages';
import CheckReportPage from './component/bank/CheckReport/CheckReportPage';
import AccountRegister from './component/savings/accountList/AccountRegister';

function App() {

  const AppRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />  // or <Body />, depending on your intention
    },
    {
      path: `boi/:state/:city/:branch/dashboard`,
      element:<DashBoard />
      ,
      children:[
        
       {
        path:"memberlist",
        element:<MemberList/>
     },
     {
      path:"newmember",
      element:<NewMember/>
   },
   {
    path:"memberSearchList",
    element:<MemberListSearchForm/>
   }
   ,
   {
    path:"newBankAccount",
    element:<GroupAccountForm/>
   }
   
   ,
   {
    path:"Reconsilition",
    element:<Reconsilition/>
   },
   {
    path:"openAccount",
    element:<SavingsAccountForm/>
   },
   {path:'transactions',
    element:<Transactions/>
   }
  
   ,
   {
    path:"bankAccountList",
    element:<BankAccountList/>
   },
   {
    path:"chequeReport",
    element:<CheckReportPage/>
   },
   {
    path:"checkRegister",
    element:<ChequeRegister/>
   }
   ,
   {
    path:"groupReport",
    element:<GroupReportPage/>
   }
   ,
   {
    path:"bankReport",
    element:<BankGroupReportPage/>


   },
   {
    path:"editmember",
    element:<EditMemberInfo/>
 },
 
 {
    path:"accountRegisterList",
    element:<AccountRegister/>
 },
 {
  path:"mamberTransfer",
  element:<TransferMembershipForm/>
},
     ]
     } ,
    
,
  {
    path:'/branch',
    element: <BranchSelector/>,
   }
  ]);

  return (
    <div className="">
      <Provider store={Appstore}>

      <RouterProvider router={AppRouter} />
      </Provider>
    </div>
  );
}

export default App;
