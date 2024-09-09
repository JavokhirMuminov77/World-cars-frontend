import { PropertyTypes, PropertyStatus, PropertyType } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	propertyStatus?: PropertyStatus;
	propertyTypes?: PropertyTypes;
	propertyAddress?: string;
	propertyTitle?: string;
	propertyPrice?: number;
	propertySize?: number;
	// propertyBeds?: number;
	propertySeat?: number;
	propertyImages?: string[];
	propertyDesc?: string;
	propertyBarter?: boolean;
	propertyRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
