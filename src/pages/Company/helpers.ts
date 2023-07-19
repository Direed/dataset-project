export interface ICardDescription {
    id: number;
    icon: string;
    isAim?: boolean;
    text: string;
}

export interface IOverviewCardContent {
    id: number;
    title: string;
    subtitle: JSX.Element;
    items: ICardDescription[];
}

export interface IFundingCardContent {
    id: number;
    date: string;
    stage: string;
    numberOfInvestors: number;
    moneyRaised: string;
    moneyRaisedM: string;
    leadInvestors: string;
}

export interface ICompanyInfo {
    title: string;
    info: IOverviewCardContent[] | IPeopleCardsContentType[] | IFundingCardContent[];
}

export interface IEducationPeopleCardsType {
    id: number;
    icon: string;
    edInstitution: string;
}

export interface IPeopleInformation {
    founders: string;
    experience: string[];
    serial: string;
}
export interface IFundingInformation {
    round: string;
    date: string;
    amount: string;
    lead: string[];
}

export interface IOverviewTitleData {
    people: IPeopleInformation;
    funding: IFundingInformation;
}

export interface people {
    founders: string;
    experience: string[];
    serial: string;
}
export interface funding {
    round: string;
    date: string;
    amount: string;
    lead: string[];
}

export interface IOverviewTitleData {
    people: people;
    funding: funding;
}

export interface people {
    founders: string;
    experience: string[];
    serial: string;
}
export interface funding {
    round: string;
    date: string;
    amount: string;
    lead: string[];
}

export interface IOverviewTitleData {
    people: people;
    funding: funding;
}

export interface IPeopleCardsContentType {
    id: number;
    name?: string;
    position?: string;
    phoneNumber?: string;
    photo?: string;
    email?: string;
    education?: IEducationPeopleCardsType[];
    list?: ICardDescription[];
    tags?: string[];
    social?: {
        twitter: {
            icon: string;
            link: string;
        };
        LinkedIn: {
            icon: string;
            link: string;
        };
    };
}
