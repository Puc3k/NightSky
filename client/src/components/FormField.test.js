// Importowanie odpowiednich funkcji/bibliotek
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormField from './FormField';

describe('FormField', () => {
	// Sprawdzanie, czy komponent się renderuje
	it('Poprawnie renderuje komponent', () => {
		const { getByLabelText } = render(
			<FormField labelName='Test' type='text' name='test' placeholder='test' />
		);

		expect(getByLabelText('Test')).toBeInTheDocument();
	});

	// Sprawdzanie, czy przekazane propsy są poprawnie wyświetlane
	it('Wyświetla przekazane propsy', () => {
		const { getByPlaceholderText } = render(
			<FormField labelName='Test' type='text' name='test' placeholder='test' />
		);

		expect(getByPlaceholderText('test')).toBeInTheDocument();
	});

	// Sprawdzanie, czy interakcje działają poprawnie
	it('Pozwala na interakcję z inputem', () => {
		const handleChange = jest.fn(); // mock funkcji obsługującej zmianę
		const { getByLabelText } = render(
			<FormField
				labelName='Test'
				type='text'
				name='test'
				placeholder='test'
				handleChange={handleChange}
			/>
		);

		const input = getByLabelText('Test');
		fireEvent.change(input, { target: { value: 'nowa wartość' } }); // Symulowanie wprowadzenia tekstu do inputu

		expect(handleChange).toHaveBeenCalled(); // Sprawdzenie, czy funkcja obsługująca zmianę została wywołana
	});

	// Sprawdzanie, czy przycisk "Zaskocz mnie - Suprise Me" jest wyświetlany i obsługuje kliknięcie
	it('Wyświetla i obsługuje przycisk "Zaskocz mnie"', () => {
		const handleSurpriseMe = jest.fn(); // mock funkcji obsługującej kliknięcie przycisku
		const { getByText } = render(
			<FormField
				labelName='Test'
				type='text'
				name='test'
				placeholder='test'
				isSurpriseMe={true}
				handleSurpriseMe={handleSurpriseMe}
			/>
		);

		const button = getByText('Zaskocz mnie');
		fireEvent.click(button); // Symulowanie kliknięcia przycisku

		expect(handleSurpriseMe).toHaveBeenCalled(); // Sprawdzenie, czy funkcja obsługująca kliknięcie została wywołana
	});
});
