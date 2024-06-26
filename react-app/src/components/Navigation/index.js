import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import OpenModalButton from '../OpenModalButton';
import LocationFormModal from '../LocationFormModal';
import ProfileButton from './ProfileButton';
import BagButton from './BagButton';

import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const location = useSelector(state => state.session.location)

	return (
		<ul className='nav-container'>
			<li id="crittr-logo">
				<NavLink exact to="/">
					<i className="fa-solid fa-shop" />
					CRITTR
				</NavLink>
			</li>
			<li>
			<OpenModalButton
				buttonText={<>
				<i className="fa-solid fa-location-dot" style={{marginRight: "8px"}}/>
				<span className='overflow-cutoff' >
						{location?.address || "Enter Your Address"}
				</span>
				</>}
				className={"light-button location-update-button"}
				modalComponent={<LocationFormModal type={"temp"}/>}
			/>
			</li>
			<li></li>
			{isLoaded && (
			<li id='nav-buttons'>
				<div>
					<BagButton user={sessionUser} />
				</div>
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			</li>
			)}
		</ul>
	);
}

export default Navigation;
