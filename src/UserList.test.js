import {render, screen, within } from '@testing-library/react';
import UserList from './UserList';

test('render one row per user', () => {
//render the component
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
//screen.logTestingPlaygroundURL();
//find all rows on the table
//not use it because is add all data including name e name into tr
//const rows = screen.getAllByRole('row');
//add data-testid
const rows = within(screen.getByTestId('users')).getAllByRole('row');
//assertation: correct numbee of rows in the table
expect(rows).toHaveLength(2)
})

test('render email and name of each user', () => {
    
})