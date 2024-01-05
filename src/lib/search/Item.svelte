<script lang="ts">
	import { emitter } from '$lib/event';
	import { shop as current, loc, searchString, type CafeShop } from '$lib/stores';
	import { getDistanceFromMe } from '$lib/utils';

	export let shop: CafeShop;
	let myLoc: [number, number] | null = null;
	loc.subscribe((v) => (myLoc = v));

	const image = shop.properties['image'];
	const name = shop.properties['name'];
	const address = shop.properties['address'];
	const distance = getDistanceFromMe(shop.coordinates, myLoc);

	const handlePickShop = () => {
		current.set(shop);
		searchString.set('');
		emitter.emit('fly-to', {
			center: [shop.coordinates[0], shop.coordinates[1]],
			zoom: 17,
			speed: 1.5
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') handlePickShop();
	};
</script>

<button class="item" on:click={handlePickShop} on:keydown={handleKeyDown}>
	<div class="preview">
		<img src={image} alt={name}/>
	</div>
	<div class="info">
		<div class="name">{name}</div>
		<div class="address">
			{address}{distance !== null && distance !== 0 ? `・${distance}` : ''}
		</div>
	</div>
</button>

<style scoped>
	.item {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
		border-radius: 4px;
		padding: 8px;
		cursor: pointer;
		margin-bottom: 24px;
		background-color: transparent;
		border: 0 none;
	}

	.item:hover {
		background-color: var(--color-border);
	}

	.preview {
		width: 72px;
		height: 48px;
		overflow: hidden;
		border-radius: 2px;
		background-color: var(--color-border);
	}
	.preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		font-size: 0;
	}

	.info {
		flex: 1;
		text-align: left;
	}
	.name {
		font-size: 16px;
		font-weight: 600;
	}
	.address {
		color: var(--color-muted);
	}
</style>
