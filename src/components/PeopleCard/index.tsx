import React from 'react';
import { IClasses, useStyles } from './style';
import { IEducationPeopleCardsType, IPeopleCardsContentType } from '../../pages/Company/helpers';
import unknown from '../../Icons/PeopleCardIcons/unknown.svg';
import Close from '../../Icons/PeopleCardIcons/Close.svg';
import LinkedInOn from '../../Icons/PeopleCardIcons/LinkedInOn.svg';
import LinkedInOff from '../../Icons/PeopleCardIcons/LinkedInOff.svg';
import TwitterLogo from '../../Icons/PeopleCardIcons/Twitter-Logo.svg';
import CardDescription from '../CardDescription';

interface IProps {
    content: IPeopleCardsContentType;
}

const withoutEducation: IEducationPeopleCardsType[] = [
    {
        id: 0,
        icon: Close,
        edInstitution: 'No work experience found',
    },
    {
        id: 1,
        icon: Close,
        edInstitution: 'No education found',
    },
];

const PeopleCard: React.FC<IProps> = ({ content }) => {
    const classes: IClasses = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.grid}>
                <div className={classes.photoContainer}>
                    <img className={classes.photo} src={content?.photo || unknown} alt="photo" />
                    <div className={classes.phoneNumber}>{content?.phoneNumber || 'No phone found'}</div>
                    <div className={classes.email}>{content?.email || 'No email found'}</div>
                </div>
                <div>
                    <div>
                        <div className={classes.name}>{content?.name || 'Founder Without Info'}</div>
                        <div className={classes.position}>{content?.position || 'No title found'}</div>
                    </div>
                    <div className={classes.educations}>
                        {content?.education
                            ? content.education.map((item) => (
                                  <div key={item.id} className={classes.education}>
                                      <img className={classes.educationIcon} src={item.icon} alt="icon" />
                                      <div className={classes.educationText}>{item.edInstitution}</div>
                                  </div>
                              ))
                            : withoutEducation.map((item) => (
                                  <div key={item.edInstitution} className={classes.withoutEducationText}>
                                      <img className={classes.educationIcon} src={item.icon} alt="icon" />
                                      <div className={classes.educationText}>{item.edInstitution}</div>
                                  </div>
                              ))}
                    </div>
                    {content.list && <CardDescription descriptionList={content.list} />}
                </div>
            </div>
            {content?.tags?.length !== 0 && (
                <div className={classes.tags}>
                    {content.tags?.map((item) => (
                        <div className={classes.tag} key={item}>
                            {item}
                        </div>
                    ))}
                </div>
            )}
            <div className={classes.social}>
                {content?.social ? (
                    <>
                        <img src={TwitterLogo} alt="twitter" />
                        <img src={LinkedInOn} alt="LinkedIn" />
                    </>
                ) : (
                    <img src={LinkedInOff} alt="LinkedIn" />
                )}
            </div>
        </div>
    );
};

export default React.memo(PeopleCard);
