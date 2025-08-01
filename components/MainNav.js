import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';

export default function MainNav() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  /*
  useEffect(() => {
    setToken(readToken());
  }, []);*/
  let token = readToken();

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchField.trim() !== '') {
      const queryString = `title=true&q=${encodeURIComponent(searchField)}`;
      
      router.push(`/artwork?${queryString}`);
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
      setSearchField(''); //Clear the search field after subbmission
      setIsExpanded(false); //Collapse the navbar after searchh
    }
  };

  return (
    <>
      <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-dark">
        <Container>
          <Navbar.Brand>Matias Jara</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/'}>Home</Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/search'}>Advanced Search</Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <>
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button type="submit" variant="outline-light">Search</Button>
                </Form>
                &nbsp;
                <Nav>
                  <NavDropdown title={token.userName} id="basic-nav-dropdown">
                    <Link href="/favourites" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === '/favourites'}>
                        Favourites
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/history" passHref legacyBehavior>
                      <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === '/history'}>
                        Search History
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </>
            )}

            {!token && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/register'}>Register</Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/login'}>Login</Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}