import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { screen } from '@folio/jest-config-stripes/testing-library/react';

import '../../test/jest/__mock__';

import { StripesContext } from '@folio/stripes/core';

import {
  renderWithIntl,
  translationsProperties,
  stripesStub,
} from '../../test/jest/helpers';
import { DataContext } from '../contexts';

import InstanceForm from './InstanceForm';

const mockInitialValues = {
  instanceTypeId: '',
  instanceFormatId: 'instanceFormatId',
  statisticalCodeId: 'statisticalCodeId',
  instanceSource: 'MARC',
  alternativeTitles: [''],
  publication: [{ publisher: '', dateOfPublication: '', place: '' }],
  languages: ['']
};

const mockReferenceTables = {
  instanceTypes: [{ id: 'instanceTypesId', name: 'instanceTypesId' }],
  instanceStatuses: [],
  modesOfIssuance: [{ id: 'modesOfIssuanceId', name: 'modesOfIssuanceId' }],
  statisticalCodes: [],
  instanceRelationshipTypes: [{ id: 'instanceRelationshipTypesId', name: 'instanceRelationshipTypesId' }],
  alternativeTitleTypes: [{ id: 'alternativeTitleTypesId', name: 'statisticalCodeId', code: 'alternativeTitleTypescode' }],
  identifierTypes: [],
  contributorNameTypes: [],
  contributorTypes: [],
  natureOfContentTerms: [],
  instanceFormats: [],
  instanceNoteTypes: [],
  electronicAccessRelationships: [],
  classificationTypes: []
};

const mockBlockedFields = [
  'shelvingTitle',
];

const mockResources = {
  instanceBlockedFields: {
    hasLoaded: true,
    records: [{
      blockedFields: mockBlockedFields,
    }],
  },
};

const mockItemCount = 0;
const mockGoTo = jest.fn();

const mockOnSubmit = jest.fn();
const mockOnCancel = jest.fn();
const mockInstance = jest.fn();

const queryClient = new QueryClient();

const InstanceFormSetUp = (props = {}) => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <StripesContext.Provider value={stripesStub}>
        <DataContext.Provider value={{
          contributorTypes: [],
          instanceFormats: [],
          modesOfIssuance: [],
          natureOfContentTerms: [],
          tagsRecords: [],
        }}
        >
          <InstanceForm
            initialValues={mockInitialValues}
            onSubmit={mockOnSubmit}
            onCancel={mockOnCancel}
            instance={mockInstance}
            referenceTables={mockReferenceTables}
            itemCount={mockItemCount}
            goTo={mockGoTo}
            isMARCRecord
            resources={mockResources}
            {...props}
          />
        </DataContext.Provider>
      </StripesContext.Provider>
    </QueryClientProvider>
  </Router>
);

const defaultprops = {
  onCancel: jest.fn(),
  handleSubmit: jest.fn(),
  pristine: 'false',
  submitting: 'false',
  history: {},
  httpError: {},
  id: 'InstanceForm Id'
};

const renderInstanceForm = (props = {}) => renderWithIntl(
  <InstanceFormSetUp {...props} {...defaultprops} />,
  translationsProperties
);

describe('InstanceForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render form', () => {
    const { container } = renderInstanceForm();
    expect(container.querySelectorAll('form').length).toEqual(1);
  });

  describe('render component function', () => {
    it('components should render correctly', () => {
      renderInstanceForm();
      expect(screen.getByRole('group', { name: 'Alternative titles' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Series statements' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Preceding titles' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Succeeding titles' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Identifiers' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Contributors' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Publications' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Editions' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Physical descriptions' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Nature of content' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Formats' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Languages' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Publication frequency' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Publication range' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Notes' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Electronic access' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Classification' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Child instances' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Parent instances' })).toBeInTheDocument();
    });
  });
});
