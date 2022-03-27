import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, FloatingLabel, Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createFrequency } from '../actions/frequencyActions'
import { FREQUENCY_CREATE_RESET } from '../constants/frequencyConstants'



const FrequencyAddScreen = () => {
	const [validated, setValidated] = useState(false);

	const [ name, setName ] = useState('')
	const [ nameErr, setNameErr ] = useState('')

	
	const nameCheck = (data) => {
		if(data.length<0 || data.length>10){ setNameErr('Required: 10 charcters')} 
			else {setNameErr('')}
	}

	const nameCheck1 = (data) => {
		if(data.length > 10){setNameErr('Should not exceed 10 charcters')}
		 else {
			setName(data)
			console.log(data)
			setNameErr('')
		}
	}

	
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const frequencyCreate = useSelector(state => state.frequencyCreate)
	const { loading , error, success } = frequencyCreate

	useEffect(() => {
		dispatch({ type: FREQUENCY_CREATE_RESET })

		if(!userInfo){
			navigate('/')
		}

		setValidated(null)
		if(success){			
			navigate('/frequency')
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
			dispatch(createFrequency({
				name
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
			    				<div className='pt-2 mt-2'><h2>Add Frequency</h2></div>
			    			</Col>
			    			<Col className='mt-3' md={2}>
			    				<Button  type='submit'
										className={`${nameErr ? 'disabled' : null }`}
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
							
						</div>
					</Form>
				
            </div>
    </div>
			
		</>
		)
} 


export default FrequencyAddScreen