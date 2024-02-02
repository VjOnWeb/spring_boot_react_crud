import React, { useEffect, useState } from 'react'
import { listUser } from '../services/userService'

const ListUserComponents = () => {
  const [users , setUser] =   useState([])
  useEffect( () => {
    listUser().then((response)=>{
      setUser(response.data)
    }).catch(error => {
      console.error(error);
    })
  }, []) 
  


  return (
    <div className='container'>
        <h2 className='text-center'> List of Users</h2>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th> ID</th>
                    <th> First Name</th>
                    <th> Last Name</th>
                    <th> Age</th>
                    <th> Occupation</th>
                </tr>
            </thead> 
            <tbody>
              {
                users.map(user=>
              <tr key={user.id}>
                <td> {user.id}</td>
                <td> {user.firstName}</td>
                <td> {user.lastName}</td>
                <td> {user.age}</td>
                <td> {user.occupation}</td>
              </tr>)
          } 
            </tbody>
        </table>

    </div>
  )
}

export default ListUserComponents



/*
const dummyData =  [
  
  {
    "id": 1,
                  "firstName": "Vijay Anand Dummy",
                  "lastName": " Ragu",
                  "age": 25,
                  "occupation": "Developer"
                },
                {
                  "id": 2,
                  "firstName": "John Doe Dummy",
                  "lastName": " A",
                  "age": 33,
                  "occupation": "Jr Developer"
                },
                {
                  "id": 6,
                  "firstName": "Tic Tac Dummy",
                  "lastName": " Doe",
                  "age": 44,
                  "occupation": "Gamer"
                }
      ]
*/