import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, FloatingLabel, Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createSale } from '../actions/saleActions'
import { SALE_CREATE_RESET } from '../constants/saleConstants'



const SaleAddScreen = () => {
	const [validated, setValidated] = useState(false);

	const [ serviceId, setServiceId ] = useState('')
	const [ customerId, setCustomerId ] = useState('')
	const [ frequencyId, setFrequencyId ] = useState('')

	const [ quantity, setQuantity ] = useState('')

	const [ proposedCost, setProposedCost ] = useState('')

	const [ agreedCost, setAgreedCost ] = useState('')

	const [ planStartDate, setPlanStartDate ] = useState('')

	const [ planEndDate, setPlanEndDate ] = useState('')

	const [ actualStartDate, setActualStartDate ] = useState('')

	const [ actualEndDate, setActualEndDate ] = useState('')

	const [ status, setStatus ] = useState('')
	const [ isRecurring, setIsRecurring ] = useState(false)


	
	

	
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const saleCreate = useSelector(state => state.saleCreate)
	const { loading , error, success } = saleCreate

	useEffect(() => {
		dispatch({ type: SALE_CREATE_RESET })

		if(!userInfo){
			navigate('/')
		}

		setValidated(null)
		if(success){			
			navigate('/sale')
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
			// dispatch(createSale({
			// 	name
			// }))
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
			    				<div className='pt-2 mt-2'><h2>Add Sale</h2></div>
			    			</Col>
			    			<Col className='mt-3' md={2}>
			    				<Button  type='submit'
										// className={`${nameErr ? 'disabled' : null }`}
										style={{background:'rgb(48,143,162)', color:'white'}}
									>
									Submit
								</Button>
			    			</Col>
			    		</Row>
			            
			            <hr />
						<div>
							

						</div>
					</Form>
				
            </div>
    </div>
			
		</>
		)
} 


export default SaleAddScreen