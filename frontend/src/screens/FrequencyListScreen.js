import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Message from '../components/Message'
import Loader from '../components/Loader'
import * as AiIcons from 'react-icons/ai'
import { listFrequency, deleteFrequency } from '../actions/frequencyActions'



const FrequencyListScreen = () => {

	const dispatch = useDispatch()
	let navigate = useNavigate()
	const [q , setQ] = useState('')
	const [ order, setOrder ] = useState('ASC')

	const frequencyList = useSelector(state => state.frequencyList)
	const { loading, error, frequencies } = frequencyList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin	

	const frequencyDelete = useSelector(state => state.frequencyDelete)
	const {loading:loadingDelete , error:errorDelete ,success: successDelete } = frequencyDelete

	// const clients = useSelector(state => state.clientList.clients)
	const [ data, setData ] = useState(frequencies) 

	useEffect(()=>{
		   setData(frequencies)
		   // console.log(data)
		},[frequencies])

	// console.log(data)

	useEffect(() => {
		if(userInfo){
			dispatch(listFrequency())
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
		return data2.filter((frequency) =>
						frequency.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
						frequency.createdBy.name.toLowerCase().indexOf(q.toLowerCase()) > -1 
						// frequency.updatedBy.toLowerCase().indexOf(q.toLowerCase()) > -1 
						// (user.address && user.address.toLowerCase().indexOf(q.toLowerCase()) )> -1 																		 										
					)
		}

	const filteredFrequencies= search(data)
	

	const deleteHandler = (id) =>{
		if(window.confirm('Are you sure you want to delete?')){
				dispatch(deleteFrequency(id))
		}
	}


	return (
			<>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}	
			<div style={{margin:"50px 0 0 0"}} className='bodydivs'>
							<Row>
								<Col md={10}>
									<div className="mt-3 mb-2"><h2>Frequencies</h2></div>
								</Col>
								<Col md={2}>
									<Link style={{background:'rgb(48,143,162)', color:'white'}} className='mt-4 btn btn-info forallbut' to='/frequency/add'><span style={{color:'white'}} >Add Frequency</span></Link>
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
										<th onClick={() => sorting('createdBy')} ><span className='btn'>Created By</span></th>
										<th onClick={() => sorting('updatedBy')} ><span className='btn'>Updated By</span></th>
										<th onClick={() => sorting('createdAt')} ><span className='btn'>Created Date</span></th>
										<th><span className='btn'>Action</span></th>
									</tr>
								</thead>
								<tbody>
								{filteredFrequencies.map(frequency => (
									<tr key={frequency._id}>
										<td>{frequency.name}</td>
										<td>{frequency.createdBy.name}</td>
										<td>{frequency.updatedBy}</td>
										<td>{frequency.createdAt.substring(0,10)}</td>
										<td>
											<LinkContainer to={`/frequency/${frequency._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<AiIcons.AiOutlineEdit />
												</Button>
											</LinkContainer>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(frequency._id)}>
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


export default FrequencyListScreen