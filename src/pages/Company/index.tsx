import React, { useCallback, useState } from 'react';
import { IClasses, useStyles } from './style';
import Header from '../../components/Header';
import NavMenu from '../../components/NavMenu';
import OverviewCard from '../../components/OverviewCard';
import PeopleCard from '../../components/PeopleCard';
import FundingCard from '../../components/FundingCard';

import location from '../../Icons/OverviewCardIcons/location.svg';
import users from '../../Icons/OverviewCardIcons/users.svg';
import building from '../../Icons/OverviewCardIcons/Building.svg';
import externalLink from '../../Icons/OverviewCardIcons/ExternalLink.svg';
import aim from '../../Icons/OverviewCardIcons/aim.svg';
import babyFace from '../../Icons/OverviewCardIcons/baby_baby_face_smile_emoji_kid.svg';
import maleSymbolGender from '../../Icons/OverviewCardIcons/male_symbol_gender_symbol_male_gender_sign_sign_symbol_mars.svg';
import openBook from '../../Icons/OverviewCardIcons/open_book.svg';
import map from '../../Icons/OverviewCardIcons/map.svg';
import euro from '../../Icons/OverviewCardIcons/euro.svg';
import officeBag from '../../Icons/OverviewCardIcons/office_bag.svg';
import menu from '../../Icons/OverviewCardIcons/Menu.svg';
import bank from '../../Icons/OverviewCardIcons/bank.svg';
import start from '../../Icons/OverviewCardIcons/start.svg';
import clock from '../../Icons/OverviewCardIcons/clock.svg';
import next from '../../Icons/OverviewCardIcons/next.svg';
import Newspaper from '../../Icons/OverviewCardIcons/Newspaper.svg';
import registeredSymbol from '../../Icons/OverviewCardIcons/registeredSymbolTrademarkRegisteredSignRegistered.svg';
import cashCounter from '../../Icons/OverviewCardIcons/cashCounter.svg';
import Alarm from '../../Icons/OverviewCardIcons/Alarm.svg';
import partDiagram from '../../Icons/OverviewCardIcons/partDiagram.svg';

import eduMaximilian1 from '../../Icons/PeopleCardIcons/eduMaximilian1.png';
import eduStalf1 from '../../Icons/PeopleCardIcons/eduStalf1.png';
import eduStalf2 from '../../Icons/PeopleCardIcons/eduStalf2.png';
import ValentinStalfFace from '../../Icons/PeopleCardIcons/ValentinStalfFace.png';
import MaximilianTayenthal from '../../Icons/PeopleCardIcons/MaximilianTayenthal.png';
import eduMaximilian2 from '../../Icons/PeopleCardIcons/eduMaximilian2.png';
import TwitterLogo from '../../Icons/PeopleCardIcons/Twitter-Logo.svg';
import LinkedInOn from '../../Icons/PeopleCardIcons/LinkedInOn.svg';

import { CompanyTabType } from '../../enums/companyTabType';
import { ICompanyInfo, IOverviewCardContent, IPeopleCardsContentType, IFundingCardContent, IOverviewTitleData } from './helpers';
import { enumerableWordList } from '../../utils/enumerableWordList';

