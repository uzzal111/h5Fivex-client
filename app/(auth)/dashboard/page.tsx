import React from 'react';
import BannerSlider from '@/components/ui/home/BannerSlider';
import Navigation from '@/components/ui/auth/navigation';
import TaskRecordComponent from '@/components/ui/home/taskrecord';
import Partners from '@/components/ui/home/Partners';
import HomeFooter from '@/components/ui/home/Fotter';

const DashboardPage = () => {
	return (
		<div>
			
			<BannerSlider></BannerSlider>
			<Navigation></Navigation>
			<TaskRecordComponent></TaskRecordComponent>
			<Partners></Partners>
			<HomeFooter></HomeFooter>
			</div>
		
	);
};

export default DashboardPage;
