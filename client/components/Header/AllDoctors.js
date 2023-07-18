import React from 'react'

const AllDoctors = ({doctors}) => {
    let count=1;
  return (
        <>
            {
               
                doctors.map((curUser) => {
                    const {_id, username, email,contact,address,age,speciality} = curUser;
                          
                    return (
                        <tr key={_id}>
                            <th scope="row">{count++}</th>
                            <td>{username}</td>
                            <td>{email}</td>
                            <td>{address}</td>
                            <td>{contact}</td>
                            <td>{age}</td>
                            <td>{speciality}</td>
                        </tr>
                    )
                }) }

        </>
  )
}

export default AllDoctors