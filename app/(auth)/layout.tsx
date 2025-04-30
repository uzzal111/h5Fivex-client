import React from 'react';
import AuthFooter from '@/components/ui/auth/foternavbar';
import AuthNavbar from '@/components/ui/auth/authnavbar';


const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className=''>
			<AuthNavbar></AuthNavbar>
			
			<div className='py-[0.09rem] min-h-screen '>{children}</div>
			<footer className='bg-gray-800 text-white py-4 text-center'>
				<AuthFooter></AuthFooter>
			</footer>
		</div>
	);
};

export default AuthLayout;
