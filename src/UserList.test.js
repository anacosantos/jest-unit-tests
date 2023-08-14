import {render, screen, within } from '@testing-library/react';
import UserList from './UserList';

//fuction created to use in each test. NOT recommended user before each.
function renderComponent() {
    const users = [
        {
            name: 'jane', 
            email: 'jane@jane.com'
        },
        {
            name: 'same', 
            email: 'same@same.com'
        }
    
    ];
    render(<UserList users={users} />);

    return {
        users
    }
}

//Forbidden usage of `render` within testing framework `beforeEach` 
// beforeEach(()=>{
//     render(<UserList users={users} />);
// })

test('render one row per user', () => {
renderComponent()
//find row in table
//find all rows on the table
//not use it because is add all data including name e name into tr
//const rows = screen.getAllByRole('row');
//add data-testid
const rows = within(screen.getByTestId('users')).getAllByRole('row');
//assertation: correct numbee of rows in the table
expect(rows).toHaveLength(2)
})

test('render email and name of each user', () => {
//screen.logTestingPlaygroundURL(); //use this to find the best way to get element
    const {users} = renderComponent()
    for(let user of users) {
        const name = screen.getByRole('cell', { name: user.name })
        const email = screen.getByRole('cell', { name: user.email })
        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
})