import { useDispatch } from 'react-redux';
import { requestDataFailure, requestDataSuccess } from '../store/companies/companies.actions';
import { ApolloError, LazyQueryExecFunction, OperationVariables, useLazyQuery } from '@apollo/client';
import { GET_TABLE_QUERY } from '../components/GraphQL/graphqlQueries';
import { localStorageType } from '../enums/localStorage';
import { CellNameType } from '../enums/cellNameType';

type IData = Record<CellNameType, string | null | string[] | Record<CellNameType, string | number | null>>;

export const useLazyTableQuery = (): {
    data: IData;
    loading: boolean;
    error: ApolloError | undefined;
    getTableData: LazyQueryExecFunction<any, OperationVariables>;
} => {
    const dispatch = useDispatch();
    const token = localStorage.getItem(localStorageType.TOKEN);

    const [getTableData, { data, loading, error }] = useLazyQuery(GET_TABLE_QUERY, {
        onError: () => {
            dispatch(requestDataFailure());
        },
        onCompleted: (response) => {
            dispatch(
                requestDataSuccess(
                    response.organisations.map((organisation) => {
                        const updatedOrganisation = { ...organisation, ...organisation.metrics };
                        delete updatedOrganisation.metrics;
                        return updatedOrganisation;
                    }),
                    1,
                    response?.total || response.organisations.length
                )
            );
        },
        context: {
            headers: { authorization: `Bearer ${token}` },
        },
    });

    return { getTableData, data, loading, error };
};
