import { default as React, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
// Import necessary Bootstrap classes
import { Card, Col, Container, Row } from 'react-bootstrap';

const HomePage = () => {
  // Import your weather API provider code here
  const [weatherData, setWeatherData] = useState(null);

  // useEffect(() => {
  //   // Fetch weather data on component mount
  //   fetchWeatherData() // Call your weather API function here
  //     .then((data) => setWeatherData(data))
  //     .catch((error) => console.error(error));
  // }, []);

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

        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="h5">Weather</Card.Title>
              {/* Display fetched weather data here */}
              {weatherData ? (
                <div>
                  <p>
                    <i className="bi bi-thermometer-fill"></i> {weatherData.temperature}°C
                  </p>
                  <p>
                    <i className="bi bi-cloud-fill"></i> {weatherData.weatherDescription}
                  </p>
                  {/* Add more weather details as needed */}
                </div>
              ) : (
                <p>Loading weather...</p>
              )}
            </Card.Body>
            <Card.Footer className="text-muted">
              <i className="bi bi-geo-alt-fill me-2"></i> Your location
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);
};
export default HomePage;
