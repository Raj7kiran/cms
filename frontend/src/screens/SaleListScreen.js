import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Message from '../components/Message'
import Loader from '../components/Loader'
import * as AiIcons from 'react-icons/ai'
import { listSale, deleteSale } from '../actions/saleActions'



const SaleListScreen = () => {

	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')

	const saleList = useSelector(state => state.saleList)
	const { loading, error, sales } = saleList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin	

	const saleDelete = useSelector(state => state.saleDelete)
	const {loading:loadingDelete , error:errorDelete ,success: successDelete } = saleDelete

	// const clients = useSelector(state => state.clientList.clients)
	const [ data, setData ] = useState(sales) 

	useEffect(()=>{
		   setData(sales)
		   // console.log(data)
		},[sales])

	// console.log(data)

	useEffect(() => {
		if(userInfo){
			dispatch(listSale())
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
		return data2.filter((sale) =>
						sale.serviceId.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						sale.customerId.toLowerCase().indexOf(q.toLowerCase()) > -1 
						// sale.updatedBy.toLowerCase().indexOf(q.toLowerCase()) > -1 
						// (user.address && user.address.toLowerCase().indexOf(q.toLowerCase()) )> -1 																		 										
					)
		}

	const filteredSales = search(data)
	

	const deleteHandler = (id) =>{
		if(window.confirm('Are you sure you want to delete?')){
				dispatch(deleteSale(id))
		}
	}


	return (
			<>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}	
			<div style={{margin:"50px 0 0 0"}} className='bodydivs'>
							<Row>
								<Col md={10}>
									<div className="mt-3 mb-2"><h2>Sales</h2></div>
								</Col>
								<Col md={2}>
									<Link style={{background:'rgb(48,143,162)', color:'white'}} className='mt-4 btn btn-info forallbut' to='/sale/add'><span style={{color:'white'}} >Add Sale</span></Link>
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
										<th onClick={() => sorting('serviceId')} ><span className='btn'>Service ID</span></th>
										<th onClick={() => sorting('customerId')} ><span className='btn'>Customer ID</span></th>
										<th onClick={() => sorting('frequencyId')} ><span className='btn'>Frequency ID</span></th>
										<th onClick={() => sorting('quantity')} ><span className='btn'>Quantity</span></th>
										<th onClick={() => sorting('proposedCost')} ><span className='btn'>Proposed Cost</span></th>
										<th onClick={() => sorting('agreedCost')} ><span className='btn'>Agreed Cost</span></th>
										<th onClick={() => sorting('planStartDate')} ><span className='btn'>Plan Start Date</span></th>
										<th onClick={() => sorting('planEndDate')} ><span className='btn'>Plan End Date</span></th>
										<th onClick={() => sorting('actualStartDate')} ><span className='btn'>Actual Start Date</span></th>
										<th onClick={() => sorting('actualEndDate')} ><span className='btn'>Actual End Date</span></th>
										<th onClick={() => sorting('status')} ><span className='btn'>Status</span></th>
										<th><span className='btn'>Action</span></th>
									</tr>
								</thead>
								<tbody>
								{filteredSales.map(sale => (
									<tr key={sale._id}>
										<td>{sale.serviceId}</td>
										<td>{sale.customerId}</td>
										<td>{sale.freuencyId}</td>
										<td>{sale.quantity}</td>
										<td>{sale.proposedCost}</td>
										<td>{sale.agreedCost}</td>
										<td>{sale.planStartDate.substring(0,10)}</td>
										<td>{sale.planEndDate.substring(0,10)}</td>
										<td>{sale.actualStartDate.substring(0,10)}</td>
										<td>{sale.actualEndDate.substring(0,10)}</td>
										<td>
											<LinkContainer to={`/sale/${sale._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<AiIcons.AiOutlineEdit />
												</Button>
											</LinkContainer>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(sale._id)}>
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


export default SaleListScreen