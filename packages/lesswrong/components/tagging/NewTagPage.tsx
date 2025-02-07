import React from 'react';
import { registerComponent, Components, getFragment } from '../../lib/vulcan-lib';
import { useNavigation } from '../../lib/routeUtil'
import { useCurrentUser } from '../common/withUser';
import { Tags } from '../../lib/collections/tags/collection';
import { tagGetUrl } from '../../lib/collections/tags/helpers';
import { taggingNameCapitalSetting, taggingNamePluralSetting } from '../../lib/instanceSettings';

const NewTagPage = () => {
  const { history } = useNavigation();
  const currentUser = useCurrentUser();
  const { SingleColumnSection, SectionTitle, WrappedSmartForm } = Components;
  
  if (!currentUser) {
    return (
      <SingleColumnSection>
        <SectionTitle title={`New ${taggingNameCapitalSetting.get()}`}/>
        <div>
          You must be logged in to define new {taggingNamePluralSetting.get()}.
        </div>
      </SingleColumnSection>
    );
  }
  
  return (
    <SingleColumnSection>
      <SectionTitle title={`New ${taggingNameCapitalSetting.get()}`}/>
      <WrappedSmartForm
        collection={Tags}
        mutationFragment={getFragment('TagFragment')}
        successCallback={tag => {
          history.push({pathname: tagGetUrl(tag)});
        }}
      />
    </SingleColumnSection>
  );
}

const NewTagPageComponent = registerComponent('NewTagPage', NewTagPage);

declare global {
  interface ComponentTypes {
    NewTagPage: typeof NewTagPageComponent
  }
}
