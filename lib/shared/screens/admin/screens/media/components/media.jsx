import Component from 'components/component';
import Content from 'components/content';
import ContentDisplays from 'components/content-displays';
import ContentHeader from 'components/content-header';
import ContentHeaderActions from 'components/content-header-actions';
import ContentSearch from 'components/content-search';
import Upload from 'components/upload';
import React, {PropTypes} from 'react';
import {mergeFragments} from 'relate-js';

import styles from './media.less';
import List from './list';

export default class Media extends Component {
  static fragments = mergeFragments(
    List.fragments,
    {
      mediaCount: 1
    }
  );

  static propTypes = {
    media: PropTypes.array.isRequired,
    mediaCount: PropTypes.number
  };

  render () {
    return (
      <div className={styles.holder}>
        {this.renderContent()}
      </div>
    );
  }

  renderContent () {
    const {mediaCount} = this.props;
    let result;
    if (mediaCount === 0) {
      result = this.renderNoContent();
    } else {
      result = this.renderHasContent();
    }
    return result;
  }

  renderNoContent () {
    return (
      <Upload clickable={false} infos>
        <div className={styles.none}>
          <div className={styles.noneContent}>
            <div className={styles.noneTitle}>
              You haven’t uploaded any media!
            </div>
            <div className={styles.noneText}>
              Just drag it into this window or click the upload button bellow.
            </div>
            <div className={styles.noneText}>
              Just worry about the upload, we’ll take care of categorizing it for you.
            </div>
            <Upload showInfos={false} className={styles.uploadButton}>
              <i className='nc-icon-outline arrows-1_cloud-upload-94'></i>
              <span>Upload</span>
            </Upload>
          </div>
        </div>
      </Upload>
    );
  }

  renderHasContent () {
    const {media} = this.props;
    return (
      <div>
        <ContentHeader>
          <ContentSearch value='' />
          <ContentHeaderActions>
            <ContentDisplays display='grid' />
          </ContentHeaderActions>
        </ContentHeader>
        <Content>
          <List media={media} />
        </Content>
      </div>
    );
  }
}
