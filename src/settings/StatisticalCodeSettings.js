import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';
import { Select } from '@folio/stripes/components';
import { IntlConsumer } from '@folio/stripes/core';
import { getSourceSuppressor } from '@folio/stripes/util';

import { RECORD_SOURCE } from '../constants';
import validateNameAndCode from './validateNameAndCode';

const suppress = getSourceSuppressor(RECORD_SOURCE.CONSORTIUM);
const actionSuppressor = { edit: suppress, delete: suppress };

export const validate = (item, index, items) => {
  const errors = validateNameAndCode(item);

  // if code/name has been entered, check to make sure the value is unique
  if (item.code) {
    const codes = items.map(({ code }) => code);
    const count = codes.filter(x => x === item.code).length;

    if (count > 1) {
      errors.code = <FormattedMessage id="ui-inventory.uniqueCode" />;
    }
  }

  if (item.name) {
    const names = items.map(({ name }) => name);
    const count = names.filter(x => x === item.name).length;
    if (count > 1) {
      errors.name = <FormattedMessage id="ui-inventory.uniqueName" />;
    }
  }

  if (!item.statisticalCodeTypeId) {
    errors.statisticalCodeTypeId = <FormattedMessage id="ui-inventory.selectToContinue" />;
  }
  return errors;
};

class StatisticalCodeSettings extends React.Component {
  static manifest = Object.freeze({
    statisticalCodeTypes: {
      type: 'okapi',
      path: 'statistical-code-types',
      records: 'statisticalCodeTypes',
      shouldRefresh: () => true,
      throwErrors: false,
      GET: {
        path: 'statistical-code-types?query=cql.allRecords=1 &limit=500'
      }
    },
  });

  static propTypes = {
    resources: PropTypes.shape({
      statisticalCodeTypes: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      hasPerm: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const statisticalCodeTypes = _.get(this.props.resources, ['statisticalCodeTypes', 'records'], []);
    const statisticalCodeTypesOptions = (statisticalCodeTypes)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(statisticalCodeType => (
        <option
          key={statisticalCodeType.id}
          value={statisticalCodeType.id}
        >
          {statisticalCodeType.name}
        </option>
      ));

    const fieldComponents = {
      'statisticalCodeTypeId': ({ fieldProps }) => (
        <Field
          {...fieldProps}
          component={Select}
          marginBottom0
          fullWidth
        >
          <FormattedMessage id="ui-inventory.selectStatisticalCode">
            {([message]) => <option value="">{message}</option>}
          </FormattedMessage>
          {statisticalCodeTypesOptions}
        </Field>
      )
    };

    const formatter = {
      'statisticalCodeTypeId': (item) => {
        const record = _.isArray(statisticalCodeTypes)
          ? statisticalCodeTypes.find(element => element.id === item.statisticalCodeTypeId)
          : null;
        return record
          ? <p>{record.name}</p>
          : null;
      }
    };

    const hasPerm = this.props.stripes.hasPerm('ui-inventory.settings.statistical-codes');

    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            stripes={this.props.stripes}
            baseUrl="statistical-codes"
            records="statisticalCodes"
            formatter={formatter}
            fieldComponents={fieldComponents}
            label={<FormattedMessage id="ui-inventory.statisticalCodes" />}
            labelSingular={intl.formatMessage({ id: 'ui-inventory.statisticalCode' })}
            objectLabel={<FormattedMessage id="ui-inventory.statisticalCodes" />}
            visibleFields={['code', 'name', 'statisticalCodeTypeId', 'source']}
            columnMapping={{
              code: intl.formatMessage({ id: 'ui-inventory.statisticalCodes' }),
              name: intl.formatMessage({ id: 'ui-inventory.statisticalCodeNames' }),
              statisticalCodeTypeId: intl.formatMessage({ id: 'ui-inventory.statisticalCodeTypes' }),
              source: intl.formatMessage({ id: 'ui-inventory.source' }),
            }}
            actionSuppressor={actionSuppressor}
            readOnlyFields={['source']}
            itemTemplate={{ source: 'local' }}
            hiddenFields={['description', 'numberOfObjects']}
            nameKey="name"
            id="statistical-codes"
            sortby="code"
            validate={validate}
            editable={hasPerm}
          />
        )}
      </IntlConsumer>
    );
  }
}

export default StatisticalCodeSettings;
