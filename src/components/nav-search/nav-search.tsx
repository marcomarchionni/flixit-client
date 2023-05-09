import React from 'react';
import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

interface NavSearchProps {
  handleSearch: (query: string) => void;
}

const NavSearch = ({ handleSearch }: NavSearchProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <Form className="d-flex px-2 my-2" onSubmit={handleSubmit}>
      <InputGroup className="search-input-group">
        <Form.Control
          id="search"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          id="search-button"
          variant="outline-dark"
          type="submit"
          className="bg-white border border-start-0 ms-n5"
        >
          <Search className="bi" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NavSearch;
