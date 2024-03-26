import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wizard_1 } from '../assets';
import {moon_phase_1,moon_phase_2,moon_phase_3,moon_phase_4,moon_phase_5,moon_phase_6,moon_phase_7,moon_phase_8,} from '../assets';
import { getRandomPrompt, createPrompt } from '../utils';
import { FormField, Loader, FormSlider, FormRadio } from '../components';

const CreatePost = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: '',
		prompt: '',
		photo: '',
		stars: '',
		clody: 0,
		fog: 0,
		moon: '',
	});

	const [generatingImg, setGeneratingImg] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};

	const generateImage = async () => {
		try {
			setGeneratingImg(true);
			let newPrompt = createPrompt(form);

			console.log(newPrompt);
			const response = await fetch('http://localhost:8080/api/v1/dalle', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt: newPrompt,
				}),
			});

			const contentType = response.headers.get('content-type');
			if (contentType && contentType.indexOf('application/json') !== -1) {
				const data = await response.json();
				setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
			} else {
				const errorText = await response.text();

				if (errorText === 'You must provide a prompt.') {
					alert('Musisz zmienić chociaż jedną z opcji w formularzu.');
				} else {
					alert(`Błąd podczas generowania zdjęcia: ${errorText}`);
				}
			}
		} catch (err) {
			alert(err);
		} finally {
			setGeneratingImg(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//Walidacja nazwy użytkownika
		if (form.name.trim() === '') {
			alert('Nazwa użytkownika jest wymagana.');
			return;
		}

		if (form.photo) {
			setLoading(true);
			let newPrompt = createPrompt(form);
			try {
				const response = await fetch('http://localhost:8080/api/v1/post', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ ...form, prompt: newPrompt }),
				});

				await response.json();
				alert('Sukces!');
				navigate('/');
			} catch (err) {
				alert(err);
			} finally {
				setLoading(false);
			}
		} else {
			alert('Proszę wygenerować obraz przed udostępnieniem.');
		}
	};

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='font-extrabold text-[#222328] text-[32px]'>Generuj</h1>
				<p className='mt-2 text-[#666e75] text-[14px]'>
					Twórz niezwykłe obrazy nocnego nieba dzięki wykorzystaniu AI oraz
					szczypty magii od naszego czarodzieja i podziel się nimi z
					społecznością!
				</p>
			</div>
			<form className='mt-16' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-5 md:grid md:grid-cols-12 md:grid-rows-1'>
					<div className='col-span-6 row-span-1 flex flex-col gap-5'>
						<FormField
							labelName='Nazwa użytkownika'
							type='text'
							name='name'
							placeholder='Vincent van Gogh'
							value={form.name}
							handleChange={handleChange}
						/>
						<FormSlider
							labelName='Gęstość mgły: '
							name='fog'
							maxValue={10}
							minValue={0}
							value={form.fog}
							handleChange={handleChange}
						/>
						<FormSlider
							labelName='Zachmurzenie: '
							name='clody'
							maxValue={10}
							minValue={0}
							value={form.clody}
							handleChange={handleChange}
						/>
						<FormRadio
							labelName='Faza księżyca'
							name='moon'
							options={[
								{ src: moon_phase_1, alt: 'Moon phase 1', title: 'new moon' },
								{ src: moon_phase_2, alt: 'Moon phase 2', title: 'waxing crescent'},
								{ src: moon_phase_3, alt: 'Moon phase 3', title: 'first quarter'},
								{ src: moon_phase_4, alt: 'Moon phase 4', title: 'waxing gibbous'},
								{ src: moon_phase_5, alt: 'Moon phase 5', title: 'full moon' },
								{ src: moon_phase_6, alt: 'Moon phase 6', title: 'waning gibbous'},
								{ src: moon_phase_7, alt: 'Moon phase 7', title: 'third quarter'},
								{ src: moon_phase_8, alt: 'Moon phase 8', title: 'waning crescent'},
							]}
							values={['1', '2', '3', '4', '5', '6', '7', '8']}
							handleChange={handleChange}
						/>
						<FormField
							labelName='Prompt'
							id='Test'
							type='text'
							name='prompt'
							placeholder='An Impressionist oil painting of sunflowers in a purple vase…'
							value={form.prompt}
							handleChange={handleChange}
							isSurpriseMe
							handleSurpriseMe={handleSurpriseMe}
						/>
						<div className='mt-5 flex gap-5 w-100'>
							<button
								type='button'
								onClick={generateImage}
								className=' text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
								{generatingImg ? 'Generowanie...' : 'Generuj'}
							</button>
						</div>
					</div>
					<div className='col-span-6 relative bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-100 p-3 h-100 flex justify-center items-center'>
						{form.photo ? (
							<img
								src={form.photo}
								alt={form.prompt}
								className='w-full h-full object-contain'
							/>
						) : (
							<img
								src={wizard_1}
								alt='wizard_1'
								className='object-contain opacity-90'
							/>
						)}

						{generatingImg && (
							<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
								<Loader />
							</div>
						)}
					</div>
				</div>
				<div className='mt-10'>
					<p className='mt-2 text-[#666e75] text-[14px]'>
						** Po wygenerowaniu obrazu możesz podzielić się nim z innymi :) **
					</p>
					<button
						type='submit'
						className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
						{loading ? 'Udostępnianie...' : 'Udostępnij społeczności'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default CreatePost;
