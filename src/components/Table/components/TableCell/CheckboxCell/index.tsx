import React, { useCallback, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import { toggleExportCompany, toggleExportAllCompany } from '../../../../../store/companies/companies.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesDataIds, getDataForExport, getIsSelectedAllDataForExport } from '../../../../../store/companies/companies.selectors';

interface IProps {
    id?: string;
    isSelectedAll?: boolean;
}

const CheckboxCell: React.FC<IProps> = ({ id, isSelectedAll }) => {
    const dispatch = useDispatch();
    const dataForExport = useSelector(getDataForExport);
    const companiesIds = useSelector(getCompaniesDataIds);
    const isSelectedAllDataForExport = useSelector(getIsSelectedAllDataForExport);

    const onChange = useCallback(
        (e) => {
            if (isSelectedAll) {
                dispatch(toggleExportAllCompany(companiesIds, e.target.checked));
            } else if (id) {
                dispatch(toggleExportCompany(id, e.target.checked, companiesIds));
            }
        },
        [id, isSelectedAll, companiesIds]
    );

    const checked = isSelectedAll ? companiesIds.length && companiesIds.length === dataForExport.length : dataForExport.find((item) => item.id === id)?.id;

    useEffect(() => {
        if (isSelectedAll && isSelectedAllDataForExport && companiesIds.length !== dataForExport.length) {
            dispatch(toggleExportAllCompany(companiesIds, true));
        }
    }, [companiesIds]);

    return <Checkbox onChange={onChange} checked={!!checked} />;
};

export default React.memo(CheckboxCell);
