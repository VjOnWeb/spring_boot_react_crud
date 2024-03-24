import { faImage, faStickyNote, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { default as React } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ background: 'linear-gradient(to bottom right, #4e54c8, #8f94fb)', minHeight: '100vh', paddingTop: '50px' }}>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Container className="my-5 py-3">
        <Row>
          <Col xs={12} className="text-center mb-5">
            <h1 className="display-4 fw-bold text-white">Welcome to the Home Page!</h1>
            <p className="lead text-white">This is the home page of our application. Explore the features below.</p>
          </Col>

          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                  <FontAwesomeIcon icon={faImage} size="3x" className="me-3 text-primary" />
                  <div>
                    <Card.Title className="h5 text-primary">Images Page</Card.Title>
                    <Card.Text>View and manage images.</Card.Text>
                  </div>
                </div>
                <Link to="/images" className="btn btn-primary">Go to Images</Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                  <FontAwesomeIcon icon={faUsers} size="3x" className="me-3 text-primary" />
                  <div>
                    <Card.Title className="h5 text-primary">Users Page</Card.Title>
                    <Card.Text>View and manage users.</Card.Text>
                  </div>
                </div>
                <Link to="/users" className="btn btn-primary">Go to Users</Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                  <FontAwesomeIcon icon={faStickyNote} size="3x" className="me-3 text-primary" />
                  <div>
                    <Card.Title className="h5 text-primary">Notes Page</Card.Title>
                    <Card.Text>Make Notes.</Card.Text>
                  </div>
                </div>
                <Link to="/notes" className="btn btn-primary">Go to Notes</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
