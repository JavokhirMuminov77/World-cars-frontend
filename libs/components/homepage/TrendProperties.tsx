import React, { useState } from 'react';
import { Stack, Box, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Property } from '../../types/property/property';
import { PropertiesInquiry } from '../../types/property/property.input';
import TrendPropertyCard from './TrendPropertyCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';

interface TrendPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TrendProperties = (props: TrendPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProperties, setTrendProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
	const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTrendProperties(data?.getProperties?.list);
		},
	});
	/** HANDLERS **/
	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetProperty({
				variables: { input: id },
			});

			await getPropertiesRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('Error, likePropertyHandler', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (trendProperties) console.log('trendProperties: ++++', trendProperties);
	if (!trendProperties) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span style={{ color: '#20B2AA'}}>Trend Properties</span>
					</Stack>
					<Stack className={'card-box'}>
						{trendProperties.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendProperties.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>



				<Stack className={'mashinalar-qatori'}>
		         			<div className={'mashinalar'}>

		         					<div className={'chaptagi-mashina'}>

		         			<aside className={'layout-2-1-sidebar-item sidebar-ad-link'}>

                  <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{ width: '1000px', height: '756px', objectFit: 'cover',borderRadius: '50px' }}
                 >
                 <source src="/video/mecadess.mp4" type="video/mp4" />

                 </video>

                   </aside>
		         						</div>
		         						<div className={'chi-qator'}>
		         						<div className={'card '}>
		         							<div className={'card-textlari '}>
		         							<aside className={'layout-2-1-sidebar-item sidebar-ad-link'}>
                   <video className='videolar'
                   autoPlay
                   muted
                   loop
                   playsInline
                   preload="auto"
                   style={{ width: '293px', height: '250px', objectFit: 'cover', borderRadius: '50px' }}
                 >

                   <source src="/video/audi.mp4" type="video/mp4" />

                 </video>


                   </aside>
			          						</div>
			          						<div className={'card-textlari '}>
			          						<aside className={'layout-2-1-sidebar-item sidebar-ad-link'}>
                   <video className='videolar'
                   autoPlay
                   muted
                   loop
                   playsInline
                   preload="auto"
                   style={{ width: '293px', height: '250px', objectFit: 'cover', borderRadius: '50px'}}
                 >
                   <source src="/video/codillac.mp4" type="video/mp4" />
                 </video>

               </aside>
									</div>
									<div className={'card-textlari '}>
									<aside className={'layout-2-1-sidebar-item sidebar-ad-link'}>
                  <video className='videolar'
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{ width: '293px', height: '250px', objectFit: 'cover' ,borderRadius: '50px' }}
                >
                  <source src="/video/bmw.mp4" type="video/mp4" />
                </video>

                  </aside>
									</div>

								</div>

							</div>
						</div>

					</Stack>

					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span >Trend Properties</span>
							<p>Trend is based on likes</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<EastIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>






					<Stack className={'card-box'}>

						{trendProperties.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendProperties.map((property: Property) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'propertyLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendProperties;