import React from 'react';

export const useNavigate = jest.fn(() => jest.fn());

export const Link = jest
	.fn()
	.mockImplementation(({ children }) => <div>{children}</div>);
export const NavLink = jest
	.fn()
	.mockImplementation(({ children }) => <div>{children}</div>);
export const MemoryRouter = ({ children }) => <div>{children}</div>;
