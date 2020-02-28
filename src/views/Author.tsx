import '../components/Author/';
import React, { useEffect } from 'react';
import { Container, Spinner, Nav, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {
  AuthorPhoto,
  AuthorMap,
  AuthorInfo,
  AuthorTimeline,
  AuthorModalVideo,
  AuthorSlider,
  AuthorWorks,
} from '../components/Author/';
import { useSelector } from 'react-redux';
import { IStoreState, ISettingsState, IAuthorState } from 'Types';
import { useTranslation } from 'react-i18next';
import RedirectButton from '../components/RedirectButton';

const Author: React.FC = () => {
  const authorState: IAuthorState = useSelector(
    (store: IStoreState) => store.author
  );
  const settingsState: ISettingsState = useSelector(
    (store: IStoreState) => store.settings
  );
  const currentAuthorId: string = useSelector(
    (store: IStoreState) =>
      store.router.location.pathname.slice(8) || store.author.byId[0]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hasAuthor = authorState.byId.includes(currentAuthorId);
  const { byId, author, pending }: IAuthorState = authorState;
  const { language }: ISettingsState = settingsState;
  const { t } = useTranslation();

  if (!pending && !hasAuthor) return <Redirect to="../404" />;

  return (
    <Container className="content">
      <RedirectButton link="/list" text={t('backList')} />
      {pending ? (
        <Spinner className="spinner" animation="border" />
      ) : (
        byId.length && (
          <>
            <Row>
              <Col md="auto" className="author-page">
                <div className="author-page__img">
                  <AuthorPhoto
                    photo={author[currentAuthorId].photo}
                    name={author[currentAuthorId][language].name}
                  />
                </div>
                <div className="author-page__description">
                  <AuthorInfo
                    name={author[currentAuthorId][language].name}
                    years={author[currentAuthorId][language].years}
                    birthCity={author[currentAuthorId][language].birthCity}
                    description={author[currentAuthorId][language].description}
                  />
                  <AuthorModalVideo
                    videoId={author[currentAuthorId][language].video}
                  />
                </div>
              </Col>
            </Row>
            <AuthorTimeline
              author={author}
              id={currentAuthorId}
              language={language}
            />
            <div className="works-container">
              <AuthorWorks
                worksList={author[currentAuthorId][language].works}
              />
              <Col md="auto" className="slider-map">
                <AuthorSlider gallery={author[currentAuthorId].gallery} />
                <div className="map">
                  <AuthorMap
                    longitude={
                      author[currentAuthorId][language].location.longitude
                    }
                    latitude={
                      author[currentAuthorId][language].location.latitude
                    }
                  />
                </div>
              </Col>
            </div>
          </>
        )
      )}
    </Container>
  );
};

export default Author;
