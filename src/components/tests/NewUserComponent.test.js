import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewUserComponent from '../sports-day/NewUserComponent';
import { creaUserApi } from '../sports-day/api/SportsDayApiService';

jest.mock('../sports-day/api/SportsDayApiService', () => ({
  creaUserApi: jest.fn(),
}));

describe('NewUserComponent', () => {
  beforeEach(() => {
    render(<NewUserComponent />);
  });

  it('renders the "Sign Up" form', () => {
    // expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
});


  it('displays validation errors when the form is submitted with invalid data', () => {
    const signUpButton = screen.getByTestId('sign-up-button');
    fireEvent.click(signUpButton);

    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toBeInTheDocument();
  });

  it('handles form submission and displays a success message', async () => {
    const signUpButton = screen.getByTestId('sign-up-button');

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const usernameInput = screen.getByLabelText('Username');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });

    creaUserApi.mockResolvedValue({});

    fireEvent.click(signUpButton);

    expect(await screen.findByText('User Created Successfully')).toBeInTheDocument();
  });

  it('handles form submission and displays an error message', async () => {
    const signUpButton = screen.getByTestId('sign-up-button');

    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const usernameInput = screen.getByLabelText('Username');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });

    const errorMessage = 'An error occurred during registration';
    creaUserApi.mockRejectedValue({ response: { data: { message: errorMessage } } });

    fireEvent.click(signUpButton);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});
