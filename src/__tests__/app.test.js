import App from "../App"
import React from 'react'

test('app runs without exceptions', async () => {
	render(<App />);
	console.log(screen.getByRole('button'));
	expect(screen.getByRole('button')).not.toBeDisabled();
})

//https://testing-library.com/docs/react-testing-library/example-intro