/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Matias Alejandro Jara Martell Student ID: 151838232 Date: 2025-07-31
*  Vercel App (Deployed) Link: https://a6-web-app-git-main-matias-jaras-projects.vercel.app
********************************************************************************/

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid
        rounded
        alt="Metropolitan Museum of Art building in Central Park, NYC"
      />
      <br /><br />
      <Row>
        <Col lg={6}>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;,
            is the largest art museum in the Americas. Its permanent collection contains
            over two million works, divided among 17 curatorial departments.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge
            of Central Park on Manhattan&apos;s Upper East Side, is by area one of the world&apos;s
            largest art museums. For more information, visit the 
            {' '}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer">
              Wikipedia.
            </a>
          </p>
        </Col>
      </Row>
    </>
  );
}