import * as React from 'react';

import {AcExamSettingDetailsFragment} from '../../types';
import withAcExamSettingFromRouteParams from '../withAcExamSettingFromRouteParams';

import ExamDetailsTable from './ExamDetailsTable';

const ExamDetailsPage = ({acExamSetting}: {acExamSetting: AcExamSettingDetailsFragment}) => (
  <span>
    <ExamDetailsTable acExamSetting={acExamSetting} />
  </span>
);

export default withAcExamSettingFromRouteParams(ExamDetailsPage);
