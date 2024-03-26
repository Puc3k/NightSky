import mongoose from 'mongoose';

const connectDB = (url) => {
	mongoose.set('strictQuery', true);
	mongoose
		.connect(url)
		.then(() => console.log('Zalogowano do mongo'))
		.catch((err) => {
			console.error('Nie udało się połączyć z mongo');
			console.error(err);
		});
};

export default connectDB;
