import {render, screen } from '@testing-library/react';

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

/////////////////////////////////////////////////////////////////////

//import {render, screen} from '@testing-library/react'; was declare above

function ColorList() {
  return (
    <ul> 
      <li>Red</li> 
      <li>Blue</li> 
      <li>Green</li> 
    </ul>
  );
}

render(<ColorList />)

///////////////////////////////////////

test('getBy, queryBy, findBy, finding 0 elements', async() => {
render(<ColorList />);

//screen.getByRole('textbox'); it doesnt work, for this reason i used the expect below
expect(() => screen.getByRole('textbox')).toThrow();

expect(screen.queryByRole('textbox')).toEqual(null);

let errorThrown = false;
try {
  await screen.findByRole('textbox')
} catch (err) {
  errorThrown = true;
}
expect(errorThrown).toEqual(true);
});

/////////////////////////////////////////////

test('getBy, queryBy, findBy when find 1 element', async () => {

render(<ColorList />);

expect(screen.getByRole('list')).toBeInTheDocument()

expect(screen.queryByRole('list')).toBeInTheDocument()
//using await because its promise
expect(await screen.findByRole('list')).toBeInTheDocument()
});

///////////////////////////////////////////////////////////

test('getBy, queryBy, findBy when find > elements', async () => {

render(<ColorList />);

expect(() => screen.getByRole('listitem')).toThrow();

expect(() => screen.queryByRole('listitem')).toThrow();

let errorThrown = false;
try {
  await screen.findByRole('textbox')
} catch (err) {
  errorThrown = true;
}
expect(errorThrown).toEqual(true);
})

///////////////////////////////////////////////////////////////////////

test('getAllBy, queryAllBy, findAllBy', async() => {
  render(<ColorList />);

expect(screen.getAllByRole('listitem')).toHaveLength(3);

expect(screen.queryAllByRole('listitem')).toHaveLength(3);

expect(await screen.findAllByRole('listitem')).toHaveLength(3);
});

/////////////////////////////////////////////

test('favor using getBy to prove an element exists', () => {

render(<ColorList />);

const element = screen.getByRole('list');

expect(element).toBeInTheDocument();

//return null if there is some error
screen.queryByRole('list');
});

///////////////////////////////////////////

test('favor using queryBy to prove an element does not exist', () => {

render(<ColorList />);

const element = screen.queryByRole('textbox');

expect(element).not.toBeInTheDocument();
});

//////////////////////////////////////////////////////////////

// eslint-disable-next-line import/first
import {useState, useEffect } from 'react';

function fakeFetchColors() {
  return Promise.resolve(
    ['red', 'green', 'blue']
  );
}

function LoadableColorList() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fakeFetchColors()
      .then(colors => setColors(colors))
  }, []);

  const renderedColors = colors.map(color => {
    return <li key={color}>{color}</li>
  });

  return <ul>{renderedColors}</ul>
}

render(<LoadableColorList />);

;////////////////////////////////////////////////////////////

test('favor find or findAllBy when data fetching', async() => {

  render(<LoadableColorList />)

  const els = await screen.findAllByRole('listitem');

  expect(els).toHaveLength(3)
})

/////////////////////////////////////////////////////

//import { render, screen } from '@testing-library/react';

function DataForm() {
  const [email, setEmail] = useState('asdf@asdf.com');

  return (
   <form>
   <h3>Enter Data</h3>

   <div data-testid="image wrapper">
    <img alt="data" src="data.jpg" />
   </div>

   <label htmlFor="email">Email</label>
   <input
    id="email"
    value={email}
    onChange={e => setEmail(e.taget.value)}
   />

  <label htmlFor="email">Color</label>
  <input id="color" placeholder="Red" />
  <button title="Click when ready to submit">Submit</button>

   </form>
  );
}

render(<DataForm />)

/////////////////////////////////////////////////////////////////////////

test('selecting different elements', () => {
  render(<DataForm />)

  const elements = [
    screen.getByRole('button'),
    screen.getByLabelText(/email/i),
    screen.getByPlaceholderText(/red/i),
    screen.getByText(/enter data/i),
    screen.getByDisplayValue('asdf@asdf.com'),
    screen.getByAltText(/data/i),
    screen.getByTitle(/click when ready to submit/i),
    screen.getByTestId('image wrapper')
  ];

  for (let element of elements) {
    expect(element).toBeInTheDocument();
  }
});

/////////////////////////////////////////////////////////
//import { render, screen, within } from '@testing-library/react';

function FormData() {
  return (
    <div>
      <button>Go Back</button>
      <form aria-label="form">
      <button>Save</button>
      <button>Cancel</button>
      </form>
    </div>
  )
}
render(<FormData />);

///////////////////////////////////////////////////
function toContainRole(container, role, quantity=1) {
  // eslint-disable-next-line no-undef
  const elements = within(container).queryAllByRole(role);

  if(elements.length === quantity) {
    return {
      pass:true
    };
  }

  return {
    pass: false,
    message: () => `Expected to find ${quantity} ${role} elements. Found ${elements.length} instead.`
  }
}

expect.extend({ toContainRole});

////////////////////////////////////////////////////////////////////////////////////////

test('the form displays two buttons into form', () => {
  render(<FormData />);

  const form = screen.getByRole('form');
  //const buttons = within(form).getAllByRole('button');

  //for(button of buttons) {
   // expect(button).toBeInTheDocument()
  //}

  //expect(buttons).toHaveLength(2)
  expect(form).toContainRole('button', 2)
})