import fg from 'fast-glob';
import { promises as fs } from 'fs';
import path from 'path';

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

	const allCategory = Array.from(
		new Set(
			Object.keys(data).reduce(
				(a, b) => {
					for (const i of data[b].data.features) {
						if (!i.properties.category) {
							if (i.properties['marker-symbol'] === 'cafe-shop') {
								i.properties.category = 'cafe';
							}
						}
					}

					return a.concat(data[b].data.features.map((i) => i.properties.category));
				},
				['all']
			)
		)
	);

	await fs.writeFile(
		'./src/category.json',
		JSON.stringify(allCategory.sort((a, b) => a.localeCompare(b))),
		'utf-8'
	);

	await fs.writeFile('./src/data.json', JSON.stringify(data), 'utf-8');
	await fs.writeFile('./src/build.ts', `export const BuildTime = ${+new Date()}\n`, 'utf-8');
})();
