import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';
import { IntlConsumer } from '@folio/stripes/core';
import { getSourceSuppressor } from '@folio/stripes/util';

import { RECORD_SOURCE } from '../constants';

class ModesOfIssuanceSettings extends React.Component {
  static propTypes = {
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
    const hasPerm = this.props.stripes.hasPerm('ui-inventory.settings.modes-of-issuance');
    const suppress = getSourceSuppressor([
      RECORD_SOURCE.RDA_MODE_ISSUE,
      RECORD_SOURCE.CONSORTIUM,
    ]);

    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            {...this.props}
            baseUrl="modes-of-issuance"
            records="issuanceModes"
            label={<FormattedMessage id="ui-inventory.modesOfIssuance" />}
            labelSingular={intl.formatMessage({ id: 'ui-inventory.modeOfIssuance' })}
            objectLabel={<FormattedMessage id="ui-inventory.modesOfIssuance" />}
            visibleFields={['name', 'source']}
            columnMapping={{
              name: intl.formatMessage({ id: 'ui-inventory.name' }),
              source: intl.formatMessage({ id: 'ui-inventory.source' }),
            }}
            readOnlyFields={['source']}
            itemTemplate={{ source: 'local' }}
            hiddenFields={['description', 'numberOfObjects']}
            nameKey="name"
            // columnWidths={{ 'name': 300, 'code': 50 }}
            actionSuppressor={{ edit: suppress, delete: suppress }}
            id="modes-of-issuance"
            sortby="name"
            editable={hasPerm}
          />
        )}
      </IntlConsumer>
    );
  }
}

export default ModesOfIssuanceSettings;
