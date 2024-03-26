import React from 'react';

const FormRadio = ({ labelName, name, options, values, handleChange }) => {
	const numberOfOptions = options.length;

	const getGridCols = (numOptions) => {
		switch (numOptions) {
			case 3:
				return 'grid-cols-3';
			case 8:
				return 'grid-cols-4 grid-rows-2';
			default:
				return 'grid-cols-1';
		}
	};

	const className = `grid w-auto ${getGridCols(
		numberOfOptions
	)} space-x-2 rounded-xl bg-gray-200 p-2`;

	return (
		<>
			<label className='block text-sm font-medium text-gray-900 m-0'>
				{labelName}
			</label>
			<div className={className}>
				{options.map((option, index) => (
					<div key={index} className='col-span-1 row-span-1'>
						<input
							type='radio'
							name={name}
							id={name + '-' + values[index]}
							value={values[index]}
							onChange={handleChange}
							className='peer hidden'
						/>
						<label
							htmlFor={name + '-' + values[index]}
							className='flex peer:checked:bg-indigo-500 peer-checked:bg-indigo-500 justify-center items-center cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white'>
							{option.label ? (
								option.label
							) : (
								<img
									className='w-[80px] h-[80px] object-cover'
									src={option.src}
									alt={option.alt}
									title={option.title}
								/>
							)}
						</label>
					</div>
				))}
			</div>
		</>
	);
};

export default FormRadio;
