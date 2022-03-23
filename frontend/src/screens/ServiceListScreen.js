import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Message from '../components/Message'
import Loader from '../components/Loader'
import * as AiIcons from 'react-icons/ai'
import { listServices, deleteService } from '../actions/serviceActions'



const ServiceListScreen = () => {

	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')

	const serviceList = useSelector(state => state.serviceList)
	const { loading, error, services } = serviceList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin	

	const serviceDelete = useSelector(state => state.serviceDelete)
	const {loading:loadingDelete , error:errorDelete ,success: successDelete } = serviceDelete

	// const clients = useSelector(state => state.clientList.clients)
	const [ data, setData ] = useState(services) 

	useEffect(()=>{
		   setData(services)
		   // console.log(data)
		},[services])

	// console.log(data)

	useEffect(() => {
		if(userInfo){
			dispatch(listServices())
		} else {
			navigate('/')
		}
		
	}, [dispatch, userInfo, navigate, successDelete] )

	


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
		return data2.filter((service) =>
						service.name.toLowerCase().indexOf(q.toLowerCase()) > -1
						// user.email.toLowerCase().indexOf(q.toLowerCase()) > -1
						// user.role.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						// (user.address && user.address.toLowerCase().indexOf(q.toLowerCase()) )> -1 																		 										
					)
		}

	const filteredServices= search(data)
	

	const deleteHandler = (id) =>{
		if(window.confirm('Are you sure you want to delete?')){
				dispatch(deleteService(id))
		}
	}


	return (
			<>	
			<div style={{margin:"50px 0 0 0"}} className='bodydivs'>
							<Row>
								<Col md={10}>
									<div className="mt-3 mb-2"><h2>Services</h2></div>
								</Col>
								<Col md={2}>
									<Link style={{background:'rgb(48,143,162)', color:'white'}} className='mt-4 btn btn-info forallbut' to='/services/add'><span style={{color:'white'}} >Add Service</span></Link>
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
							<div>
							<Table striped bordered hover responsive className='table-sm' className='table-sm bg-light' id="table-to-xls">
								<thead>
									<tr>
										<th onClick={() => sorting('name')} ><span className='btn'>Name</span></th>
										<th onClick={() => sorting('baseCost')} ><span className='btn'>Base Cost</span></th>
										<th onClick={() => sorting('minCost')} ><span className='btn'>Min Cost</span></th>
										<th onClick={() => sorting('serviceCost')} ><span className='btn'>Service Cost</span></th>
										<th><span className='btn'>Action</span></th>
									</tr>
								</thead>
								<tbody>
								{filteredServices.map(service => (
									<tr key={service._id}>
										<td>{service.name}</td>
										<td>{service.baseCost}</td>
										<td>{service.minCost}</td>
										<td>{service.serviceCost}</td>
										<td>
											<LinkContainer to={`/service/${service._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<AiIcons.AiOutlineEdit />
												</Button>
											</LinkContainer>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(service._id)}>
												<AiIcons.AiOutlineDelete />
											</Button>
										</td>
									</tr>
								))}
								</tbody>
							</Table>
							</div>
						</>
					)}
				</div>
			</>
		)
}


export default ServiceListScreen