import React, {useState, useEffect} from 'react'

import './index.css'

function UserManagement() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  })
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://my-json-server.typicode.com/Gaurav-github-09/users-details/users?_limit=${pageSize}&_page=${currentPage}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setUsers(data)
        setIsLoading(false)
      } catch (error) {
        setError('Failed to fetch users.')
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage])

  const handleInputChange = event => {
    const {name, value} = event.target
    setUser({...user, [name]: value})
  }

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!user.firstName) {
      newErrors.firstName = 'First Name is required.'
      isValid = false
    }

    if (!user.lastName) {
      newErrors.lastName = 'Last Name is required.'
      isValid = false
    }

    if (!user.email) {
      newErrors.email = 'Email is required.'
      isValid = false
    } else if (!isValidEmail(user.email)) {
      newErrors.email = 'Invalid email format.'
      isValid = false
    }

    if (!user.department) {
      newErrors.department = 'Department is required.'
      isValid = false
    }

    setFormErrors(newErrors)
    return isValid
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (validateForm()) {
      try {
        const usrId = user.id
        if (usrId > 5) {
          const updatedUsers = users.map(u => (u.id === usrId ? {...user} : u))
          setUsers(updatedUsers)
          setUser({
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            department: '',
          })
          return
          
        }

        const method = user.id ? 'PUT' : 'POST'
        const url = user.id
          ? `https://my-json-server.typicode.com/Gaurav-github-09/users-details/users/${user.id}`
          : 'https://my-json-server.typicode.com/Gaurav-github-09/users-details/users'

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })

        if (method === 'POST') {
          // Add new user
          
          if (users.length > 5){
            const newUserUpdated= {
              id: users.length+1,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              department: user.department,
            }
            setUsers([...users, newUserUpdated])
            setUser({
              id: null,
              firstName: '',
              lastName: '',
              email: '',
              department: '',
            })
            return
          }
          
          const newUser = await response.json()
          setUsers([...users, newUser])
        } else {
          // Update existing user
          const updatedUsers = users.map(u =>
            u.id === user.id ? {...user} : u,
          )
          setUsers(updatedUsers)
        }

        if (!response.ok) {
          throw new Error('Failed to save user.')
        }

        setUser({
          id: null,
          firstName: '',
          lastName: '',
          email: '',
          department: '',
        })
      } catch (error) {
        console.error('Error saving user:', error)
        // Handle API errors (e.g., display error message to user)
      }
    }
  }

  const handleEdit = userToEdit => {
    
    setUser({
      id: userToEdit.id,
      firstName: userToEdit.firstName,
      lastName: userToEdit.lastName,
      email: userToEdit.email,
      department: userToEdit.department,
    })
  }

  const handleDelete = async userId => {
    try {
      const response = await fetch(
        `https://my-json-server.typicode.com/Gaurav-github-09/users-details/users/${userId}`,
        {
          method: 'DELETE',
        },
      )

      if (!response.ok) {
        throw new Error('Failed to delete user.')
      }

      setUsers(users.filter(user => user.id !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
      // Handle API errors (e.g., display error message to user)
    }
    setUsers(users.filter(user => user.id !== userId))
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const cancelClicked = () => {
    setUser({})
    setUser({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    })
  }

  if (isLoading) {
    return (
      <div className="main-cont main-cont2 ">
        <h1 className="userMan">Loading....</h1>
      </div>
    )
  }

  if (error) {
    return <div className="main-cont main-cont2">Error: {error}</div>
  }

  return (
    <div className="main-cont">
      <h1 className="userMan">User Management</h1>

      <div className="cont1">
        <h2 className="addEdit">Add/Edit User</h2>
        <form className="formElement" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.firstName}</p>
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.lastName}</p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.email}</p>
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={user.department}
              onChange={handleInputChange}
            />
            <p className="error">{formErrors.department}</p>
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={cancelClicked}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <>
          <div className="cont1 cont2">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(eachUser => (
                  <tr key={eachUser.id}>
                    <td>{eachUser.id}</td>
                    <td>{eachUser.firstName}</td>
                    <td>{eachUser.lastName}</td>
                    <td>{eachUser.email}</td>
                    <td>{eachUser.department}</td>
                    <td>
                      <button onClick={() => handleEdit(eachUser)}>Edit</button>
                      <button onClick={() => handleDelete(eachUser.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div>
        <p className="currentPage">Page:{currentPage}</p>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  )
}

export default UserManagement
