import { PropertyTypes, PropertyStatus, PropertyType } from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface PropertyInput {
	propertyType: PropertyType;
	propertyTypes: PropertyTypes;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertySize: number;
	// propertyBeds: number;
	propertySeat: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertyBarter?: boolean;
	propertyRent?: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	sizeList: any;
	commentRefId: any;
	memberId?: string;
	typesList?: PropertyTypes[];
	typeList?: PropertyType[];
	seatList?: Number[];
	options?: string[];
	// bedsList?: Number[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	sizeRange?: Range;
	text?: string;
}

export interface PropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	propertyStatus?: PropertyStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	propertyStatus?: PropertyStatus;
	propertyTypes?: PropertyTypes[];
}

export interface AllPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
