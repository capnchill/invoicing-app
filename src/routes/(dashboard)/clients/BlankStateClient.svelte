<script>
	import BlankRow from '$lib/components/BlankRow.svelte';
	import ClientRowHeader from './ClientRowHeader.svelte';
</script>

<div>
	<div class="-mt-8 md:-mt-6 lg:-mt-14">
		<h2
			class="mb-10 bg-arrowLeftUp bg-left bg-no-repeat pl-24 pt-14 text-left font-handwriting text-2xl font-bold text-caribbeanGreen md:bg-arrowRightUp md:bg-right md:pl-0 md:pr-28 md:text-right md:text-4xl"
		>
			Add your first client
		</h2>
	</div>

	<!-- client header -->
	<ClientRowHeader className={'text-fog'} />

	<!-- blank rows -->
	<BlankRow />
	<BlankRow />
	<BlankRow />
</div>
