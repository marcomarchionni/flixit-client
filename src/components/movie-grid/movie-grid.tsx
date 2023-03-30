import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AlertContent, Movie } from '../../interfaces/interfaces';
import { AlertBox } from '../alert-box/alert-box';
import MovieCard from '../cards/movie-card';
import Loading from '../loading/loading';

interface MovieGridProps {
  items: Movie[];
  isLoading: boolean;
  noItemsAlert: AlertContent;
}

const MovieGrid = ({ items, isLoading, noItemsAlert }: MovieGridProps) => {
  const [alert, setAlert] = useState<AlertContent | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      setAlert(noItemsAlert);
    } else {
      setAlert(null);
    }
  }, [items]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AlertBox alert={alert} onClose={() => setAlert(null)} />
      <Row className="justify-content-center">
        {items.map((movie) => (
          <Col key={movie._id} style={{ flex: '0  0 15rem' }} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MovieGrid;
