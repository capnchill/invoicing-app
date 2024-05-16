<script lang="ts">
	import BlankRow from '$lib/components/BlankRow.svelte';
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';
</script>

<div class="mt-20 lg:-mt-14">
	<div class="mb-10 ml-2 bg-arrowLeftUp bg-no-repeat pl-28 pt-14">
		<h2 class="font-handwriting text-4xl font-bold text-caribbeanGreen">Oops</h2>
		<p class="text-xl font-bold text-caribbeanGreen">
			We could not find what you were looking for!
		</p>
	</div>

	<InvoiceRowHeader className="text-fog" />
	<BlankRow />
	<BlankRow />
	<BlankRow />
</div>
