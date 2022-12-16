const getRad = (n: number) => (Math.PI * n) / 180;

export const getDistanceFromMe = (coors: [number, number], loc: [number, number] | null) => {
	if (!loc) return null;
	const [lats, lons] = coors;
	const [latm, lonm] = loc;
	if (lats === latm && lons === lonm) return 0;
	const radlats = getRad(lats);
	const radlatm = getRad(latm);
	const theta = lons - lonm;
	const radtheta = getRad(theta);
	let dist =
		Math.sin(radlats) * Math.sin(radlatm) +
		Math.cos(radlats) * Math.cos(radlatm) * Math.cos(radtheta);
	if (dist > 1) dist = 1;
	dist = Math.acos(dist);
	dist *= 180 / Math.PI;
	dist *= 60 * 1.1515;
	const km = dist * 1.609344;
	if (km > 1) {
		return `${km.toFixed(2)} km`;
	}
	return `${Math.round(km * 1000)} km`;
};

export const getExpensive = (price: string) => {
	const priceAsNum = parseInt(price.replace('≥', '').replace('₫', '').replace('.', ''));
	if (priceAsNum < 30000) return 1;
	if (priceAsNum > 120000) return 4;
	if (priceAsNum < 60000) return 2;
	if (priceAsNum > 90000) return 3;
	return 2;
};
