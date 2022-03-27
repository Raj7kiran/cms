import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { USER_DELETE_RESET } from '../constants/userConstants'
import * as AiIcons from 'react-icons/ai'


const UserListScreen = () => {
	let count = 1;
	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')

	const userList = useSelector(state => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const userDelete = useSelector(state => state.userDelete)
	const {loading:loadingDelete, error:errorDelete, success: successDelete } = userDelete


	const [ data, setData ] = useState(users)

	useEffect(()=>{
		setData(users)
		   // console.log(data)
		},[users]) 

	useEffect(() => {
		dispatch({ type: USER_DELETE_RESET })
		if(userInfo){
			dispatch(listUsers())
		} else {
			navigate('/')
		}		
	}, [dispatch, userInfo, successDelete, navigate] )


	const sorting = (col) => {
		 if(order === 'ASC'){
				const sorted = [...data].sort((a,b) =>
					a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
				)
				setData(sorted)
				setOrder('DSC')
		 }
	 	if(order === 'DSC'){
		 	const sorted = [...data].sort((a,b) =>
		 		a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
		 	)
		 	setData(sorted)
			setOrder('ASC')
		 }
	}	

	function search(data2) {
		return data2.filter((user) =>
						user.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						user.email.toLowerCase().indexOf(q.toLowerCase()) > -1 
						// user.city.toLowerCase().indexOf(q.toLowerCase()) > -1
						// (user.address && user.address.toLowerCase().indexOf(q.toLowerCase()) )> -1 																		 										
					)
		}

	const filteredUsers= search(data)

	const deleteHandler = (id) =>{
		if(window.confirm('Are you sure you want to delete?')){
				dispatch(deleteUser(id))
		}
	}

	return(
			<>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}	
			<div style={{margin:"50px 0 0 0"}} className='bodydivs'>
				<Row>
					<Col md={10}>
						<div className="mt-3 mb-2"><h2>User List</h2></div>
					</Col>
					<Col md={2}>
						<Link style={{background:'rgb(48,143,162)', color:'white'}} className='mt-4 btn btn-info forallbut' to='/users/add'><span style={{color:'white'}} >Add User</span></Link>
					</Col>
				</Row>

				<hr />
				{loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
					: (
						<>
							<div className='searchTable'>
									<InputGroup className='m-2'>
									    <InputGroup.Text style={{background:'rgb(48,143,162)', color:'white'}}>Search</InputGroup.Text>
									    <FormControl aria-label="Search"					    			
									    			 value={q} onChange={(e) =>  setQ(e.target.value)}
									    />
									</InputGroup>
								</div>
							<Table responsive hover className='fl-table mt-4 table-row-hover'>
							<thead>
								<tr>
									<th ><span className='btn'><strong>S.No</strong></span></th>
									<th onClick={() => sorting('name')} ><span className='btn'><strong>Name</strong></span></th>
									<th onClick={() => sorting('email')} ><span className='btn'><strong>Email</strong></span></th>
									<th onClick={() => sorting('city')} ><span className='btn'><strong>City</strong></span></th>
									<th ><span className='btn'><strong>Phone</strong></span></th>
									<th ><span className='btn'><strong>Alternate Ph</strong></span></th>
									<th onClick={() => sorting('revenue')} ><span className='btn'><strong>Revenue</strong></span></th>
									<th onClick={() => sorting('profit')} ><span className='btn'><strong>Profit</strong></span></th>
									<th onClick={() => sorting('createdAt')} ><span className='btn'><strong>Created Date</strong></span></th>
									<th ><span className='btn'><strong>Action</strong></span></th>
								</tr>
							</thead>
							<tbody>
									{
										filteredUsers.map(user => (
											<tr key={user._id}>
												<td>{count++}</td>
												<td>{user.name}</td>
												<td>{user.email}</td>
												<td>{user.city}</td>
												<td>{user.phone}</td>
												<td>{user.alternatePhone}</td>
												<td>{user.revenue}</td>
												<td>{user.profit}</td>
												<td>{user.createdAt.substring(0,10)}</td>
												<td>
													<LinkContainer to={`/user/${user._id}/edit`}>
														<Button variant='light' className='btn-sm'>
															<AiIcons.AiOutlineEdit />
														</Button>
													</LinkContainer>
													<Button variant='danger' className='btn-sm' 
															onClick={()=> deleteHandler(user._id)}>
														<AiIcons.AiOutlineDelete />
													</Button>
												</td>
											</tr>
										))
									}
							</tbody>
					</Table>
						</>
					)}
				</div>
			</>
		)
}


export default UserListScreen

