import React from 'react';

const ProfilePage = () => {
	return (
		<div>
			<h1 className='text-2xl font-bold'>Profile Page</h1>
			<p className='text-gray-600'>This is the profile page.</p>
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<h2 className='text-xl font-semibold'>User Profile</h2>
				<p className='text-gray-500'>User details will be displayed here.</p>
			</div>
		</div>
	);
};

export default ProfilePage;
