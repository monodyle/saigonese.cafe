<script lang="ts">
	import { loc, shop, type CafeShop } from '$lib/stores';
	import { getDistanceFromMe, getExpensive } from '$lib/utils';

	let shopValue: CafeShop | null = null;
	shop.subscribe((value) => (shopValue = value));
	console.log(shopValue)
	let myLoc: [number, number] | null = null;
	loc.subscribe((v) => (myLoc = v));

	$: image = shopValue?.properties['image'];
	$: name = shopValue?.properties['name'];
	$: category = shopValue?.properties['category'];
	$: address = shopValue?.properties['address'];
	$: open_time = shopValue?.properties['open_time'];
	$: proposed_price = shopValue?.properties['proposed_price'];

	$: myLocAsStr = myLoc?.slice().reverse().join(',');
	$: shopLocAsStr = shopValue?.coordinates.slice().reverse().join(',');
	$: mapLink = `https://www.google.com/maps/dir/?api=1&origin=${myLocAsStr}&destination=${shopLocAsStr}`;
	$: distance = getDistanceFromMe(shopValue?.coordinates || [0, 0], myLoc);

	$: expensive = getExpensive(proposed_price || '0');

	const clearShop = () => shop.set(null);
</script>

{#if shopValue !== null}
	<div class="container">
		<button class="close" on:click={clearShop}> Close </button>
		<div class="cover">
			<img src={image} alt={name} id={name}/>
		</div>
		<div class="name">{name}</div>
		<div class="category">{category}</div>
		<div class="address">
			{address}
			{#if distance}
				<span class="distance">
					{`・${distance} `}
					<a class="link" href={mapLink} target="_blank" rel="noreferrer"> Direction </a>
				</span>
			{/if}
		</div>
		<div class="info">
			<div class="small time">{open_time}</div>
			<div class="small">・</div>
			<div class="small price" title={proposed_price}>
				{new Array(expensive).fill('$').join('')}<span class="dimmed">
					{new Array(4 - expensive).fill('$').join('')}
				</span>
			</div>
		</div>
	</div>
{/if}

<style scoped>
	.container {
		position: absolute;
		bottom: 24px;
		left: 24px;
		width: 480px;
		background-color: var(--color-white);
		padding: 16px;
		border-radius: 8px;
		box-shadow: 0 0 1rem -0.1rem rgba(0, 0, 0, 0.1), 0 4px 2rem rgba(0, 0, 0, 0.08);
	}

	.close {
		font-size: 12px;
		color: var(--color-muted);
		background-color: var(--color-white);
		border: 0 none;
		border-bottom: 1px dashed var(--color-border);
		cursor: pointer;
		display: block;
		text-align: center;
		width: calc(100% + 32px);
		margin: -16px -16px 8px;
		padding: 4px 16px;
		text-transform: uppercase;
	}

	.cover {
		margin-bottom: 12px;
		max-height: 320px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 4px;
	}
	.cover img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.name {
		font-size: 24px;
		font-weight: 600;
	}
	
	.category {
		font-size: 20px;
		margin-bottom: 6px;
		font-style: italic;
	}

	.address {
		color: var(--color-muted);
		margin-bottom: 2px;
	}

	.info {
		display: flex;
		gap: 8px;
	}

	.small {
		font-size: 14px;
	}

	.time {
		color: var(--color-muted);
	}

	.price {
		font-weight: 500;
	}
	.price .dimmed {
		color: var(--color-dimmed);
	}
</style>
