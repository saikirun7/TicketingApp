import React from 'react'
import ManagerDashboard from './ManagerDashboard/ManagerDashboard'
import EmployeeDashboard from './EmployeeDashboard/EmployeeDashboard'
import CustomerDashboard from './CustomerDashboard/CustomerDashboard'

function Dashboard() {

  const role = localStorage.getItem('userRole');


  return (
    <div>
      <br />
        {/* <h1>Dashboard of {role}</h1> */}
        {
            role==='manager' && <ManagerDashboard></ManagerDashboard>
        }
        {
            role==='employee' && <EmployeeDashboard></EmployeeDashboard>
        }
        {
            role==='customer' && <CustomerDashboard></CustomerDashboard>
        }
    </div>
  )
}

export default Dashboard