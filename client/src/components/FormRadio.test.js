// Importujemy potrzebne biblioteki
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormRadio from './FormRadio';

// Test sprawdza, czy FormRadio renderuje się poprawnie
test('Poprawnie renderuje FormRadio.', () => {
	const handleChange = jest.fn(); // mockujemy funkcję, która zostanie przekazana jako props

	// Renderujemy komponent
	render(
		<FormRadio
			labelName='Test Radio'
			name='test'
			options={[
				{ label: 'Option 1' },
				{ label: 'Option 2' },
				{ label: 'Option 3' },
			]}
			values={['1', '2', '3']}
			handleChange={handleChange}
		/>
	);

	// Oczekujemy, że etykieta "Test Radio" będzie obecna w dokumencie
	expect(screen.getByText('Test Radio')).toBeInTheDocument();
	// Oczekujemy, że poszczególne przyciski radio będą obecne w dokumencie
	expect(screen.getByRole('radio', { name: /option 1/i })).toBeInTheDocument();
	expect(screen.getByRole('radio', { name: /option 2/i })).toBeInTheDocument();
	expect(screen.getByRole('radio', { name: /option 3/i })).toBeInTheDocument();
});

// Test sprawdza, czy funkcja handleChange jest wywoływana, gdy klikniemy na opcję
test('Funkcja handleChange jest wywoływana, kiedy opcja jest kliknięta.', () => {
	const handleChange = jest.fn(); // mockujemy funkcję

	// Renderujemy komponent
	render(
		<FormRadio
			labelName='Test Radio'
			name='test'
			options={[
				{ label: 'Option 1' },
				{ label: 'Option 2' },
				{ label: 'Option 3' },
			]}
			values={['1', '2', '3']}
			handleChange={handleChange}
		/>
	);

	// Symulujemy kliknięcie na jedną z opcji
	fireEvent.click(screen.getByText('Option 1'));

	// Oczekujemy, że funkcja handleChange zostanie wywołana
	expect(handleChange).toHaveBeenCalled();
});
