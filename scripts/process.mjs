import path from 'path';
import { promises as fs } from 'fs';
import fg from 'fast-glob';

(async () => {
	const data = {};
	const files = await fg('./data/*.geojson');
	for (const file of files) {
		const code = path.parse(file).name;
		data[code] = {};
		data[code].data = JSON.parse(await fs.readFile(file, 'utf-8'));
		const coordinates = data[code].data.features.map((i) => i.geometry.coordinates);
		data[code].center = coordinates
			.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0])
			.map((i) => i / coordinates.length);
		data[code].count = data[code].data.features.length;
	}

	data['sai-gon'] = {
		data: { type: 'FeatureCollection', features: [] },
		center: [106.6952276, 10.754792]
	};

	await fs.writeFile('./src/data.json', JSON.stringify(data), 'utf-8');
	await fs.writeFile('./src/build.ts', `export const BuildTime = ${+new Date()}\n`, 'utf-8');
})();
