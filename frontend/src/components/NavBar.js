import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi'
import * as FcIcons from 'react-icons/fc'
import * as GrIcons from 'react-icons/gr'
import * as GiIcons from 'react-icons/gi'
import {Link} from 'react-router-dom'
// import { SideBarData } from './SideBarData'
import './NavBar.css'
import { IconContext } from 'react-icons';

const NavBar = () => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const logoutHandler = () => {
	  dispatch(logout())
	}

	const [sidebar, setSidebar] = useState(false)

	const showSidebar = () => setSidebar(!sidebar)


	return(
		<>
			<IconContext.Provider value={{ color: 'black' }}>
			<div className='nav-bar'>
				<Link to='#' className='menu-bars'>
					<FaIcons.FaBars onClick={showSidebar} />
				</Link>

				{/*{ userInfo && (
					<div id='username'><h3>{userInfo.user.name}</h3></div>
				)}*/}
			</div>
			{
				userInfo && (
					<>
						<nav className={sidebar ? 'nav-menu active': 'nav-menu' }>
							<ul className='nav-menu-items' onClick={showSidebar}>
								<li className='nav-bar-toggle'>
									<Link to='#' className='menu-bars'>
										<AiIcons.AiOutlineClose />
									</Link>
								</li>
								{
									(userInfo && userInfo.isAdmin) ? (
										<>
											<li className='nav-text'>
												<Link to='/profile'>
													<AiIcons.AiFillProfile />
													<span>{userInfo.name}</span>
												</Link>
											</li>
											<li className='nav-text'>
												<Link to='/'>
													<AiIcons.AiFillHome />
													<span>Home</span>
												</Link>
											</li>
											<li className='nav-text'>
												<Link to='/users'>
													<FiIcons.FiUsers />
													<span>Users</span>
												</Link>
											</li>
											<li className='nav-text' onClick={logoutHandler}>
												<GrIcons.GrLogout />
												<span>Logout</span>
											</li>
										</>
										)
									: (userInfo && userInfo.isClientAdmin) ? (
											<>
												<li className='nav-text'>
													<Link to='/profile'>
														<AiIcons.AiFillProfile />
														<span>{userInfo.name}</span>
													</Link>
												</li>
												<li className='nav-text'>
													<Link to='/'>
														<AiIcons.AiFillHome />
														<span>Home</span>
													</Link>
												</li>
												<li className='nav-text'>
													<Link to='/users'>
														<FiIcons.FiUsers />
														<span>Customers</span>
													</Link>
												</li>
												<li className='nav-text'>
													<Link to='/services'>
														<GrIcons.GrBusinessService />
														<span>Services</span>
													</Link>
												</li>
												<li className='nav-text'>
													<Link to='/frequency'>
														<GiIcons.GiLightningFrequency />
														<span>Frequencies</span>
													</Link>
												</li>
												<li className='nav-text'>
													<Link to='/sale'>
														<FcIcons.FcSalesPerformance />
														<span>Sale</span>
													</Link>
												</li>
												<li className='nav-text' onClick={logoutHandler}>
													<Link to='#'>
														<GrIcons.GrLogout />
														<span>Logout</span>
													</Link>
												</li>
											</>
										) : (
											<>
												<li className='nav-text'>
													<Link to='/profile'>
														<AiIcons.AiFillProfile />
														<span>{userInfo.name}</span>
													</Link>
												</li>
												<li className='nav-text'>
													<Link to='/'>
														<AiIcons.AiFillHome />
														<span>Home</span>
													</Link>
												</li>
												<li className='nav-text' onClick={logoutHandler}>
													<Link to='#'>
														<GrIcons.GrLogout />
														<span>Logout</span>
													</Link>
												</li>
											</>
										)
								}
								{/*{ 	




									SideBarData.map((item, index) => {
										return (
											<li key={index} className={item.cName}>
												<Link to={item.path}>
													{item.icon}
													<span>{item.title}</span>
												</Link>
											</li>
										)} )
								}*/}
							</ul>
						</nav>
					</>
					)
			}
			
			</IconContext.Provider>
		</>
		)
}


export default NavBar