import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, FloatingLabel, Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createService } from '../actions/serviceActions'
import { SERVICE_CREATE_RESET } from '../constants/serviceConstants'



const AddServicesScreen = () => {
	const [validated, setValidated] = useState(false);

	const [ name, setName ] = useState('')
	const [ nameErr, setNameErr ] = useState('')

	const [ baseCost, setBaseCost ] = useState('')
	const [ baseCostErr, setBaseCostErr ] = useState('')

	const [ minCost, setMinCost ] = useState('')
	const [ minCostErr, setMinCostErr ] = useState('')

	const [ serviceCost, setServiceCost ] = useState('')
	const [ serviceCostErr, setServiceCostErr ] = useState('')

	const nameCheck = (data) => {
		if(data.length<5 || data.length>50){ setNameErr('Required: 5-50 charcters')} 
			else {setNameErr('')}
	}

	const nameCheck1 = (data) => {
		if(data.length > 50){setNameErr('Should not exceed 50 charcters')}
		 else {
			setName(data)
			console.log(data)
			setNameErr('')
		}
	}

	const baseCostCheck1 = (data) => {
		if(data.length > 7){setBaseCostErr('Required: 7-digits')}
		 else {
			setBaseCost(data)
			console.log(data)
			setBaseCostErr('')
		}
	}

	const baseCostCheck = (data) => {		
		if(!new RegExp( /^\d{7}$/).test(data)){			
			setBaseCostErr('Required: 7-digits')
		}  else {
			setBaseCostErr('')
		}		
	}

	const minCostCheck1 = (data) => {
		if(data.length > 7){setMinCostErr('Required: 7-digits')}
		 else {
			setMinCost(data)
			console.log(data)
			setMinCostErr('')
		}
	}

	const minCostCheck = (data) => {		
		if(!new RegExp( /^\d{7}$/).test(data)){			
			setMinCostErr('Required: 7-digits')
		}  else {
			setMinCostErr('')
		}		
	}

	const serviceCostCheck1 = (data) => {
		if(data.length > 7){setServiceCostErr('Required: 7-digits')}
		 else {
			setServiceCost(data)
			console.log(data)
			setServiceCostErr('')
		}
	}

	const serviceCostCheck = (data) => {		
		if(!new RegExp( /^\d{7}$/).test(data)){			
			setServiceCostErr('Required: 7-digits')
		}  else {
			setServiceCostErr('')
		}		
	}


	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const serviceCreate = useSelector(state => state.serviceCreate)
	const { loading , error, success } = serviceCreate

	useEffect(() => {
		dispatch({ type: SERVICE_CREATE_RESET })

		if(!userInfo){
			navigate('/')
		}

		setValidated(null)
		if(success){			
			navigate('/services')
		}
			 
	},[success, navigate, userInfo])

	const submitHandler = (e) => {
		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
		    e.preventDefault();
		    e.stopPropagation();
	    } else {
	    	e.preventDefault()
			// console.log(role)
			dispatch(createService({
				name, baseCost, minCost, serviceCost
			}))
	    }
		setValidated(true);  
	}


	return (
		<>
		{/*<div className='button-wrapper'>
			<Link to='/userlist' className='btn btn-dark mt-3'>Go Back</Link>
		</div>*/}
		
	    <div style={{margin:'90px 0 0'}} className='bodydivs'>
	    		
	            <div >                       
			
				{loading && <Loader />}
				{error && <Message variant='danger'>{error}</Message>}
					<Form className='mt-2' onSubmit={submitHandler} validated={validated} noValidate>
						<Row>
			    			<Col md={10}>
			    				<div className='pt-2 mt-2'><h2>Add Service</h2></div>
			    			</Col>
			    			<Col className='mt-3' md={2}>
			    				<Button  type='submit'
										className={`${nameErr || baseCostErr || minCostErr || serviceCostErr
													? 'disabled' : null }`}
										style={{background:'rgb(48,143,162)', color:'white'}}
									>
									Submit
								</Button>
			    			</Col>
			    		</Row>
			            
			            <hr />
						<div>
							
								<Form.Group className="mb-3" controlId='name'>
									<FloatingLabel controlId="floatingInput" label="Name" >
										<Form.Control className='effect-8'	type="text"  placeholder="Name"
														value={name}
														onChange = {(e)=> nameCheck1(e.target.value)}
														onBlur = {(e) => nameCheck(e.target.value)}
														required
														isInvalid={!!nameErr} 
													/>
									</FloatingLabel>
									{nameErr.length>1 ? (<div className='errMsg'>{nameErr}</div>): null}
								</Form.Group>
							
								<Form.Group className="mb-3" controlId='lastName' className="mb-3">
									<FloatingLabel controlId="floatingInput" label="Base Cost" >
										<Form.Control 	type="number"  placeholder="baseCost"
														className={`${baseCostErr.length>1 ? 'inCorrect' : null}`}
														value={baseCost}
														onChange = {(e)=> baseCostCheck1(e.target.value)}
														onBlur = {(e) => baseCostCheck(e.target.value)}
														required
														isInvalid={!!baseCostErr}  
													/>
									</FloatingLabel>
									{baseCostErr.length>1 ? (<div className='errMsg'>{baseCostErr}</div>): null}
								</Form.Group>

								<Form.Group className="mb-3" controlId='lastName' className="mb-3">
									<FloatingLabel controlId="floatingInput" label="Minimum Cost" >
										<Form.Control 	type="number"  placeholder="minCost"
														className={`${minCostErr.length>1 ? 'inCorrect' : null}`}
														value={minCost}
														onChange = {(e)=> minCostCheck1(e.target.value)}
														onBlur = {(e) => minCostCheck(e.target.value)}
														required
														isInvalid={!!minCostErr}  
													/>
									</FloatingLabel>
									{minCostErr.length>1 ? (<div className='errMsg'>{minCostErr}</div>): null}
								</Form.Group>

								<Form.Group className="mb-3" controlId='lastName' className="mb-3">
									<FloatingLabel controlId="floatingInput" label="Service Cost" >
										<Form.Control 	type="number"  placeholder="service Cost"
														className={`${serviceCostErr.length>1 ? 'inCorrect' : null}`}
														value={serviceCost}
														onChange = {(e)=> serviceCostCheck1(e.target.value)}
														onBlur = {(e) => serviceCostCheck(e.target.value)}
														required
														isInvalid={!!serviceCostErr}  
													/>
									</FloatingLabel>
									{serviceCostErr.length>1 ? (<div className='errMsg'>{serviceCostErr}</div>): null}
								</Form.Group>
											
						</div>
					</Form>
				
            </div>
    </div>
			
		</>
		)
} 


export default AddServicesScreen