const CompanyPage: React.FC = () => {
    const classes: IClasses = useStyles();
    const data: IOverviewTitleData = {
        people: {
            founders: '3 Founders',
            experience: ['Finance', 'Strategy Consulting'],
            serial: '1 Serial Entrepreneu',
        },
        funding: {
            round: 'Series E',
            date: ' Oct 2021',
            amount: '€750M',
            lead: ['Coature', 'Third Point Ventures'],
        },
    };
    const overviewCardsContent = (data): IOverviewCardContent[] => [
        {
            id: 0,
            title: 'About',
            subtitle: <>N26 offers mobile banking solutions to customers in the European Union through its subsidiary.</>,
            items: [
                {
                    id: 1,
                    icon: location,
                    text: 'Berlin, Germany',
                },
                {
                    id: 2,
                    icon: users,
                    text: '3520',
                },
                {
                    id: 3,
                    icon: building,
                    text: 'FinTech',
                },
                {
                    id: 4,
                    icon: externalLink,
                    text: 'n26.com',
                },
                {
                    id: 5,
                    icon: start,
                    text: '2013.02.01',
                },
                {
                    id: 6,
                    icon: aim,
                    isAim: true,
                    text: '87',
                },
            ],
        },
        {
            id: 1,
            title: 'People',
            subtitle: (
                <>
                    The team consists of <span className={classes.boldText}>{data.people.founders}</span> with experience in{' '}
                    {enumerableWordList(data.people.experience)}. The team includes <span className={classes.boldText}>${data.people.serial}</span>.
                </>
            ),
            items: [
                {
                    id: 1,
                    icon: babyFace,
                    text: '35 years old',
                },
                {
                    id: 2,
                    icon: maleSymbolGender,
                    text: '100% males',
                },
                {
                    id: 3,
                    icon: openBook,
                    text: 'M.A. and Ph.D.',
                },
                {
                    id: 4,
                    icon: building,
                    text: '5 prior industries in total',
                },
                {
                    id: 5,
                    icon: start,
                    text: '2 founded companies on average',
                },
                {
                    id: 6,
                    icon: aim,
                    isAim: true,
                    text: '76',
                },
            ],
        },
        {
            id: 2,
            title: 'Funding',
            subtitle: (
                <>
                    The latest funding round was <span className={classes.boldText}>{data.funding.round}</span> in
                    <span className={classes.boldText}>{data.funding.date}</span> was raised and lead by {enumerableWordList(data.funding.lead)}.
                </>
            ),
            items: [
                {
                    id: 1,
                    icon: euro,
                    text: '€1.5B',
                },
                {
                    id: 2,
                    icon: officeBag,
                    text: 'Earlybird Venture Capital',
                },
                {
                    id: 3,
                    icon: menu,
                    text: 'Series E',
                },
                {
                    id: 4,
                    icon: bank,
                    text: '23 investors',
                },
                {
                    id: 5,
                    icon: map,
                    text: '5 countries',
                },
                {
                    id: 6,
                    icon: aim,
                    isAim: true,
                    text: '53',
                },
            ],
        },
    ];
    const peopleCardsContent: IPeopleCardsContentType[] = [
        {
            id: 1,
            name: 'Valentin Stalf',
            position: 'CEO & Founder',
            phoneNumber: '+49 12 738 2918',
            photo: ValentinStalfFace,
            email: 'valentin@n26.com',
            education: [
                {
                    id: 1,
                    icon: eduStalf1,
                    edInstitution: 'Deutsche Bank - Team Member - M&A (4 months)',
                },
                {
                    id: 2,
                    icon: eduStalf2,
                    edInstitution: 'University of St. Gallen - M.A. - Accounting & Finance',
                },
            ],
            list: [
                {
                    id: 1,
                    icon: babyFace,
                    text: '35 years old',
                },
                {
                    id: 2,
                    icon: clock,
                    text: '3 years professional experience (of which 2 years in startups)',
                },
                {
                    id: 3,
                    icon: officeBag,
                    text: '5 prior employers',
                },
                {
                    id: 4,
                    icon: start,
                    text: '2 started companies',
                },
                {
                    id: 5,
                    icon: euro,
                    text: '€37M total previous funding',
                },
                {
                    id: 6,
                    icon: next,
                    text: '1 prior major exit',
                },
            ],
            tags: ['#Serial Entrepreneur', '#Strategy Consulting', '#Finance'],
            social: {
                twitter: {
                    icon: TwitterLogo,
                    link: '#',
                },
                LinkedIn: {
                    icon: LinkedInOn,
                    link: '#',
                },
            },
        },
        {
            id: 2,
            name: 'Maximilian Tayenthal',
            position: 'Founder & Co-CEO',
            phoneNumber: '+49 13 475 5873',
            photo: MaximilianTayenthal,
            email: 'maximilian@n26.com',
            education: [
                {
                    id: 1,
                    icon: eduMaximilian1,
                    edInstitution: 'Vienna Insurence Group - Subsidiary Manager & Assistant to CFO (4 years)',
                },
                {
                    id: 2,
                    icon: eduMaximilian2,
                    edInstitution: 'University of Vienna - PhD. - Law',
                },
            ],
            list: [
                {
                    id: 1,
                    icon: babyFace,
                    text: '42 years old',
                },
                {
                    id: 2,
                    icon: clock,
                    text: '6 years professional experience (of which 4 months in startups)',
                },
                {
                    id: 3,
                    icon: officeBag,
                    text: '3 prior employers',
                },
                {
                    id: 4,
                    icon: openBook,
                    text: '6 degrees',
                },
                {
                    id: 5,
                    icon: registeredSymbol,
                    text: '2 patents',
                },
                {
                    id: 6,
                    icon: Newspaper,
                    text: '8 publications',
                },
            ],
            tags: ['#Management', '#Strategy Consulting'],
            social: {
                twitter: {
                    icon: TwitterLogo,
                    link: '#',
                },
                LinkedIn: {
                    icon: LinkedInOn,
                    link: '#',
                },
            },
        },
        {
            id: 3,
        },
    ];
    const peopleTeamSummaryContent = (data): IOverviewCardContent => ({
        id: 1,
        title: 'Team summary',
        subtitle: (
            <>
                The team consists of <span className={classes.boldText}>{data.people.founders}</span> with experience in{' '}
                {enumerableWordList(data.people.experience)}. The team includes <span className={classes.boldText}>${data.people.serial}</span>.
            </>
        ),
        items: [
            {
                id: 1,
                icon: babyFace,
                text: '35 and 42 years old',
            },
            {
                id: 2,
                icon: maleSymbolGender,
                text: '100% males',
            },
            {
                id: 3,
                icon: openBook,
                text: 'M.A. and Ph.D.',
            },
            {
                id: 4,
                icon: building,
                text: '5 prior industries in total',
            },
            {
                id: 5,
                icon: building,
                text: '3 years professional experience (of which 0.8 in startups)',
            },
            {
                id: 6,
                icon: start,
                text: '2 founded companies on average',
            },
            {
                id: 7,
                icon: start,
                text: '€37M total previous funding',
            },
            {
                id: 8,
                icon: start,
                text: '1 prior major exit',
            },
            {
                id: 9,
                icon: aim,
                isAim: true,
                text: '76',
            },
        ],
    });
    const FundingSummaryContent = (data): IOverviewCardContent => ({
        id: 1,
        title: 'Funding summary',
        subtitle: (
            <>
                The latest funding round was <span className={classes.boldText}>{data.funding.round}</span> in
                <span className={classes.boldText}>{data.funding.date}</span> was raised and lead by {enumerableWordList(data.funding.lead)}
            </>
        ),
        items: [
            {
                id: 1,
                icon: euro,
                text: '€1.5B',
            },
            {
                id: 2,
                icon: officeBag,
                text: 'Coature, Third Point Ventures',
            },
            {
                id: 3,
                icon: menu,
                text: 'Series E',
            },
            {
                id: 4,
                icon: bank,
                text: '23 investors',
            },
            {
                id: 5,
                icon: map,
                text: '5 countries',
            },
            {
                id: 6,
                icon: cashCounter,
                text: '€7B pre-money valuation',
            },
            {
                id: 7,
                icon: Alarm,
                text: '2 years between rounds',
            },
            {
                id: 8,
                icon: partDiagram,
                text: '60% founder ownership',
            },
            {
                id: 9,
                icon: aim,
                isAim: true,
                text: '53',
            },
        ],
    });
    const FundingContent: IFundingCardContent[] = [
        {
            id: 1,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 2,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 3,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 4,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 5,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 6,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 7,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 8,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 9,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 10,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 11,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 12,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 13,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
        {
            id: 14,
            date: '2021.10.18',
            stage: 'Series E',
            numberOfInvestors: 3,
            moneyRaised: '€775M',
            moneyRaisedM: '€30M',
            leadInvestors: 'Coatue, Third Point Ventures',
        },
    ];

    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const companyInfo: ICompanyInfo[] = [
        {
            title: CompanyTabType.OVERVIEW,
            info: overviewCardsContent(data),
        },
        {
            title: CompanyTabType.PEOPLE,
            info: peopleCardsContent,
        },
        {
            title: CompanyTabType.TRACTION,
            info: [],
        },
        {
            title: CompanyTabType.FUNDING,
            info: FundingContent,
        },
        {
            title: CompanyTabType.COMPETITORS,
            info: [],
        },
        {
            title: CompanyTabType.MARKET,
            info: [],
        },
    ];

    const tabContent = useCallback(
        (tab: string) => {
            switch (tab) {
                case CompanyTabType.OVERVIEW:
                    return (
                        <>
                            {overviewCardsContent(data).map((content) => (
                                <OverviewCard key={content.id} content={content} />
                            ))}
                        </>
                    );
                case CompanyTabType.PEOPLE:
                    return (
                        <>
                            <OverviewCard content={peopleTeamSummaryContent(data)} />
                            {peopleCardsContent.map((content) => (
                                <PeopleCard key={content.id} content={content} />
                            ))}
                        </>
                    );
                case CompanyTabType.FUNDING:
                    return (
                        <>
                            <OverviewCard content={FundingSummaryContent(data)} />
                            <FundingCard content={FundingContent} />
                        </>
                    );
                default:
                    return null;
            }
        },
        [classes, overviewCardsContent, peopleCardsContent]
    );

    return (
        <div>
            <div className={classes.header}>
                <Header onlyLogo />
            </div>
            <NavMenu activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} companyInfo={companyInfo} />
            <div className={classes.infoContainer}>
                {companyInfo[activeTabIndex]?.info?.length !== 0 ? (
                    <div className={classes.mainContent}>{tabContent(companyInfo[activeTabIndex].title)}</div>
                ) : (
                    <div className={classes.noContent}>No information</div>
                )}
            </div>
        </div>
    );
};

export default React.memo(CompanyPage);
