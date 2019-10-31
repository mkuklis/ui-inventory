import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Accordion,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import {
  CheckboxFilter,
  MultiSelectionFilter,
} from '@folio/stripes/smart-components';

import languages from '../../data/languages';

export default class InstanceFilters extends React.Component {
  static propTypes = {
    activeFilters: PropTypes.objectOf(PropTypes.array),
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    data: PropTypes.object,
  };

  static defaultProps = {
    activeFilters: {},
    data: {
      locations: [],
      resourceTypes: [],
    },
  }

  render() {
    const {
      activeFilters: {
        location = [],
        resource = [],
        language = [],
        discoverySuppress = [],
        staffSuppress = [],
      },
      data: {
        resourceTypes,
        locations,
      },
      onChange,
      onClear,
    } = this.props;

    const resourceTypeOptions = resourceTypes.map(({ name, id }) => ({
      label: name,
      value: id,
    }));

    const locationOptions = locations.map(({ name, id }) => ({
      label: name,
      value: id,
    }));

    const suppressedOptions = [
      {
        label: <FormattedMessage id="ui-inventory.yes" />,
        value: 'true',
      },
      {
        label: <FormattedMessage id="ui-inventory.no" />,
        value: 'false',
      }
    ];

    return (
      <React.Fragment>
        <Accordion
          label={<FormattedMessage id="ui-inventory.instances.location" />}
          id="location"
          name="location"
          header={FilterAccordionHeader}
          displayClearButton={location.length > 0}
          onClearFilter={() => onClear('location')}
        >
          <CheckboxFilter
            name="location"
            dataOptions={locationOptions}
            selectedValues={location}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          label={<FormattedMessage id="ui-inventory.instances.resourceType" />}
          id="resource"
          name="resource"
          closedByDefault
          header={FilterAccordionHeader}
          displayClearButton={resource.length > 0}
          onClearFilter={() => onClear('resource')}
        >
          <CheckboxFilter
            name="resource"
            dataOptions={resourceTypeOptions}
            selectedValues={resource}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          label={<FormattedMessage id="ui-inventory.instances.language" />}
          id="language"
          name="language"
          separator={false}
          closedByDefault
          header={FilterAccordionHeader}
          displayClearButton={language.length > 0}
          onClearFilter={() => onClear('language')}
        >
          <MultiSelectionFilter
            name="language"
            dataOptions={languages.selectOptions()}
            selectedValues={language}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          label={<FormattedMessage id="ui-inventory.staffSuppress" />}
          id="staffSuppress"
          name="staffSuppress"
          closedByDefault
          header={FilterAccordionHeader}
          displayClearButton={staffSuppress.length > 0}
          onClearFilter={() => onClear('staffSuppress')}
        >
          <CheckboxFilter
            name="staffSuppress"
            dataOptions={suppressedOptions}
            selectedValues={staffSuppress}
            onChange={onChange}
          />
        </Accordion>
        <Accordion
          label={<FormattedMessage id="ui-inventory.discoverySuppress" />}
          id="discoverySuppress"
          name="discoverySuppress"
          closedByDefault
          header={FilterAccordionHeader}
          displayClearButton={discoverySuppress.length > 0}
          onClearFilter={() => onClear('discoverySuppress')}
        >
          <CheckboxFilter
            name="discoverySuppress"
            dataOptions={suppressedOptions}
            selectedValues={discoverySuppress}
            onChange={onChange}
          />
        </Accordion>
      </React.Fragment>
    );
  }
}
