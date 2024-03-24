import { default as React } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
// Import necessary Bootstrap classes
import { Card, Col, Container, Row } from 'react-bootstrap';

const HomePage = () => {


return (
  <div>
    <Helmet>
      <title>Home Page</title>
    </Helmet>

    <Container className="my-5 py-3">
      <Row>
        <Col xs={12} className="text-center mb-5">
          <h1 className="display-4 fw-bold">Welcome to the Home Page!</h1>
          <p className="lead">This is the home page of our application.</p>
        </Col>

        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="shadow-sm">
            {/* ... (Image card content) */}
            <Card.Body>
                <Card.Title className="h5">Images Page</Card.Title>
                <Card.Text>View and manage images.</Card.Text>
                <Link to="/images" className="btn btn-primary">Go to Images</Link>
              </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="shadow-sm">
            {/* ... (Users card content) */}
            <Card.Body>
                <Card.Title className="h5">Users Page</Card.Title>
                <Card.Text>View and manage users.</Card.Text>
                <Link to="/users" className="btn btn-primary">Go to Users</Link>
              </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-4">
          <Card className="shadow-sm">
            {/* ... (Users card content) */}
            <Card.Body>
                <Card.Title className="h5">Notes Page</Card.Title>
                <Card.Text>Make Notes.</Card.Text>
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
