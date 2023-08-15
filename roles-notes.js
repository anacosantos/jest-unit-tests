

import {render, screen } from '@testing-libary/react';

function RoleExample() {
  return (
    <div>
    <a href="/">Link</a>
    <button>Button</button>
    <footer>Contentinfo</footer>
    <h1>Heading</h1>
    <header>Banner</header>
    <img alt="decription" /> Img
    <input type="checkbox" /> Checkbox
    <input type="number" /> Spinbutton
    <input type="radio" /> Radio
    <input type="text" /> Textbox
    <li>Listitem</li>
    <ul>Listgroup</ul>
    </div>
  );
}

render(<RoleExample />)

////////////////////////////////////////////////////////

test('can find elements by role', () =>{
  render(<RoleExample />);

  const roles = [
    'link',
    'button',
    'contentinfo',
    'heading',
    'banner',
    'img',
    'checkbox',
    'spinbutton',
    'radio',
    'textbox',
    'listitem',
    'list'
  ];

  for(let role of roles) {
    const el = screen.getByRole(role);
    expect(el).toBeInTheDocument();
  }
});

/////////////////////////////////////////////////////////////

function AccessibleName() {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
    </div>
  );
}

render(<AccessibleName />)

///////////////////////////////////////////////

test('can select by accessible name', () =>{
  render(<AccessibleName />);

  const submitButton = screen.getByRole('button', {
    name: /submit/i
  });

    const cancelButton = screen.getByRole('button', {
    name: /cancel/i
  });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
})

/////////////////////////////////////////////////

function MoreNames() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email"/>
      
      <label htmlFor="search">Search</label>
      <input id="search"/>
    </div>
  );
}

render(<MoreNames />)

//////////////////////////////////////////////

test('show an email and search input', () =>{
  render(<MoreNames />)

  const emailInput = screen.getByRole('textbox', {
    name: /email/i
  })

    const searchInput = screen.getByRole('textbox', {
    name: /search/i
  })

  expect(emailInput).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
})

////////////////////////////////////////////////////////////////////

function IconButtons() {
  return (
    <div>
      <button aria-label="sign in">
        <svg />
      </button>

      <button aria-label="sign out">
        <svg />
      </button>
    </div>
  );
}

render(<IconButtons />)

////////////////////////////////////////////////////////////////////////////

test('find elements based on label', () => {
  render(<IconButtons />)

  const siginButton = screen.getByRole('button', { name: /sign in/i })

   const sigoutButton = screen.getByRole('button', { name: /sign out/i })

  expect(siginButton).toBeInTheDocument();
  expect(sigoutButton).toBeInTheDocument();


})