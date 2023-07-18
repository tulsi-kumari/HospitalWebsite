import React from 'react'

const AllAdmins = ({admins}) => {
    let count=1;
  return (
        <>
            {
               
                admins.map((curUser) => {
                    const {_id, username, email,contact,address,age} = curUser;
                          
                    return (
                        <tr key={_id}>
                            <th scope="row">{count++}</th>
                            <td>{username}</td>
                            <td>{email}</td>
                            <td>{address}</td>
                            <td>{contact}</td>
                            <td>{age}</td>
                        </tr>
                    )
                }) }

        </>
  )
}

export default AllAdmins