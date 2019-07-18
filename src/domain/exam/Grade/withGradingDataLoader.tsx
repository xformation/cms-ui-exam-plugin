import { RouteComponentProps } from 'react-router-dom';
import { graphql, QueryProps } from "react-apollo";
import * as TypeOfGradingsGql from './TypeOfGradings.graphql';
import {ReactFunctionOrComponentClass, TypeOfGradings} from '../../types';
import withLoadingHandler from '../../../components/withLoadingHandler';

type withFeeSetupPageDataLoaderProps = RouteComponentProps<{
  branchId: string;
  academicYearId:  string;
  }>;

type TargetComponentProps = {
    data: QueryProps & TypeOfGradings ;
};

const withGradingDataLoader = (TargetComponent: ReactFunctionOrComponentClass<TargetComponentProps>) => {
    return graphql<TypeOfGradings, withFeeSetupPageDataLoaderProps, TargetComponentProps>(TypeOfGradingsGql, {
      options: ({ match }) => ({
        variables: {
          // branchId: 1851,
          // academicYearId: 1701
        }
      })
    })(withLoadingHandler(TargetComponent));
};

export default withGradingDataLoader 


