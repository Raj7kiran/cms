import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, FloatingLabel, Row,Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, deleteUser, updateUser } from '../actions/userActions'
import { listPackages } from '../actions/adminActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { getCountry, getStatesName, getCity } from '../actions/dropActions'
import * as AiIcons from 'react-icons/ai'


const UserEditScreen = ({match}) => {
	const [validated, setValidated] = useState(false);

	const { id } = useParams()

	const userId = id

	const [ firstName, setFirstName ] = useState('')
	const [ fnErr, setFnErr ] = useState('')

	const [ lastName, setLastName ] = useState('')
	const [ lnErr, setLnErr ] = useState('')

	const [ email, setEmail ] = useState('')
	const [ emailErr, setEmailErr ] = useState('')

	const [ company, setCompany ] = useState('')
	const [ compErr, setCompErr ] = useState('')

	const [ pack, setPack ] = useState('')
	const [ packErr, setPackErr ] = useState('')

	const [ gender, setGender ] = useState('')
	// const [ role, setRole ] = useState('')
	// const [ roleErr, setRoleErr ] = useState('')	

	const [ city, setCity ] = useState('')
	const [ stateName, setStateName ] = useState('')
	const [ country, setCountry ] = useState('')
	
	const [ phone, setPhone ] = useState('')
	const [ phoneErr, setPhoneErr ] = useState('')

	const [ alternatePhone, setAlternatePhone ] = useState('')
	const [ alternatePhoneErr, setAlternatePhoneErr ] = useState('')

	const [ pincode, setPincode ] = useState('')
	const [ pinErr, setPinErr ] = useState('')

	const [address, setAddress] = useState('')
	const [revenue, setRevenue] = useState('')
	const [profit, setProfit] = useState('')

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');


	const [ dob, setDob ] = useState('')
	const [ isAdmin, setIsAdmin ] = useState(false)
	const [ isClientAdmin, setisClientAdmin] = useState(false)

	const [ message, setMessage ] = useState('')

	const FN = (data) => {
		if(data.length<5 || data.length>50){ setFnErr('Required: 5-50 charcters')} 
			else {setFnErr('')}
	}

	const FN1 = (data) => {
		if(data.length > 50){setFnErr('Should not exceed 50 charcters')}
		 else {
			setFirstName(data)
			console.log(data)
			setFnErr('')
		}
	}

	const LN = (data) => {
		if(data.length<1 || data.length>15) { setLnErr('Required: 1-15 charcters') } 
			else { setLnErr('') }
	}

	const LN1 = (data) => {
		if(data.length > 15){setLnErr('Should not exceed 15 charcters')}
		 else {
			setLastName(data)
			console.log(data)
			setLnErr('')
		}
	}

	// const CP = (data) => {
	// 	if(data.length<5 || data.length>35) { setCompErr('Required: 5-35 charcters') } 
	// 		else { setCompErr('') }
	// }

	// const CP1 = (data) => {
	// 	if(data.length > 35){setCompErr('Should not exceed 35 charcters')}
	// 	 else {
	// 		setCompany(data)
	// 		console.log(data)
	// 		setCompErr('')
	// 	}
	// }

	const PK = (data) => {
		if(!data){
			setPackErr('Please Select a package')
		}else{
			setPackErr('')
		}
	}

	// const RL = (data) => {
	// 	if(!data){
	// 		setRoleErr('Please Select a Role')
	// 	}else{
	// 		setRoleErr('')
	// 	}
	// }


	const valEmail = (email) => {
		// if(email.split('@').length == 1)
		if(!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)){			
			setEmailErr('Email is invalid')
			// setInCorrect(true)
			console.log(emailErr)
		}  else {
			setEmailErr('')
			// setInCorrect(false)
			// setCorrect(true)
		}		
	}

	const PH = (data) => {
		if(data.length > 12){setPhoneErr('Required: 2-digit country code and 10-digit phone number')}
		 else {
			setPhone(data)
			console.log(data)
			setPhoneErr('')
		}
	}

	const valPhone = (data) => {		
		if(!new RegExp( /^\d{12}$/).test(data)){			
			setPhoneErr('Required: 2-digit country code and 10-digit phone number')
			console.log(phoneErr)
		}  else {
			setPhoneErr('')
		}		
	}

	const APH = (data) => {
		if(data.length > 12){setAlternatePhoneErr('Required: 2-digit country code and 10-digit phone number')}
		 else {
			setAlternatePhone(data)
			console.log(data)
			setAlternatePhoneErr('')
		}
	}

	const valAlternatePhone = (data) => {		
		if(!new RegExp( /^\d{12}$/).test(data)){			
			setAlternatePhoneErr('Required: 2-digit country code and 10-digit phone number')
			console.log(phoneErr)
		}  else {
			setAlternatePhoneErr('')
		}		
	}

	const ZP = (data) => {
		if(data.length > 6){setPinErr('Required: 6-digit pincode')}
		 else {
			setPincode(data)
			console.log(data)
			setPinErr('')
		}
	}

	const valZip = (data) => {		
		if(!new RegExp( /^\d{6}$/).test(data)){			
			setPinErr('Required: 6-digit pincode')
			console.log(phoneErr)
		}  else {
			setPinErr('')
		}		
	}

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const packageList = useSelector(state => state.packageList)
	// const { loading : loadingPackage , error: errorPackage , packages } = packageList
	const {  packages } = packageList

	const countryList = useSelector((state) => state.countryList)
	const { countries } = countryList

	const stateList = useSelector((state) => state.stateList)
	// const { success:stateSuccess , states } = stateList
	const {  states } = stateList

	const cityList = useSelector((state) => state.cityList)
	// const { success:citySuccess , cities } = cityList
	const {  cities } = cityList

	const userUpdate = useSelector((state) => state.userUpdate)
	const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

	const userDelete = useSelector(state => state.userDelete)
	const {loading:loadingDelete, error:errorDelete, success: successDelete } = userDelete

	useEffect(() => {

			if(userInfo && userInfo.isAdmin){
				dispatch(listPackages())
			}	
			
			dispatch(getCountry())
			setValidated(null)

			if(successUpdate){
				dispatch({ type:USER_UPDATE_RESET })
				// if(userInfo.isAdmin){
				// 	navigate('/admin/clientlist')
				// } else {
					navigate('/users')
				// }				
			}

			if(successDelete){
				navigate('/users')
			}


			if(!user.firstName || user._id !== userId )
				{
					dispatch(getUserDetails(userId))				
				} 
				else{
				// console.log(user)
				setFirstName(user.firstName)
				setLastName(user.lastName)
				setEmail(user.email)
				// setCompany(user.company)
				// setPack(user.package)
				// setRole(user.role)
				setCountry(user.country)
				if(user.country) {
					dispatch(getStatesName(user.country))
				}
				if(user.state){
					dispatch(getCity(user.state))
				}
				setStateName(user.state)
				setCity(user.city)
				setGender(user.gender)				
				setPhone(user.phone)
				setAlternatePhone(user.alternatePhone)
				setPincode(user.pincode)
				setGender(user.gender)
				setDob(user.dob)
				setAddress(user.address)
				setIsAdmin(user.isAdmin)
				setisClientAdmin(user.isClientAdmin)
						
			}
	},[navigate, dispatch,user, userId, userInfo, successUpdate, successDelete])



	const callStateName = (value) => {		
		console.log(value)
		dispatch(getStatesName(value))
	}

	const callCity = (value) => {		
		console.log(value)
		dispatch(getCity(value))
	}


	const submitHandler = (e) => {
		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	      e.preventDefault();
	      e.stopPropagation();
	    } else {
	    	e.preventDefault()
	    	if(password !== confirmPassword){
				setMessage('Password does not match')
			}
			
			dispatch(updateUser({ 
					id: user._id, name: `${firstName} ${lastName}`, firstName, lastName, email,
					// company: company || userInfo.company, role, 
					packageName: pack || userInfo.package , isAdmin, isClientAdmin,
					address, pincode, dob, phone , alternatePhone, gender, city, state: stateName, country 
				}))		
	    }

	    setValidated(true);

	}

	const submitHandler2 = (e) => {
		const form = e.currentTarget;
	    if (form.checkValidity() === false) {
	      e.preventDefault();
	      e.stopPropagation();
	    } else {
	    	e.preventDefault()
	    	if(password !== confirmPassword){
				setMessage('Password does not match')
			}
			
			dispatch(updateUser({ 
					id: user._id, password, confirmPassword,
				}))		
	    }

	    setValidated(true);

	}

	
	return (
		<>
		
		{/*<Link to='/admin/clientlist' className='btn btn-dark my-3'>Go Back</Link>*/}
		<div>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{ loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<Row style={{margin:"65px 0 0 0"}}>
							<Col md={4}>
							<Form className='mt-2 mb-3' onSubmit={submitHandler2} validated={validated} noValidate>
								<Card className='profcard' className='p-3 rounded'>
									<Card.Img src='./images/circleprof.png' className='profileimagecard' variant='top'/>
									<Card.Body>
										<Link to={`/user/${user._id}`}>
											<Card.Title className='profiletitle' as='div'>
												<strong>{user.firstName}</strong>
											</Card.Title>
										</Link>
										<Row>
											<Form.Group className="mb-3" controlId='password'>
												<FloatingLabel controlId="floatingInput" label="Enter password" >
													<Form.Control type= 'password'
																	placeholder='Enter password'
																	value={password}
																	onChange = {(e)=> setPassword(e.target.value)}
																	
													>
													</Form.Control>
												</FloatingLabel>
											</Form.Group>
										</Row>
										<Row>		
											<Form.Group className="mb-3" controlId='confirmPassword'>
												<FloatingLabel controlId="floatingInput" label="Confirm password" >
													<Form.Control type= 'password'
																	placeholder='Confirm password'
																	value={confirmPassword}
																	onChange = {(e)=> setConfirmPassword(e.target.value)}
																	
													>
													</Form.Control>
												</FloatingLabel>
											</Form.Group>
											<Button type='submit' variant='primary' style={{background:'rgb(48,143,162)', color:'white'}}>
												Update Password
											</Button>
										</Row>	
										
									</Card.Body>
								</Card>
							</Form>
							</Col>
							<Col md={8}>
								<div  className='bodydivs'>
									
									<Form onSubmit={submitHandler} validated={validated} noValidate>
										<Row>
											<Col md={10}>
												<div className="mt-3 mb-2"><h2>User Profile</h2></div>
											</Col>
											<Col md={2}>
												<Button  type='submit'
														className={`${fnErr || lnErr || emailErr || compErr || packErr || phoneErr || alternatePhoneErr || pinErr
																	? 'disabled' : null } mt-3`}
														style={{background:'rgb(48,143,162)', color:'white'}}
													>
													Update
												</Button>
											</Col>
										</Row>

										<hr />
										<Row>
											<Col>
												<Form.Group className="mb-3" controlId='firstName'>
													<FloatingLabel controlId="floatingInput" label="First Name" >
														<Form.Control className='effect-8'	type="text"  placeholder="firstName"
																		// className={`${fnErr.length>1 ? 'inCorrect' : null}`}
																		value={firstName}
																		onChange = {(e)=> FN1(e.target.value)}
																		onBlur = {(e) => FN(e.target.value)}
																		required
																		isInvalid={!!fnErr} 
																	/>
													</FloatingLabel>
													{/*<input class="effect-8" type="text" placeholder="Placeholder Text">
											            <span class="focus-border">
											            	<i></i>
											            </span>*/}
													{fnErr.length>1 ? (<div className='errMsg'>{fnErr}</div>): null}
												</Form.Group>
											</Col>
											<Col md={5}>
												<Form.Group className="mb-3" controlId='lastName' className="mb-3">
													<FloatingLabel controlId="floatingInput" label="Last Name" >
														<Form.Control 	type="name"  placeholder="lastName"
																		className={`${lnErr.length>1 ? 'inCorrect' : null}`}
																		value={lastName}
																		onChange = {(e)=> LN1(e.target.value)}
																		onBlur = {(e) => LN(e.target.value)}
																		required
																		isInvalid={!!lnErr}  
																	/>
													</FloatingLabel>
													{lnErr.length>1 ? (<div className='errMsg'>{lnErr}</div>): null}
												</Form.Group>
											</Col>				
												
											
											</Row>
											<Row>
												<Col md={6}>
												<Form.Group className="mb-3" controlId='email'>
													<FloatingLabel controlId="floatingInput" label="Email address" >
														<Form.Control 	type="email"  placeholder="name@example.com"
																		className={`${emailErr.length>1 ? 'inCorrect' : null}`}													
																		value={email}
																		onChange = {(e)=> {setEmail(e.target.value)}} 
																		onBlur = {(e) => valEmail(e.target.value)}
																		required
																		isInvalid={!!emailErr} 
																	/>
													</FloatingLabel>
													{emailErr.length>1 ? (<div className='errMsg'>{emailErr}</div>): null}
												</Form.Group>
											</Col>
											<Col md={6}>

											</Col>
											</Row>	
											
											{ userInfo.isAdmin && (
													<>
													<Row>
														{/*<Col md={6}>
															<Form.Group className="mb-3" controlId='company'>
																<FloatingLabel controlId="floatingInput" label="Company Name" >
																	<Form.Control 	type="company"  placeholder="Company Name"
																					className={`${compErr.length>1 ? 'inCorrect' : null}`}	
																					value={company}
																					onChange = {(e)=> {CP1(e.target.value)}} 
																					onBlur = {(e) => CP(e.target.value)}
																					required
																					isInvalid={!!compErr}  
																				/>
																</FloatingLabel>
																{compErr.length>1 ? (<div className='errMsg'>{compErr}</div>): null}
															</Form.Group>
														</Col>*/}
														<Col md={6}>
															<Form.Group controlId='package' className="mb-3">
																<FloatingLabel controlId="floatingSelect" label="Package">
																	<Form.Control as='select' value={pack}
																				  className={`${packErr.length>1 ? 'inCorrect' : null}`} 
																				  onChange={(e) => setPack(e.target.value)}
																				  onBlur = {(e) => PK(e.target.value)}
																				  required
																				  isInvalid={!!packErr} 
																				  >
																		<option value=''>Select Package</option>
																		{packages.map(pack => (
																				<option value={pack.packageName} >{pack.packageName}</option>
																			))   }
																	</Form.Control>
																</FloatingLabel>
																{packErr.length>1 ? (<div className='errMsg'>{packErr}</div>): null}
															</Form.Group>
														</Col>
													</Row>
													<Row>
														<Col>
															{/*<Form.Group controlId='isAdmin' className="mb-3">
																<Form.Label>Is the user a Admin?</Form.Label>
																<InputGroup >
																	    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
																	    						aria-label="Checkbox for following text input"
																	    						checked={isAdmin}
																	    						onChange = { (e) => setIsAdmin(e.target.checked)}
																	     />
																	 <FormControl aria-label="Text input with checkbox" />
																</InputGroup>
															</Form.Group>*/}
															<Form.Group className="mb-3" controlId='isAdmin' >
															    	<Form.Check type="checkbox" label="Is the user a Admin?"
															    				aria-label="Checkbox for following text input"
																	    		checked={isAdmin}
																		    	onChange = { (e) => setIsAdmin(e.target.checked)}
																		    	 
																	/>
															 </Form.Group>
														</Col>
														<Col>
															{/*<Form.Group controlId='isClientAdmin' className="mb-3">
																<Form.Label>Is the user a User Admin?</Form.Label>
																<InputGroup >
																	    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
																	    						checked={isClientAdmin}
																	    						onChange = { (e) => setisClientAdmin(e.target.checked) }
																	     />
																	 <FormControl aria-label="Text input with checkbox" />
																</InputGroup>
															</Form.Group>*/}
															<Form.Group className="mb-3" id="formGridCheckbox" controlId='isClientAdmin' className="mb-3">
															    	<Form.Check type="checkbox" label="Is the user a Client Admin?"
															    				aria-label="Checkbox for following text input"
																	    		checked={isClientAdmin}
																	    		onChange = { (e) => setisClientAdmin(e.target.checked) }
																	    />
															 </Form.Group>
														</Col>
													</Row>
													</>
												) }
											
												{ userInfo.isClientAdmin && (
													<>
														{/*<Form.Group className="mb-3" controlId='company'>
															<FloatingLabel controlId="floatingInput" label="Company Name" >
																<Form.Control 	type="company"  placeholder="Company Name"
																				value={userInfo.company} disabled															
																			/>
															</FloatingLabel>
														</Form.Group>

														<Form.Group controlId='isClientAdmin' className="mb-3">
															<Form.Label>Is the user a USER Admin?</Form.Label>
															<InputGroup >
																    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
																    						checked={isClientAdmin}
																    						onChange = { (e) => setisClientAdmin(e.target.checked) }
																     />
																 <FormControl aria-label="Text input with checkbox" />
															</InputGroup>
														</Form.Group>*/}
														<Row>
															<Col md={6}>
																
															</Col>
															<Col md={6}>
																<Form.Group controlId='gender' className="mb-3">
																		<FloatingLabel controlId="floatingSelect" label="Gender">
																			<Form.Control as='select' 
																				value={gender} 
																				onChange={(e) => setGender(e.target.value)}
																				required >
																					<option value=''>Select Gender</option>
																					<option value='Male'>Male</option>
																					<option value='Female'>Female</option>
																					<option value='Others'>Others</option>
																			</Form.Control>
																		</FloatingLabel>
																</Form.Group>
															</Col>
														</Row>									

														<Row>
															<Col md={4}>
																<Form.Group controlId='state'>
																	<FloatingLabel controlId="floatingSelect" label="Country">
																		<Form.Control as='select' value={country} className="mb-3"
																				onChange={(e) => {
																					setCountry(e.target.value)
																					callStateName(e.target.value)
																				}}
																				// required
																				>
																				<option value='option'>Select Country</option>
																				{countries.map(country => (
																					<option value={country.name}>{country.name}</option>
																				))  }
																			</Form.Control>
																		</FloatingLabel>
																</Form.Group>
															</Col>
															<Col md={4}>
																<Form.Group controlId='state'>
																	<FloatingLabel controlId="floatingSelect" label="State">
																		<Form.Control as='select' value={stateName} className="mb-3"
																				onChange={(e) => {
																					setStateName(e.target.value)
																					callCity(e.target.value)
																				}}
																				// required
																				>
																				<option value='option'>Select State</option>
																				{states.map(st => (
																					<option value={st.name}>{st.name}</option>
																				))  }
																			</Form.Control>
																		</FloatingLabel>
																</Form.Group>
															</Col>
															<Col md={4}>
																<Form.Group controlId='city'>
																	<FloatingLabel controlId="floatingSelect" label="City">
																		<Form.Control as='select' value={city} className="mb-3"
																			onChange={(e) => {setCity(e.target.value)}}
																			// required
																			>
																			<option value='option'>Select City</option>
																			{cities.map(city => (
																				<option value={city.name}>{city.name}</option>
																			))  }
																		</Form.Control>
																	</FloatingLabel>
																</Form.Group>
															</Col>
														</Row>
														<Row>
															<Col md={6}>
																<Form.Group className="mb-3" controlId='phone'>
																	<FloatingLabel controlId="floatingInput" label="Phone" >
																		<Form.Control 	type="number"  placeholder="9911223344"
																						className={`${phoneErr.length>1 ? 'inCorrect' : null}`}
																						value={phone}
																						onChange = {(e)=> PH(e.target.value)}
																						onBlur = {(e) => valPhone(e.target.value)}
																						required
																						isInvalid={!!phoneErr}  
																					/>
																	</FloatingLabel>
																	{phoneErr.length>1 ? (<div className='errMsg'>{phoneErr}</div>): null}
																</Form.Group>
															</Col>
															<Col md={6}>
																<Form.Group className="mb-3" controlId='phone'>
																	<FloatingLabel controlId="floatingInput" label="Alternate Phone" >
																		<Form.Control 	type="number"  placeholder="9911223344"
																						className={`${phoneErr.length>1 ? 'inCorrect' : null}`}
																						value={alternatePhone}
																						onChange = {(e)=> APH(e.target.value)}
																						onBlur = {(e) => valAlternatePhone(e.target.value)}
																						required
																						isInvalid={!!alternatePhoneErr}  
																					/>
																	</FloatingLabel>
																	{alternatePhoneErr.length>1 ? (<div className='errMsg'>{alternatePhoneErr}</div>): null}
																</Form.Group>
															</Col>
														</Row>
														<Row>
															<Col md={6}>
																<Form.Group className="mb-3" controlId='pincode'>
																	<FloatingLabel controlId="floatingInput" label="Pincode" >
																		<Form.Control 	type="number"  placeholder="012345"
																						className={`${pinErr.length>1 ? 'inCorrect' : null}`}
																						value={pincode}
																						onChange = {(e)=> ZP(e.target.value)}
																						onBlur = {(e) => valZip(e.target.value)}
																						required
																						isInvalid={!!pinErr}  
																					/>
																	</FloatingLabel>
																	{pinErr.length>1 ? (<div className='errMsg'>{pinErr}</div>): null}
																</Form.Group>
															</Col>
															<Col md={6}>
																<Form.Group className="mb-3" controlId='dob'>
																	<FloatingLabel controlId="floatingInput" label="DOB" >
																		<Form.Control 	type="date"  placeholder="dob"
																						value={dob}
																						onChange = {(e)=> setDob(e.target.value)}
																						required
																					/>
																	</FloatingLabel>
																</Form.Group>
															</Col>
														</Row>

														<Form.Group className='mb-3'>
															<FloatingLabel controlId="floatingTextarea2" label="Address">
															    <Form.Control
															      as="textarea"
															      placeholder="Address"
															      style={{ height: '100px' }}
															      value={address} 
																  onChange={(e) => setAddress(e.target.value)}
																  required
															    />
															</FloatingLabel>
														</Form.Group>
													</>
												)}
										
									</Form>
								</div>
							</Col>
						</Row>
						
				) }
				
			</div>
		</>
	)
}



export default UserEditScreen


