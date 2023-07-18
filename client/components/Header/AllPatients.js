import React  from 'react'

const AllPatients = ({patients}) => {

    let count=1;

  return (
        <>
            {
               
                patients.map((curUser) => {
                    const {_id, username, email,contact,disease,age,address} = curUser;
                          
                    return (
                        <tr key={_id}>
                            <th scope="row">{count++}</th>
                            <td>{username}</td>
                            <td>{email}</td>
                            <td>{address}</td>
                            <td>{contact}</td>
                            <td>{age}</td>
                            <td>{disease}</td>
                        </tr>
                    )
                }) }

        </>
  )
}

export default AllPatients

