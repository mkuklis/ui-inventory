import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ControlledVocab } from '@folio/stripes/smart-components';
import { IntlConsumer } from '@folio/stripes/core';
import { getSourceSuppressor } from '@folio/stripes/util';

import { RECORD_SOURCE } from '../constants';

const suppress = getSourceSuppressor(RECORD_SOURCE.CONSORTIUM);
const actionSuppressor = { edit: suppress, delete: suppress };

class InstanceNoteTypesSettings extends React.Component {
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
    const hasPerm = this.props.stripes.hasPerm('ui-inventory.settings.instance-note-types');

    return (
      <IntlConsumer>
        {intl => (
          <this.connectedControlledVocab
            {...this.props}
            baseUrl="instance-note-types"
            records="instanceNoteTypes"
            label={<FormattedMessage id="ui-inventory.instanceNoteTypes" />}
            labelSingular={intl.formatMessage({ id: 'ui-inventory.instanceNoteType' })}
            objectLabel={<FormattedMessage id="ui-inventory.instanceNoteTypes" />}
            visibleFields={['name', 'source']}
            columnMapping={{
              name: intl.formatMessage({ id: 'ui-inventory.name' }),
              source: intl.formatMessage({ id: 'ui-inventory.source' }),
            }}
            actionSuppressor={actionSuppressor}
            readOnlyFields={['source']}
            itemTemplate={{ source: 'local' }}
            hiddenFields={['description', 'numberOfObjects']}
            nameKey="name"
            id="instanceNoteTypes"
            sortby="name"
            editable={hasPerm}
          />
        )}
      </IntlConsumer>
    );
  }
}

export default InstanceNoteTypesSettings;
